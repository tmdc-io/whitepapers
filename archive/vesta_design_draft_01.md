# (Vesta) In-Flight Query Deduplication - Low-Level Requirements Design Document
Date: Aug 13, 2025

## Table of Contents

1. [Executive Summary](#1-executive-summary)
   - [1.1 Problem Statement](#11-problem-statement)
   - [1.2 Solution Overview](#12-solution-overview)

2. [Requirements](#2-requirements)
   - [2.1 Functional Requirements](#21-functional-requirements)
   - [2.2 Non-Functional Requirements](#22-non-functional-requirements)

3. [Technical Design](#3-technical-design)
   - [3.0 Race Condition Mitigation](#30-race-condition-mitigation)
     - [3.0.1 Race Condition Types Addressed](#301-race-condition-types-addressed)
     - [3.0.2 Implementation Principles](#302-implementation-principles)
     - [3.0.3 Architecture Overview](#303-architecture-overview)
     - [3.0.4 Sequence Diagrams](#304-sequence-diagrams)
   - [3.1 Database Schema Changes](#31-database-schema-changes)
     - [3.1.1 New Columns in statements Table](#311-new-columns-in-statements-table)
     - [3.1.2 New Indexes](#312-new-indexes)
     - [3.1.3 New Status Values](#313-new-status-values)
   - [3.2 Core Algorithm](#32-core-algorithm)
     - [3.2.1 Enhanced create_statement Function](#321-enhanced-create_statement-function)
     - [3.2.2 Primary Completion Handler](#322-primary-completion-handler)
   - [3.3 Task System Integration](#33-task-system-integration)
     - [3.3.1 Enhanced Task Completion](#331-enhanced-task-completion-leveraging-pgqueuer)
     - [3.3.2 Enhanced Task Error Handler Integration](#332-enhanced-task-error-handler-integration)
   - [3.4 API Response Enhancements](#34-api-response-enhancements)
     - [3.4.1 Enhanced Statement Response Schema](#341-enhanced-statement-response-schema)
     - [3.4.2 Enhanced API Endpoints](#342-enhanced-api-endpoints)
   - [3.5 Module Organization](#35-module-organization)
     - [3.5.1 Preventing Circular Imports](#351-preventing-circular-imports)
   - [3.6 Configuration Management](#36-configuration-management)
     - [3.6.1 Environment Variables](#361-environment-variables)
     - [3.6.2 Configuration Helper Functions](#362-configuration-helper-functions)

4. [Database Migration Strategy](#4-database-migration-strategy)
   - [4.1 Migration Scripts](#41-migration-scripts)
     - [4.1.1 Forward Migration](#411-forward-migration)
     - [4.1.2 Rollback Migration](#412-rollback-migration)
   - [4.2 Data Migration Considerations](#42-data-migration-considerations)

5. [Implementation Plan](#5-implementation-plan)
   - [5.1 Phase 1: Core Infrastructure](#51-phase-1-core-infrastructure-week-1-2)
   - [5.2 Phase 2: PgQueuer Integration](#52-phase-2-pgqueuer-integration-week-3)
   - [5.3 Phase 3: TaskErrorHandler Enhancement](#53-phase-3-taskerrorhandler-enhancement-week-4)
   - [5.4 Phase 4: Production Readiness](#54-phase-4-production-readiness-week-5)

6. [Testing Strategy](#6-testing-strategy)
   - [6.1 Unit Tests](#61-unit-tests)
   - [6.2 Integration Tests](#62-integration-tests)
   - [6.3 Performance Tests](#63-performance-tests)

7. [Monitoring and Observability](#7-monitoring-and-observability)
   - [7.1 Metrics to Track](#71-metrics-to-track)
   - [7.2 Logging Strategy](#72-logging-strategy)

8. [Security Considerations](#8-security-considerations)
   - [8.1 Access Control](#81-access-control)
   - [8.2 Resource Protection](#82-resource-protection)

9. [Rollout Strategy](#9-rollout-strategy)
   - [9.1 Feature Flag Implementation](#91-feature-flag-implementation)
   - [9.2 Gradual Rollout Plan](#92-gradual-rollout-plan)

10. [Success Metrics](#10-success-metrics)
    - [10.1 Performance Metrics](#101-performance-metrics)
    - [10.2 Quality Metrics](#102-quality-metrics)

11. [Future Enhancements](#11-future-enhancements)
    - [11.1 Advanced Features](#111-advanced-features)
    - [11.2 PgQueuer Integration Enhancements](#112-pgqueuer-integration-enhancements)
    - [11.3 Performance Optimizations](#113-performance-optimizations)

---

## 1. Executive Summary

This document outlines the detailed technical design for implementing in-flight query deduplication in Vesta. This feature extends the existing TTL-based caching mechanism to prevent concurrent execution of identical queries, reducing database load, cost, and improving overall system efficiency.

### 1.1 Problem Statement

Currently, when multiple users submit identical queries within a short time window, each query is executed independently, leading to:
- Unnecessary database resource consumption
- Increased costs (especially for cloud data warehouses)
- Potential system overload during peak usage
- Inefficient resource utilization

### 1.2 Solution Overview

Implement a primary-secondary pattern where:
- The first query becomes the "primary" and executes normally
- Subsequent identical queries become "secondaries" and wait for the primary's completion
- All secondaries receive the same results as the primary without additional execution
- **Unlimited secondaries provide natural throttling**: More duplicate requests lead to higher efficiency and cost savings, as each additional secondary represents an expensive database execution avoided

## 2. Requirements

### 2.1 Functional Requirements

**FR-001: In-Flight Query Detection**
- System MUST detect identical queries that are currently being processed
- Detection MUST use the same fingerprinting mechanism as TTL caching
- Detection MUST include exact parameter matching

**FR-002: Primary-Secondary Relationship**
- First query MUST be designated as primary
- Subsequent identical queries MUST be designated as secondaries
- Secondaries MUST reference their primary query

**FR-003: Result Propagation**
- When primary completes successfully, ALL secondaries MUST receive identical results
- When primary fails, ALL secondaries MUST receive the same error
- Result propagation MUST be atomic

**FR-004: Timeout Handling**
- System MUST leverage PgQueuer's built-in timeout handling for primary job failures
- If primary times out or fails (detected by PgQueuer), secondaries MUST fail immediately
- Clients MUST handle failures and can retry with new requests
- System MUST handle primary query cancellation gracefully

**FR-005: Configuration Control**
- Feature MUST be configurable (enable/disable)

### 2.2 Non-Functional Requirements

**NFR-001: Performance**
- In-flight detection MUST add < 10ms to API response time
- Database queries for detection MUST use optimized indexes
- Memory usage MUST not increase significantly

**NFR-002: Scalability**
- System MUST handle up to 1000 concurrent identical queries
- Database schema MUST support efficient lookups at scale
- Design MUST not introduce bottlenecks

**NFR-003: Reliability**
- No query MUST be lost due to deduplication logic
- System MUST gracefully handle edge cases
- Backward compatibility MUST be maintained

**NFR-004: Observability**
- All deduplication events MUST be logged
- Metrics MUST be available for monitoring
- API responses MUST indicate deduplication status

## 3. Technical Design

### 3.0 Race Condition Mitigation

The design includes comprehensive protection against race conditions that can occur in production:

#### 3.0.1 Race Condition Types Addressed

**Race Condition 1: Primary Completion vs Timeout**
- Problem: Normal completion and timeout detection can conflict when they happen simultaneously
- Solution: Optimistic locking in `update_primary_with_optimistic_locking()` - only updates primary if still in QUEUED/PICKED state

**Race Condition 2: Late Secondary Creation**  
- Problem: Secondary requests can arrive just after primary completes, missing the chance to deduplicate
- Solution: Enhanced `find_in_flight_primary()` checks recently completed queries within 30-second window

**Race Condition 3: Transaction Conflicts**
- Problem: Large atomic transactions can cause deadlocks and rollbacks when updating thousands of secondaries
- Solution: Separate primary and secondary updates into different transactions with batching

#### 3.0.2 Implementation Principles

1. **Optimistic Locking**: Use status-based conditions to prevent conflicting updates
2. **Separate Transactions**: Isolate primary updates from secondary updates to prevent rollback cascades  
3. **Batch Processing**: Update secondaries in batches of 1000 to handle scale efficiently
4. **Graceful Degradation**: If secondary updates fail, primary status is still preserved
5. **Race Detection**: Double-check status after queries to catch concurrent modifications

These protections ensure the deduplication system remains consistent even under high concurrency and system stress.

### 3.0.3 Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        C1[Client 1]
        C2[Client 2]
        C3[Client 3]
    end
    
    subgraph "Vesta API Layer"
        API[FastAPI Server]
        subgraph "Deduplication Logic"
            DDL[create_statement]
            FIP[find_in_flight_primary]
            CCS[create_cache_hit_statement]
            CSS[create_secondary_statement]
            CPS[create_primary_statement]
        end
    end
    
    subgraph "Database Layer"
        PG[(PostgreSQL)]
        subgraph "Statement Table"
            ST[statements]
            PRI[primary_id]
            DGI[dedup_group_id]
        end
        subgraph "Indexes"
            IDX1[ix_statements_cache_lookup]
            IDX2[ix_statements_inflight_lookup] 
            IDX3[ix_statements_primary_secondaries]
        end
    end
    
    subgraph "Queue System"
        PGQ[PgQueuer]
        subgraph "Workers"
            W1[Worker 1]
            W2[Worker 2]
            W3[Worker 3]
        end
        subgraph "Error Handling"
            TEH[TaskErrorHandler]
            HDF[handle_deduplication_failure]
        end
    end
    
    subgraph "Completion Handler"
        HPC[handle_primary_completion]
        subgraph "Race Protection"
            OL[Optimistic Locking]
            ST1[Separate Transactions]
            BP[Batch Processing]
        end
    end
    
    subgraph "Target Databases"
        SF[Snowflake]
        BQ[BigQuery]
        DB[Databricks]
        PG2[PostgreSQL]
    end
    
    subgraph "Object Storage"
        S3[S3/MinIO]
        RES[Query Results]
    end
    
    %% Flow connections
    C1 & C2 & C3 --> API
    API --> DDL
    DDL --> FIP
    DDL --> CCS
    DDL --> CSS
    DDL --> CPS
    
    FIP --> PG
    CSS --> PG
    CPS --> PG
    
    PG --> PGQ
    PGQ --> W1 & W2 & W3
    W1 & W2 & W3 --> SF & BQ & DB & PG2
    W1 & W2 & W3 --> S3
    W1 & W2 & W3 --> HPC
    
    TEH --> HDF
    HDF --> HPC
    HPC --> OL & ST1 & BP
    
    %% Styling
    classDef primary fill:#e1f5fe
    classDef secondary fill:#f3e5f5
    classDef storage fill:#e8f5e8
    classDef processing fill:#fff3e0
    
    class C1,C2,C3 primary
    class CSS,FIP secondary
    class PG,S3 storage
    class W1,W2,W3,HPC processing
```

### 3.0.4 Sequence Diagrams

#### Normal Primary-Secondary Flow

```mermaid
sequenceDiagram
    participant C1 as Client 1
    participant C2 as Client 2
    participant C3 as Client 3
    participant API as Vesta API
    participant DB as Database
    participant W as Worker
    participant TDB as Target Database

    Note over C1, TDB: Normal Deduplication Flow

    C1->>API: POST /submit (SQL, params)
    API->>DB: Check cache
    DB-->>API: No cache hit
    API->>DB: Check in-flight primaries
    DB-->>API: No active primaries
    API->>DB: Create primary statement (QUEUED)
    API-->>C1: Response: primary_id, is_primary=true

    par Primary Execution
        W->>DB: Pick primary (QUEUED → PICKED)
        W->>TDB: Execute SQL query
    and Secondary Requests Arrive
        C2->>API: POST /submit (same SQL, params)
        API->>DB: Check cache
        DB-->>API: No cache hit
        API->>DB: Check in-flight primaries
        DB-->>API: Found active primary
        API->>DB: Create secondary (WAITING_FOR_PRIMARY)
        API-->>C2: Response: secondary_id, is_secondary=true, primary_id

        C3->>API: POST /submit (same SQL, params)
        API->>DB: Check cache
        DB-->>API: No cache hit
        API->>DB: Check in-flight primaries
        DB-->>API: Found active primary
        API->>DB: Create secondary (WAITING_FOR_PRIMARY)
        API-->>C3: Response: secondary_id, is_secondary=true, primary_id
    end

    TDB-->>W: Query results
    W->>W: Save results to object store
    W->>DB: handle_primary_completion()
    
    Note over W, DB: Atomic Update with Optimistic Locking
    W->>DB: BEGIN TRANSACTION
    W->>DB: UPDATE primary (PICKED → SUCCESSFUL)
    W->>DB: UPDATE secondaries batch 1 (WAITING → SUCCESSFUL)
    W->>DB: UPDATE secondaries batch 2 (WAITING → SUCCESSFUL)
    W->>DB: COMMIT

    Note over C1, C3: All clients get identical results
    C1->>API: GET /status/primary_id
    API-->>C1: Status: SUCCESSFUL, results_url
    C2->>API: GET /status/secondary_id
    API-->>C2: Status: SUCCESSFUL, results_url (same as primary)
    C3->>API: GET /status/secondary_id
    API-->>C3: Status: SUCCESSFUL, results_url (same as primary)
```

#### Race Condition: Primary Completion vs Timeout

```mermaid
sequenceDiagram
    participant API as Vesta API
    participant DB as Database
    participant W as Worker Thread
    participant PQ as PgQueuer Timeout
    participant TH as TaskErrorHandler

    Note over API, TH: Race Condition Scenario

    API->>DB: Create primary (QUEUED)
    API->>DB: Create 1000 secondaries (WAITING_FOR_PRIMARY)
    
    W->>DB: Pick primary (QUEUED → PICKED)
    W->>W: Execute long-running query (599 seconds)

    par Normal Completion Flow
        Note over W: T+599s: Query completes successfully
        W->>W: handle_primary_completion() starts
        W->>DB: BEGIN TRANSACTION A
        W->>DB: Check primary status (optimistic locking)
        Note over W, DB: UPDATE primary WHERE status IN ('queued','picked')
    and Timeout Detection Flow
        Note over PQ: T+600s: PgQueuer timeout triggers
        PQ->>TH: handle_timeout()
        TH->>DB: BEGIN TRANSACTION B  
        TH->>TH: handle_deduplication_failure()
        TH->>DB: Check primary status (optimistic locking)
        Note over TH, DB: UPDATE primary WHERE status IN ('queued','picked')
    end

    alt Normal Completion Wins Race
        W->>DB: Primary updated to SUCCESSFUL ✅
        W->>DB: Update 1000 secondaries to SUCCESSFUL
        W->>DB: COMMIT TRANSACTION A
        TH->>DB: Primary update fails (rowcount=0) ❌
        TH->>TH: Log: "Primary already completed, skipping"
        Note over TH: Graceful degradation - no conflict
    else Timeout Wins Race
        TH->>DB: Primary updated to EXCEPTION ✅
        TH->>DB: Update 1000 secondaries to EXCEPTION
        TH->>DB: COMMIT TRANSACTION B
        W->>DB: Primary update fails (rowcount=0) ❌
        W->>W: Log: "Primary already completed, skipping"
        Note over W: Graceful degradation - no conflict
    end

    Note over API, TH: ✅ Optimistic locking prevents inconsistent state
```

#### Late Secondary Creation Race Condition

```mermaid
sequenceDiagram
    participant C1 as Client 1 (Primary)
    participant C2 as Client 2 (Late Secondary)
    participant API as Vesta API
    participant DB as Database
    participant W as Worker

    Note over C1, W: Late Secondary Arrival Scenario

    C1->>API: POST /submit (SQL, params)
    API->>DB: Create primary statement (QUEUED)
    W->>DB: Pick primary (QUEUED → PICKED)
    W->>W: Execute query (fast completion)
    
    Note over W: T+10s: Primary completes
    W->>DB: handle_primary_completion()
    W->>DB: Update primary (PICKED → SUCCESSFUL)
    W->>DB: Save results with expires_at = T+310s

    Note over C2: T+12s: Late secondary request arrives
    C2->>API: POST /submit (same SQL, params)
    API->>DB: Check cache
    DB-->>API: No cache hit (different code path)
    
    API->>API: find_in_flight_primary()
    
    Note over API: Step 1: Check active primaries
    API->>DB: SELECT WHERE status IN ('queued','picked')
    DB-->>API: No active primaries found
    
    Note over API: Step 2: Check recently completed primaries
    API->>DB: SELECT WHERE status='successful' AND updated_at >= T-30s
    DB-->>API: Found recently completed primary!
    
    API->>API: Mark as cache hit: primary._is_cache_hit = True
    API->>API: create_cache_hit_statement()
    API-->>C2: Immediate response with cached results ✅

    Note over C1, W: ✅ Late secondary gets cached result instead of creating new primary
```

#### Worker Crash and TaskErrorHandler Integration

```mermaid
sequenceDiagram
    participant API as Vesta API
    participant DB as Database
    participant W as Worker Process
    participant PQ as PgQueuer
    participant TH as TaskErrorHandler

    Note over API, TH: Worker Crash Scenario

    API->>DB: Create primary (QUEUED)
    API->>DB: Create 500 secondaries (WAITING_FOR_PRIMARY)
    
    W->>DB: Pick primary (QUEUED → PICKED)
    W->>W: Start query execution...
    
    Note over W: 💥 Worker process crashes (OOM, kill -9, etc.)
    
    Note over PQ: PgQueuer detects worker is gone
    PQ->>TH: task_error_context.__exit__()
    TH->>TH: status_updated=False, error_occurred=False
    TH->>TH: Detect worker crash scenario
    
    TH->>TH: handle_worker_crash()
    TH->>DB: Update primary status to EXCEPTION
    TH->>TH: handle_deduplication_failure()
    
    Note over TH: Call handle_primary_completion with race protection
    TH->>DB: update_primary_with_optimistic_locking()
    TH->>DB: Check: UPDATE WHERE status IN ('queued','picked')
    
    alt Primary Still Active (Normal Case)
        TH->>DB: Primary updated to EXCEPTION ✅
        TH->>TH: update_secondaries_in_batches()
        loop Batch Processing
            TH->>DB: UPDATE batch of 100 secondaries
            TH->>DB: COMMIT batch
        end
        Note over TH: All 500 secondaries marked as EXCEPTION
        
    else Primary Already Handled (Race Condition)
        TH->>DB: Primary update fails (rowcount=0) ❌
        TH->>TH: Log: "Primary already completed, skipping"
        Note over TH: Graceful degradation - no secondary updates needed
    end

    Note over API, TH: ✅ Immediate failure propagation<br/>✅ Clear error messages with retry guidance<br/>✅ No orphaned secondaries
```

#### Complete Decision Flow

```mermaid
flowchart TD
    Start([Client Request]) --> Check1{Deduplication Enabled?}
    Check1 -->|No| CreateRegular[Create Regular Statement]
    Check1 -->|Yes| GenFingerprint[Generate SQL Fingerprint]
    
    GenFingerprint --> CheckCache{Check Completed Cache}
    CheckCache -->|Cache Hit| ReturnCache[Return Cached Results ✅]
    CheckCache -->|No Cache| CheckInflight{Check In-Flight Primaries}
    
    CheckInflight --> SearchActive[Search Active Primaries<br/>status IN QUEUED, PICKED]
    SearchActive --> ActiveFound{Active Primary Found?}
    
    ActiveFound -->|Yes| DoubleCheck[Double-check Status<br/>Race Protection]
    DoubleCheck --> StillActive{Still Active?}
    StillActive -->|Yes| CreateSec[Create Secondary<br/>WAITING_FOR_PRIMARY ✅]
    StillActive -->|No| SearchRecent
    
    ActiveFound -->|No| SearchRecent[Search Recently Completed<br/>status=SUCCESSFUL, updated_at≥T-30s]
    SearchRecent --> RecentFound{Recent Primary Found?}
    
    RecentFound -->|Yes| MarkCache[Mark as Cache Hit<br/>_is_cache_hit = True]
    MarkCache --> ReturnCache
    
    RecentFound -->|No| CreatePrimary[Create Primary Statement<br/>QUEUED ✅]
    
    CreateSec --> SecWait[Secondary Waits for Primary]
    CreatePrimary --> PrimExec[Primary Queued for Execution]
    
    PrimExec --> WorkerPick[Worker Picks Primary<br/>QUEUED → PICKED]
    WorkerPick --> Execute[Execute Query on Target DB]
    
    Execute --> ExecResult{Execution Result}
    ExecResult -->|Success| HandleSuccess[handle_primary_completion<br/>SUCCESS]
    ExecResult -->|Failure| HandleFailure[handle_primary_completion<br/>EXCEPTION]
    ExecResult -->|Timeout/Crash| TaskError[TaskErrorHandler<br/>handle_deduplication_failure]
    
    HandleSuccess --> OptLock1[Optimistic Locking<br/>UPDATE WHERE status IN active]
    HandleFailure --> OptLock2[Optimistic Locking<br/>UPDATE WHERE status IN active]
    TaskError --> OptLock3[Optimistic Locking<br/>UPDATE WHERE status IN active]
    
    OptLock1 --> UpdateSec1[Update Secondaries<br/>Batch Processing]
    OptLock2 --> UpdateSec2[Update Secondaries<br/>Batch Processing]
    OptLock3 --> UpdateSec3[Update Secondaries<br/>Batch Processing]
    
    UpdateSec1 --> Complete1[All Complete ✅<br/>SUCCESSFUL]
    UpdateSec2 --> Complete2[All Complete ✅<br/>EXCEPTION]
    UpdateSec3 --> Complete3[All Complete ✅<br/>EXCEPTION w/ Retry]
    
    SecWait --> WaitResult{Wait Result}
    WaitResult -->|Primary Success| Complete1
    WaitResult -->|Primary Failure| Complete2
    WaitResult -->|Primary Timeout| Complete3
    
    style Start fill:#e1f5fe
    style ReturnCache fill:#c8e6c9
    style CreateSec fill:#fff3e0
    style CreatePrimary fill:#fff3e0
    style Complete1 fill:#c8e6c9
    style Complete2 fill:#ffcdd2
    style Complete3 fill:#ffcdd2
    style CreateRegular fill:#f5f5f5
```

### 3.1 Database Schema Changes

#### 3.1.1 New Columns in `statements` Table

```sql
-- Migration: Add in-flight deduplication support
ALTER TABLE statements ADD COLUMN primary_id UUID REFERENCES statements(id);
ALTER TABLE statements ADD COLUMN dedup_group_id UUID; -- Optional: for better tracking
```

#### 3.1.2 New Indexes

```sql
-- Index for efficient in-flight query lookup (simplified without secondary_count filtering)
CREATE INDEX CONCURRENTLY ix_statements_inflight_lookup 
ON statements (fingerprint, connection_id, status, created_at) 
WHERE status IN ('queued', 'picked');

-- Index for efficient secondary updates
CREATE INDEX CONCURRENTLY ix_statements_primary_secondaries 
ON statements (primary_id, status) 
WHERE primary_id IS NOT NULL;

-- Composite index for deduplication group operations
CREATE INDEX CONCURRENTLY ix_statements_dedup_group 
ON statements (dedup_group_id, status, created_at) 
WHERE dedup_group_id IS NOT NULL;
```

#### 3.1.3 New Status Values

```python
# constants/status.py additions
WAITING_FOR_PRIMARY = "waiting_for_primary"  # Secondary waiting for primary completion
PRIMARY_TIMEOUT = "primary_timeout"          # Primary exceeded timeout, secondaries promoted
DEDUP_ERROR = "dedup_error"                  # Error in deduplication logic

# Update existing status groups
ACTIVE_STATUSES = {QUEUED, PICKED, WAITING_FOR_PRIMARY}
COMPLETED_STATUSES = {SUCCESSFUL, EXCEPTION, CANCELED, DELETED, PRIMARY_TIMEOUT, DEDUP_ERROR}
FAILED_STATUSES = {EXCEPTION, CANCELED, PRIMARY_TIMEOUT, DEDUP_ERROR}
```

### 3.2 Core Algorithm

#### 3.2.1 Enhanced create_statement Function

```python
async def create_statement(
    stmt: StatementCreate, 
    session: AsyncSession, 
    user_id: str = None, 
    dialect: str = None, 
    connection_id: str = None, 
    tenant: str = None
) -> Statement:
    """Enhanced statement creation with in-flight deduplication."""
    
    # Step 1: Generate fingerprint (existing logic)
    fingerprint = generate_combined_fingerprint(stmt, dialect, connection_id)
    ttl_seconds = getattr(stmt, 'ttl_seconds', None)
    now = datetime.now(timezone.utc)
    
    if not ttl_seconds or not fingerprint:
        return await create_regular_statement(stmt, session, user_id, dialect, connection_id, tenant)
    
    # Step 2: Check completed cache (existing logic)
    cache_hit = await find_completed_cache_hit(fingerprint, connection_id, stmt.parameters, now, session)
    if cache_hit:
        return create_cache_hit_statement(cache_hit, stmt, user_id, tenant, now)
    
    # Step 3: Check in-flight queries (NEW LOGIC)
    if await is_deduplication_enabled():
        in_flight_primary = await find_in_flight_primary(fingerprint, connection_id, stmt.parameters, ttl_seconds, now, session)
        if in_flight_primary:
            # Check if this is actually a recently completed query (cache hit)
            if hasattr(in_flight_primary, '_is_cache_hit') and in_flight_primary._is_cache_hit:
                return create_cache_hit_statement(in_flight_primary, stmt, user_id, tenant, now)
            else:
                return await create_secondary_statement(in_flight_primary, stmt, user_id, tenant, now, session)
    
    # Step 4: Create new primary statement
    return await create_primary_statement(stmt, session, user_id, dialect, connection_id, tenant, fingerprint, ttl_seconds, now)

async def find_in_flight_primary(
    fingerprint: str, 
    connection_id: str, 
    parameters: dict, 
    ttl_seconds: int, 
    now: datetime, 
    session: AsyncSession
) -> Optional[Statement]:
    """Find in-flight query or recently completed query for deduplication.
    
    Handles race conditions by checking both active and recently completed primaries.
    No limits on secondaries - unlimited secondaries provide natural throttling.
    """
    
    lookback_time = now - timedelta(seconds=ttl_seconds)
    
    # Step 1: Look for active primaries first (normal case)
    active_query = select(Statement).where(
        and_(
            Statement.fingerprint == fingerprint,
            Statement.connection_id == connection_id,
            Statement.status.in_([status.QUEUED, status.PICKED]),
            Statement.created_at >= lookback_time
        )
    ).order_by(Statement.created_at.asc()).limit(1)  # Take oldest primary
    
    result = await session.execute(active_query)
    active_candidate = result.scalar_one_or_none()
    
    # Check for exact parameter match on active primary
    if active_candidate and parameters_match_exact(active_candidate.parameters, parameters):
        # Double-check status hasn't changed since query (race condition protection)
        await session.refresh(active_candidate)
        if active_candidate.status in [status.QUEUED, status.PICKED]:
            logger.info(f"Found active primary {active_candidate.id} for deduplication")
            return active_candidate
    
    # Step 2: Look for recently completed primaries (race condition mitigation)
    # This handles cases where primary completed just before secondary request arrived
    recently_completed_query = select(Statement).where(
        and_(
            Statement.fingerprint == fingerprint,
            Statement.connection_id == connection_id,
            Statement.status == status.SUCCESSFUL,
            Statement.expires_at > now,  # Still within cache TTL
            Statement.updated_at >= now - timedelta(seconds=30)  # Completed within last 30s
        )
    ).order_by(Statement.updated_at.desc()).limit(1)
    
    result = await session.execute(recently_completed_query)
    completed_candidate = result.scalar_one_or_none()
    
    if completed_candidate and parameters_match_exact(completed_candidate.parameters, parameters):
        logger.info(f"Found recently completed primary {completed_candidate.id}, will return cached result instead of creating secondary")
        # Return special marker indicating this should be treated as cache hit
        completed_candidate._is_cache_hit = True
        return completed_candidate
    
    logger.debug(f"No active or recently completed primary found for fingerprint {fingerprint[:16]}...")
    return None

async def create_secondary_statement(
    primary: Statement, 
    stmt: StatementCreate, 
    user_id: str, 
    tenant: str, 
    now: datetime, 
    session: AsyncSession
) -> Statement:
    """Create a secondary statement that waits for primary completion.
    
    No limits on secondary creation - each additional secondary represents
    an expensive database execution avoided, providing natural throttling.
    """
    
    secondary = Statement(
        id=uuid4(),
        connection_id=primary.connection_id,
        statement_text=stmt.statement_text,
        parameters=stmt.parameters,
        user_id=user_id,
        status=status.WAITING_FOR_PRIMARY,
        tenant=tenant,
        source=getattr(stmt, 'source', 'api'),
        fingerprint=primary.fingerprint,
        expires_at=primary.expires_at,
        parent=primary.id,
        primary_id=primary.id,
        dedup_group_id=primary.dedup_group_id or primary.id,
        created_at=now,
        updated_at=now
    )
    
    session.add(secondary)
    await session.commit()
    await session.refresh(secondary)
    
    logger.info(f"Created secondary statement {secondary.id} for primary {primary.id} - query execution avoided! (Will fail if primary fails)")
    return secondary
```

#### 3.2.2 Primary Completion Handler

```python
async def handle_primary_completion(
    primary_id: str, 
    completion_status: str, 
    results: Optional[Dict[str, Any]] = None, 
    error: Optional[Dict[str, Any]] = None
) -> None:
    """Handle completion of a primary query with race condition protection.
    
    Uses optimistic locking and separate transactions to prevent race conditions
    between normal completion flow and timeout detection.
    """
    
    # Step 1: Update primary with optimistic locking (separate transaction)
    primary_updated = await update_primary_with_optimistic_locking(
        primary_id, completion_status, results, error
    )
    
    if not primary_updated:
        logger.warning(f"Primary {primary_id} already completed by another process, skipping secondary updates")
        return
    
    # Step 2: Update secondaries in batches (separate transactions)
    secondary_count = await update_secondaries_in_batches(
        primary_id, completion_status, results, error
    )
    
    logger.info(f"Primary {primary_id} completed ({completion_status}), updated {secondary_count} secondaries - {secondary_count} expensive executions avoided!")

async def update_primary_with_optimistic_locking(
    primary_id: str,
    completion_status: str, 
    results: Optional[Dict[str, Any]],
    error: Optional[Dict[str, Any]]
) -> bool:
    """Update primary statement with optimistic locking to prevent race conditions."""
    
    async with get_session() as session:
        try:
            # Prepare update data
            update_data = {
                "status": completion_status,
                "stop_time": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
            
            if completion_status == status.SUCCESSFUL and results:
                update_data.update({
                    "results_url": results.get("results_url"),
                    "columns": results.get("columns"), 
                    "row_count": results.get("row_count")
                })
            elif error:
                update_data["error"] = error
            
            # Update primary with optimistic locking - only if still in active state
            result = await session.execute(
                update(Statement)
                .where(
                    and_(
                        Statement.id == primary_id,
                        # ✅ Optimistic locking: only update if still active
                        Statement.status.in_([status.QUEUED, status.PICKED])
                    )
                )
                .values(**update_data)
            )
            
            await session.commit()
            
            if result.rowcount == 0:
                # Primary was already updated by another process (timeout vs completion race)
                logger.info(f"Primary {primary_id} was already completed by another process")
                return False
            
            logger.info(f"Successfully updated primary {primary_id} to {completion_status}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to update primary {primary_id}: {e}")
            await session.rollback()
            raise

async def update_secondaries_in_batches(
    primary_id: str,
    completion_status: str,
    results: Optional[Dict[str, Any]],
    error: Optional[Dict[str, Any]]
) -> int:
    """Update secondaries in batches to handle large numbers efficiently."""
    
    batch_size = 1000
    total_updated = 0
    
    # Prepare update data
    update_data = {
        "status": completion_status,
        "stop_time": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    
    if completion_status == status.SUCCESSFUL and results:
        update_data.update({
            "results_url": results.get("results_url"),
            "columns": results.get("columns"),
            "row_count": results.get("row_count"),
            "start_time": update_data["stop_time"]  # Instant completion for secondaries
        })
    elif error:
        update_data["error"] = error
    
    while True:
        async with get_session() as session:
            try:
                # Get batch of secondary IDs that are still waiting
                batch_query = select(Statement.id).where(
                    and_(
                        Statement.primary_id == primary_id,
                        Statement.status == status.WAITING_FOR_PRIMARY
                    )
                ).limit(batch_size)
                
                batch_result = await session.execute(batch_query)
                batch_ids = batch_result.scalars().all()
                
                if not batch_ids:
                    break  # No more secondaries to update
                
                # Update this batch
                update_result = await session.execute(
                    update(Statement)
                    .where(Statement.id.in_(batch_ids))
                    .values(**update_data)
                )
                
                await session.commit()
                
                batch_updated = update_result.rowcount
                total_updated += batch_updated
                
                logger.debug(f"Updated batch of {batch_updated} secondaries for primary {primary_id}")
                
                # If this batch was smaller than batch_size, we're done
                if len(batch_ids) < batch_size:
                    break
                    
            except Exception as e:
                logger.error(f"Failed to update secondary batch for primary {primary_id}: {e}")
                await session.rollback()
                # Continue with next batch - don't fail entire operation
                break
    
    return total_updated

async def fail_secondaries_gracefully(primary_id: str, error_message: str) -> None:
    """Fail all secondaries of a primary with a graceful error."""
    async with get_session() as session:
        error_data = {
            "type": "DEDUP_ERROR",
            "message": f"Primary query failed during deduplication: {error_message}",
            "query": None
        }
        
        await session.execute(
            update(Statement)
            .where(
                and_(
                    Statement.primary_id == primary_id,
                    Statement.status == status.WAITING_FOR_PRIMARY
                )
            )
            .values(
                status=status.DEDUP_ERROR,
                error=error_data,
                stop_time=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc)
            )
        )
        await session.commit()
```

### 3.3 Task System Integration

#### 3.3.1 Enhanced Task Completion (Leveraging PgQueuer)

```python
# tasks/run_query_task.py - Enhanced completion handler with PgQueuer integration
async def run_query_task(job: Job) -> None:
    """Enhanced query task - PgQueuer handles timeouts, we handle deduplication."""
    statement_id = None
    
    # PgQueuer automatically handles job timeouts via QUERY_TIMEOUT_SECONDS
    # Our task just needs to handle normal completion and propagate to secondaries
    async with task_error_context(
        statement_id=statement_id,
        job_id=str(job.id),
        task_type="run_query_task",
        timeout_seconds=None  # Let PgQueuer handle timeouts
    ) as handler:
        
        # ... existing query execution logic ...
        
        # Enhanced success handling
        if result:
            result_url = await save_results(result, statement_id)
            row_count, column_names = extract_result_metrics(result)
            
            results_data = {
                "row_count": row_count,
                "column_names": column_names,
                "results_url": result_url
            }
            
            # Handle as primary completion (updates secondaries automatically)
            # If this fails, PgQueuer will mark the job as EXCEPTION automatically
            await handle_primary_completion(
                primary_id=statement_id,
                completion_status=status.SUCCESSFUL,
                results=results_data
            )
        else:
            # Handle failure - PgQueuer will mark as EXCEPTION if we don't handle it
            await handle_primary_completion(
                primary_id=statement_id,
                completion_status=status.EXCEPTION,
                error={
                    "type": "NO_RESULTS", 
                    "message": "Query returned no results",
                    "query": statement_text
                }
            )

# PgQueuer Configuration Integration
async def configure_pgqueuer_for_deduplication():
    """Configure PgQueuer with appropriate timeouts for deduplication."""
    
    # PgQueuer job configuration
    job_config = {
        "timeout_seconds": get_env_or_throw("QUERY_TIMEOUT_SECONDS", default=600, cast=int),
        "max_retries": 0,  # Don't auto-retry deduplication jobs
        "retry_delay": None,
        "on_timeout": "mark_failed"  # PgQueuer marks as EXCEPTION on timeout
    }
    
    logger.info(f"Configured PgQueuer with job timeout: {job_config['timeout_seconds']}s")
    return job_config
```

#### 3.3.2 Enhanced Task Error Handler Integration

```python
# utils/task_error_handler.py - Enhanced with deduplication support
import logging
import traceback
from typing import Optional, Dict, Any
from datetime import datetime, timezone
from contextlib import asynccontextmanager

from db.session import get_session
from db.crud.statement import update_statement_status

logger = logging.getLogger("utils.task_error_handler")

class TaskErrorHandler:
    """Enhanced task error handler with built-in deduplication support.
    
    Handles all task failure scenarios and automatically propagates failures
    to secondaries when primaries fail outside the normal execution flow.
    """
    
    def __init__(self, statement_id: str, job_id: str, task_type: str):
        self.statement_id = statement_id
        self.job_id = job_id
        self.task_type = task_type
        self.start_time = datetime.now(timezone.utc)
        self.status_updated = False
        self.error_occurred = False
    
    async def handle_timeout(self, timeout_seconds: int) -> None:
        """Handle task timeout with automatic deduplication cleanup."""
        try:
            # Update primary status
            await self.update_status(
                status.EXCEPTION,
                error={
                    "type": "TIMEOUT",
                    "message": f"Task exceeded timeout of {timeout_seconds} seconds",
                    "task_type": self.task_type,
                    "job_id": self.job_id,
                    "timeout_seconds": timeout_seconds,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                },
                is_complete=True
            )
            
            # Handle deduplication automatically
            await self.handle_deduplication_failure("TIMEOUT", f"Primary query timed out after {timeout_seconds} seconds")
            
            logger.warning(f"[{self.task_type}] Task timed out after {timeout_seconds}s for statement {self.statement_id}")
            
        except Exception as e:
            logger.error(f"[{self.task_type}] Failed to handle timeout for statement {self.statement_id}: {e}")
    
    async def handle_worker_crash(self) -> None:
        """Handle worker crash with automatic deduplication cleanup."""
        try:
            # Update primary status
            await self.update_status(
                status.EXCEPTION,
                error={
                    "type": "WORKER_CRASH",
                    "message": "Worker process crashed or was killed during task execution",
                    "task_type": self.task_type,
                    "job_id": self.job_id,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                },
                is_complete=True
            )
            
            # Handle deduplication automatically
            await self.handle_deduplication_failure("WORKER_CRASH", "Primary query worker crashed")
            
            logger.error(f"[{self.task_type}] Worker crash detected for statement {self.statement_id}")
            
        except Exception as e:
            logger.error(f"[{self.task_type}] Failed to handle worker crash for statement {self.statement_id}: {e}")
    
    async def handle_deduplication_failure(self, error_type: str, error_message: str) -> None:
        """Handle deduplication cleanup when primary fails outside normal execution flow.
        
        This is called automatically when PgQueuer detects timeouts or worker crashes,
        ensuring secondaries are immediately notified of primary failures.
        Uses race condition protection to prevent conflicts with normal completion flow.
        """
        try:
            # Import here to avoid circular imports
            from utils.deduplication_handler import handle_primary_completion
            
            # The handle_primary_completion function now includes optimistic locking
            # to prevent race conditions with normal completion flow
            await handle_primary_completion(
                primary_id=self.statement_id,
                completion_status=status.EXCEPTION,
                error={
                    "type": error_type,
                    "message": f"{error_message}. Please retry your query.",
                    "task_type": self.task_type,
                    "job_id": self.job_id,
                    "retry_recommended": True,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
            )
            
            logger.info(f"[{self.task_type}] Successfully propagated failure to secondaries for primary {self.statement_id}")
            
        except Exception as e:
            logger.error(f"[{self.task_type}] Failed to handle deduplication failure for statement {self.statement_id}: {e}")
            # Don't raise - primary status update already succeeded
            # The optimistic locking in handle_primary_completion ensures consistency
    
    async def update_status(self, new_status: str, **kwargs) -> None:
        """Update statement status with proper error handling."""
        try:
            async with get_session() as session:
                await update_statement_status(
                    statement_id=self.statement_id,
                    status_value=new_status,
                    session=session,
                    execution_id=self.job_id,
                    **kwargs
                )
            self.status_updated = True
            logger.info(f"[{self.task_type}] Updated status to {new_status} for statement {self.statement_id}")
        except Exception as e:
            logger.error(f"[{self.task_type}] Failed to update status to {new_status} for statement {self.statement_id}: {e}")
    
    async def handle_success(self, **kwargs) -> None:
        """Handle successful task completion."""
        try:
            await self.update_status(
                status.SUCCESSFUL,
                is_complete=True,
                **kwargs
            )
            duration = (datetime.now(timezone.utc) - self.start_time).total_seconds()
            logger.info(f"[{self.task_type}] Successfully completed statement {self.statement_id} in {duration:.2f}s")
        except Exception as e:
            logger.error(f"[{self.task_type}] Error in success handler for statement {self.statement_id}: {e}")
    
    async def handle_error(self, error: Exception, error_type: str = "UNKNOWN", **kwargs) -> None:
        """Handle task execution errors."""
        self.error_occurred = True
        error_msg = str(error)
        
        logger.error(
            f"[{self.task_type}] Task failed for statement {self.statement_id} (job {self.job_id}):\n"
            f"Error Type: {error_type}\n"
            f"Error Message: {error_msg}\n"
            f"Traceback: {traceback.format_exc()}"
        )
        
        try:
            await self.update_status(
                status.EXCEPTION,
                error={
                    "type": error_type,
                    "message": error_msg,
                    "task_type": self.task_type,
                    "job_id": self.job_id,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                },
                is_complete=True,
                **kwargs
            )
        except Exception as update_error:
            logger.error(f"[{self.task_type}] Failed to update error status for statement {self.statement_id}: {update_error}")

# The context manager remains the same but now automatically handles deduplication
@asynccontextmanager
async def task_error_context(statement_id: str, job_id: str, task_type: str, timeout_seconds: Optional[int] = None):
    """Context manager for robust task error handling with automatic deduplication support."""
    handler = TaskErrorHandler(statement_id, job_id, task_type)
    timeout_start = None
    
    try:
        # Update status to picked (being processed)
        await handler.update_status(status.PICKED)
        
        if timeout_seconds:
            timeout_start = time.perf_counter()
        
        yield handler
        
    except Exception as e:
        # Handle different types of errors
        error_type = type(e).__name__
        await handler.handle_error(e, error_type)
        raise
    finally:
        # Final cleanup and status check
        if not handler.status_updated and not handler.error_occurred:
            # Task didn't explicitly update status - check for timeout or worker crash
            if timeout_seconds and timeout_start:
                elapsed = time.perf_counter() - timeout_start
                if elapsed > timeout_seconds:
                    await handler.handle_timeout(timeout_seconds)
                else:
                    # Worker crash scenario
                    await handler.handle_worker_crash()
            else:
                # Worker crash scenario (no timeout specified)
                await handler.handle_worker_crash()
```

### 3.4 API Response Enhancements

#### 3.4.1 Enhanced Statement Response Schema

```python
# api/schemas/statement.py - Enhanced response
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class DeduplicationInfo(BaseModel):
    """Information about query deduplication."""
    is_primary: bool = Field(description="Whether this statement is the primary")
    is_secondary: bool = Field(description="Whether this statement is a secondary")
    primary_id: Optional[str] = Field(description="ID of the primary statement if this is a secondary")
    dedup_group_id: Optional[str] = Field(description="Unique identifier for the deduplication group")
    estimated_wait_seconds: Optional[int] = Field(description="Estimated wait time for secondaries")

class StatementResponse(BaseModel):
    """Enhanced statement response with deduplication info."""
    statement_id: str
    status: str
    deduplication_info: Optional[DeduplicationInfo] = None
    cache_info: Optional[Dict[str, Any]] = None  # Existing cache info
    
    @classmethod
    def from_statement(cls, stmt: Statement) -> "StatementResponse":
        """Create response from statement model."""
        dedup_info = None
        
        if stmt.primary_id:
            # This is a secondary
            dedup_info = DeduplicationInfo(
                is_primary=False,
                is_secondary=True,
                primary_id=str(stmt.primary_id),
                dedup_group_id=str(stmt.dedup_group_id) if stmt.dedup_group_id else None,
                estimated_wait_seconds=cls._estimate_wait_time(stmt)
            )
        elif not stmt.primary_id:
            # This might be a primary - check if it has secondaries (optional enhancement)
            # Note: We could add a database lookup here to count secondaries if needed for UI
            dedup_info = DeduplicationInfo(
                is_primary=True,
                is_secondary=False,
                dedup_group_id=str(stmt.dedup_group_id) if stmt.dedup_group_id else None
            )
        
        return cls(
            statement_id=str(stmt.id),
            status=stmt.status,
            deduplication_info=dedup_info
        )
    
    @staticmethod
    def _estimate_wait_time(secondary_stmt: Statement) -> Optional[int]:
        """Estimate remaining wait time for a secondary."""
        if not secondary_stmt.primary_id:
            return None
        
        # Simple estimation based on typical query times
        # Could be enhanced with historical data
        elapsed = datetime.now(timezone.utc) - secondary_stmt.created_at
        return max(0, 60 - int(elapsed.total_seconds()))  # Assume 60s avg query time
```

#### 3.4.2 Enhanced API Endpoints

```python
# api/routes/statements.py - Enhanced submission endpoint
@router.post("/tenant/{tenant_name}/submit/{connection_id:path}", response_model=StatementResponse)
async def submit_statement(
    tenant_name: str,
    connection_id: str,
    statement: StatementCreate,
    request: Request,
    async_session: AsyncSession = Depends(get_session_wrapper)
) -> StatementResponse:
    """Enhanced statement submission with deduplication support."""
    
    # ... existing validation logic ...
    
    # Create statement with deduplication
    created_statement = await create_statement(
        stmt=statement,
        session=async_session,
        user_id=user_details["user_id"],
        dialect=dialect,
        connection_id=connection_id,
        tenant=tenant_name
    )
    
    # Enhanced response
    response = StatementResponse.from_statement(created_statement)
    
    # If this is a cache hit or secondary, return immediately
    if created_statement.status in [status.SUCCESSFUL, status.WAITING_FOR_PRIMARY]:
        return response
    
    # For new primaries, submit to queue as before
    job_id = await submit_task(created_statement, connection_details, user_details, statement.purpose)
    
    # Update with job ID
    await update_statement_status(
        statement_id=str(created_statement.id),
        status_value=status.QUEUED,
        session=async_session,
        execution_id=job_id
    )
    
    return response

# New endpoint for deduplication metrics
@router.get("/deduplication/metrics", response_model=Dict[str, Any])
async def get_deduplication_metrics(
    async_session: AsyncSession = Depends(get_session_wrapper)
) -> Dict[str, Any]:
    """Get deduplication performance metrics."""
    
    now = datetime.now(timezone.utc)
    last_24h = now - timedelta(hours=24)
    
    # Query metrics with dynamic secondary counting
    metrics_query = text("""
        WITH primary_secondary_counts AS (
            SELECT 
                p.id,
                COUNT(s.id) as secondary_count
            FROM statements p
            LEFT JOIN statements s ON s.primary_id = p.id AND s.status = 'waiting_for_primary'
            WHERE p.created_at >= :last_24h
            GROUP BY p.id
        )
        SELECT 
            COUNT(*) FILTER (WHERE primary_id IS NULL AND secondary_count = 0) as independent_queries,
            COUNT(*) FILTER (WHERE primary_id IS NULL AND secondary_count > 0) as primary_queries,
            COUNT(*) FILTER (WHERE primary_id IS NOT NULL) as secondary_queries,
            AVG(secondary_count) FILTER (WHERE secondary_count > 0) as avg_secondaries_per_primary,
            MAX(secondary_count) as max_secondaries_per_primary,
            SUM(secondary_count) as total_executions_avoided
        FROM (
            SELECT 
                s.*,
                COALESCE(psc.secondary_count, 0) as secondary_count
            FROM statements s
            LEFT JOIN primary_secondary_counts psc ON psc.id = s.id
            WHERE s.created_at >= :last_24h
        ) combined_data
    """)
    
    result = await async_session.execute(metrics_query, {"last_24h": last_24h})
    row = result.fetchone()
    
    return {
        "time_period": "24h",
        "independent_queries": row[0] or 0,
        "primary_queries": row[1] or 0,
        "secondary_queries": row[2] or 0,
        "total_queries": (row[0] or 0) + (row[1] or 0) + (row[2] or 0),
        "deduplication_ratio": round((row[2] or 0) / max(1, (row[0] or 0) + (row[1] or 0) + (row[2] or 0)), 3),
        "avg_secondaries_per_primary": round(row[3] or 0, 2),
        "max_secondaries_per_primary": row[4] or 0,
        "total_executions_avoided": row[5] or 0,  # Total expensive executions avoided
        "efficiency_ratio": round((row[5] or 0) / max(1, row[1] or 1), 2)  # Secondaries per primary
    }
```

### 3.5 Module Organization

#### 3.5.1 Preventing Circular Imports

To avoid circular import issues between TaskErrorHandler and deduplication logic:

```python
# utils/deduplication_handler.py - New module (neutral location)
"""
Deduplication completion handler - neutral location to prevent circular imports.
"""
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from sqlalchemy import select, update, and_
from db.session import get_session
from db.models.statement import Statement
from constants import status
import logging

logger = logging.getLogger("deduplication_handler")

# Move handle_primary_completion, update_primary_with_optimistic_locking, 
# and update_secondaries_in_batches functions here
async def handle_primary_completion(...):
    # Implementation as shown above
    
async def update_primary_with_optimistic_locking(...):
    # Implementation as shown above
    
async def update_secondaries_in_batches(...):
    # Implementation as shown above
```

```python
# utils/task_error_handler.py - Clean import
from utils.deduplication_handler import handle_primary_completion

class TaskErrorHandler:
    async def handle_deduplication_failure(self, error_type: str, error_message: str):
        # Clean import from neutral location
        await handle_primary_completion(...)
```

### 3.6 Configuration Management

#### 3.6.1 Environment Variables

```bash
# Feature toggles
IN_FLIGHT_DEDUPLICATION_ENABLED=true
DEDUPLICATION_DEBUG_MODE=false

# Timing configuration
IN_FLIGHT_LOOKUP_WINDOW_SECONDS=300     # How far back to look for in-flight queries

# PgQueuer timeout configuration (handles primary failures automatically)
QUERY_TIMEOUT_SECONDS=600               # PgQueuer job timeout (primary failure detection)
DEQUEUE_TIMEOUT_SEC=1                   # PgQueuer dequeue timeout
RESTART_DELAY_SEC=1                     # PgQueuer worker restart delay

# Performance tuning
DEDUP_INDEX_MAINTENANCE_ENABLED=true    # Enable automatic index maintenance
```

#### 3.6.2 Configuration Helper Functions

```python
# utils/deduplication_config.py
import os
from typing import Dict, Any
import logging

logger = logging.getLogger("deduplication_config")

class DeduplicationConfig:
    """Centralized configuration for deduplication feature."""
    
    @staticmethod
    def is_enabled() -> bool:
        """Check if in-flight deduplication is enabled."""
        return os.getenv("IN_FLIGHT_DEDUPLICATION_ENABLED", "false").lower() == "true"
    
    @staticmethod
    def get_lookup_window_seconds() -> int:
        """Get the lookback window for in-flight queries."""
        return int(os.getenv("IN_FLIGHT_LOOKUP_WINDOW_SECONDS", 300))
    
    @staticmethod
    def get_query_timeout_seconds() -> int:
        """Get PgQueuer job timeout in seconds."""
        return int(os.getenv("QUERY_TIMEOUT_SECONDS", 600))
    
    @staticmethod
    def is_debug_mode() -> bool:
        """Check if debug mode is enabled."""
        return os.getenv("DEDUPLICATION_DEBUG_MODE", "false").lower() == "true"
    
    @staticmethod
    def get_all_config() -> Dict[str, Any]:
        """Get all deduplication configuration."""
        return {
            "enabled": DeduplicationConfig.is_enabled(),
            "lookup_window_seconds": DeduplicationConfig.get_lookup_window_seconds(),
            "query_timeout_seconds": DeduplicationConfig.get_query_timeout_seconds(),
            "debug_mode": DeduplicationConfig.is_debug_mode()
        }

# Convenience functions for use throughout the codebase
async def is_deduplication_enabled() -> bool:
    return DeduplicationConfig.is_enabled()


```

## 4. Database Migration Strategy

### 4.1 Migration Scripts

#### 4.1.1 Forward Migration

```sql
-- Migration: 2024_XX_XX_add_in_flight_deduplication.sql
BEGIN;

-- Add new columns
ALTER TABLE statements 
ADD COLUMN primary_id UUID REFERENCES statements(id),
ADD COLUMN dedup_group_id UUID;

-- Add foreign key constraint
ALTER TABLE statements 
ADD CONSTRAINT fk_statements_primary 
FOREIGN KEY (primary_id) REFERENCES statements(id) ON DELETE SET NULL;

-- Create indexes (using CONCURRENTLY for minimal downtime)
CREATE INDEX CONCURRENTLY ix_statements_inflight_lookup 
ON statements (fingerprint, connection_id, status, created_at) 
WHERE status IN ('queued', 'picked');

CREATE INDEX CONCURRENTLY ix_statements_primary_secondaries 
ON statements (primary_id, status) 
WHERE primary_id IS NOT NULL;

CREATE INDEX CONCURRENTLY ix_statements_dedup_group 
ON statements (dedup_group_id, status, created_at) 
WHERE dedup_group_id IS NOT NULL;

-- Add new status values to any existing status checks
-- (Assuming you have status constraints)

COMMIT;
```

#### 4.1.2 Rollback Migration

```sql
-- Rollback migration
BEGIN;

-- Drop indexes
DROP INDEX IF EXISTS ix_statements_inflight_lookup;
DROP INDEX IF EXISTS ix_statements_primary_secondaries;
DROP INDEX IF EXISTS ix_statements_dedup_group;

-- Drop foreign key constraint
ALTER TABLE statements DROP CONSTRAINT IF EXISTS fk_statements_primary;

-- Drop columns
ALTER TABLE statements 
DROP COLUMN IF EXISTS primary_id,
DROP COLUMN IF EXISTS dedup_group_id;

COMMIT;
```

### 4.2 Data Migration Considerations

```python
# utils/deduplication_migration.py
async def migrate_existing_data():
    """Migrate existing data to support deduplication."""
    async with get_session() as session:
        # Set dedup_group_id for existing statements (for tracking)
        await session.execute(
            update(Statement)
            .where(Statement.dedup_group_id.is_(None))
            .values(dedup_group_id=Statement.id)
        )
        await session.commit()
        logger.info("Migrated existing statements to have dedup_group_id")
```

## 5. Implementation Plan

### 5.1 Phase 1: Core Infrastructure (Week 1-2)

**Week 1:**
1. Database schema changes and migrations
2. Enhanced status constants and utilities
3. PgQueuer timeout configuration integration
4. Unit tests for core components

**Week 2:**
1. Enhanced `create_statement` function
2. Primary-secondary creation logic (unlimited secondaries)
3. Basic completion handler
4. Integration tests

### 5.2 Phase 2: PgQueuer Integration (Week 3)

1. Configure PgQueuer job timeouts for primary failure detection
2. Enhanced task completion handlers (simplified)
3. Remove custom worker crash detection (leverage PgQueuer)
4. Task system integration tests

### 5.3 Phase 3: TaskErrorHandler Enhancement (Week 4)

1. Enhance existing TaskErrorHandler with deduplication support
2. Remove need for separate cleanup service
3. Test immediate failure propagation on timeouts/crashes
4. Stress testing with unlimited concurrent secondaries

### 5.4 Phase 4: Production Readiness (Week 5)

1. Performance optimization
2. Production configuration (PgQueuer + enhanced TaskErrorHandler)
3. Documentation and runbooks
4. Feature flag rollout strategy

## 6. Testing Strategy

### 6.1 Unit Tests

```python
# tests/test_deduplication.py
import pytest
from datetime import datetime, timedelta, timezone
from db.crud.statement import find_in_flight_primary, create_secondary_statement
from api.schemas.statement import StatementCreate

class TestInFlightDeduplication:
    
    @pytest.mark.asyncio
    async def test_find_in_flight_primary_exact_match(self, async_session):
        """Test finding in-flight primary with exact parameter match."""
        # Setup: Create a primary statement
        primary = await create_test_statement(
            statement_text="SELECT * FROM users WHERE id = %(user_id)s",
            parameters={"user_id": 123},
            status="queued",
            session=async_session
        )
        
        # Test: Find the primary
        found_primary = await find_in_flight_primary(
            fingerprint=primary.fingerprint,
            connection_id=primary.connection_id,
            parameters={"user_id": 123},
            ttl_seconds=300,
            now=datetime.now(timezone.utc),
            session=async_session
        )
        
        assert found_primary is not None
        assert found_primary.id == primary.id
    
    @pytest.mark.asyncio
    async def test_find_in_flight_primary_parameter_mismatch(self, async_session):
        """Test that different parameters don't match."""
        # Setup: Create a primary statement
        primary = await create_test_statement(
            statement_text="SELECT * FROM users WHERE id = %(user_id)s",
            parameters={"user_id": 123},
            status="queued",
            session=async_session
        )
        
        # Test: Try to find with different parameters
        found_primary = await find_in_flight_primary(
            fingerprint=primary.fingerprint,
            connection_id=primary.connection_id,
            parameters={"user_id": 456},  # Different value
            ttl_seconds=300,
            now=datetime.now(timezone.utc),
            session=async_session
        )
        
        assert found_primary is None
    
    @pytest.mark.asyncio
    async def test_secondary_creation(self, async_session):
        """Test secondary statement creation."""
        # Setup: Create a primary
        primary = await create_test_statement(
            statement_text="SELECT * FROM users",
            status="queued",
            session=async_session
        )
        
        # Test: Create secondary
        stmt_create = StatementCreate(
            statement_text="SELECT * FROM users",
            ttl_seconds=300
        )
        
        secondary = await create_secondary_statement(
            primary=primary,
            stmt=stmt_create,
            user_id="test_user",
            tenant="test_tenant",
            now=datetime.now(timezone.utc),
            session=async_session
        )
        
        assert secondary.primary_id == primary.id
        assert secondary.status == "waiting_for_primary"
        assert secondary.fingerprint == primary.fingerprint
```

### 6.2 Integration Tests

```python
# tests/test_deduplication_integration.py
import pytest
import asyncio
from datetime import datetime, timezone
from api.routes.statements import submit_statement
from api.schemas.statement import StatementCreate

class TestDeduplicationIntegration:
    
    @pytest.mark.asyncio
    async def test_concurrent_identical_queries(self, client, async_session):
        """Test that concurrent identical queries are deduplicated."""
        
        # Create identical statement
        statement = StatementCreate(
            statement_text="SELECT COUNT(*) FROM large_table",
            ttl_seconds=300
        )
        
        # Submit multiple identical requests concurrently
        tasks = []
        for i in range(5):
            task = submit_statement(
                tenant_name="test",
                connection_id="test_conn",
                statement=statement,
                request=mock_request(user_id=f"user_{i}"),
                async_session=async_session
            )
            tasks.append(task)
        
        # Execute concurrently
        responses = await asyncio.gather(*tasks)
        
        # Verify responses
        assert len(responses) == 5
        
        # First should be primary, rest should be secondaries
        primary_count = sum(1 for r in responses if r.deduplication_info and r.deduplication_info.is_primary)
        secondary_count = sum(1 for r in responses if r.deduplication_info and r.deduplication_info.is_secondary)
        
        assert primary_count == 1
        assert secondary_count == 4
        
        # All secondaries should point to the same primary
        primary_ids = {r.deduplication_info.primary_id for r in responses if r.deduplication_info and r.deduplication_info.is_secondary}
        assert len(primary_ids) == 1
    
    @pytest.mark.asyncio
    async def test_primary_completion_updates_secondaries(self, async_session, mock_query_results):
        """Test that primary completion updates all secondaries."""
        
        # Create primary and secondaries manually
        primary = await create_test_statement(status="picked", session=async_session)
        secondaries = []
        
        for i in range(3):
            secondary = await create_test_statement(
                status="waiting_for_primary",
                primary_id=primary.id,
                session=async_session
            )
            secondaries.append(secondary)
        
        # Simulate primary completion
        await handle_primary_completion(
            primary_id=str(primary.id),
            completion_status="successful",
            results={
                "results_url": "s3://bucket/results.parquet",
                "columns": [{"name": "count", "type": "integer"}],
                "row_count": 1
            }
        )
        
        # Verify all secondaries were updated
        for secondary in secondaries:
            await async_session.refresh(secondary)
            assert secondary.status == "successful"
            assert secondary.results_url == "s3://bucket/results.parquet"
            assert secondary.row_count == 1
```

### 6.3 Performance Tests

```python
# tests/test_deduplication_performance.py
import pytest
import time
import asyncio
from concurrent.futures import ThreadPoolExecutor

class TestDeduplicationPerformance:
    
    @pytest.mark.asyncio
    @pytest.mark.performance
    async def test_deduplication_lookup_performance(self, async_session):
        """Test performance of deduplication lookups."""
        
        # Setup: Create many statements for realistic lookup conditions
        await self.create_many_statements(1000, async_session)
        
        # Test: Measure lookup time
        start_time = time.perf_counter()
        
        for _ in range(100):
            await find_in_flight_primary(
                fingerprint="test_fingerprint",
                connection_id="test_conn",
                parameters={"test": "value"},
                ttl_seconds=300,
                now=datetime.now(timezone.utc),
                session=async_session
            )
        
        end_time = time.perf_counter()
        avg_lookup_time = (end_time - start_time) / 100
        
        # Assertion: Should be under 10ms per lookup
        assert avg_lookup_time < 0.01, f"Lookup too slow: {avg_lookup_time:.4f}s"
    
    @pytest.mark.asyncio
    @pytest.mark.performance  
    async def test_unlimited_secondary_creation(self, async_session):
        """Test performance with unlimited concurrent secondaries (natural throttling)."""
        
        # Create primary
        primary = await create_test_statement(status="queued", session=async_session)
        
        # Create many secondaries concurrently - no limits!
        start_time = time.perf_counter()
        
        tasks = []
        for i in range(1000):  # Test with 1000 secondaries
            stmt = StatementCreate(statement_text="SELECT 1", ttl_seconds=300)
            task = create_secondary_statement(
                primary=primary,
                stmt=stmt,
                user_id=f"user_{i}",
                tenant="test",
                now=datetime.now(timezone.utc),
                session=async_session
            )
            tasks.append(task)
        
        secondaries = await asyncio.gather(*tasks)
        end_time = time.perf_counter()
        
        # Verify all created successfully
        assert len(secondaries) == 1000
        
        # Performance check - should scale well
        total_time = end_time - start_time
        assert total_time < 30.0, f"Secondary creation too slow: {total_time:.2f}s"
        
        # This represents 1000 expensive executions avoided!
    
    @pytest.mark.asyncio
    async def test_race_condition_protection(self, async_session):
        """Test that optimistic locking prevents race conditions."""
        
        # Create primary and secondaries
        primary = await create_test_statement(status="picked", session=async_session)
        secondaries = []
        for i in range(10):
            secondary = await create_test_statement(
                status="waiting_for_primary",
                primary_id=primary.id,
                session=async_session
            )
            secondaries.append(secondary)
        
        # Simulate race condition: both normal completion and timeout try to update
        async def complete_normally():
            await handle_primary_completion(
                primary_id=str(primary.id),
                completion_status="successful",
                results={"results_url": "s3://bucket/success.parquet"}
            )
        
        async def timeout_handler():
            await handle_primary_completion(
                primary_id=str(primary.id),
                completion_status="exception",
                error={"type": "TIMEOUT", "message": "Query timed out"}
            )
        
        # Run both concurrently
        results = await asyncio.gather(
            complete_normally(),
            timeout_handler(),
            return_exceptions=True
        )
        
        # Verify only one succeeded (optimistic locking worked)
        await async_session.refresh(primary)
        assert primary.status in ["successful", "exception"]  # One of them won
        
        # Verify all secondaries have consistent status
        for secondary in secondaries:
            await async_session.refresh(secondary)
            assert secondary.status == primary.status  # All consistent
    
    @pytest.mark.asyncio  
    async def test_late_secondary_creation(self, async_session):
        """Test that late secondaries get cached results instead of creating new primaries."""
        
        # Create and complete primary
        primary = await create_test_statement(
            status="successful",
            fingerprint="test_fingerprint",
            expires_at=datetime.now(timezone.utc) + timedelta(seconds=300),
            updated_at=datetime.now(timezone.utc),  # Just completed
            session=async_session
        )
        
        # Simulate late secondary request (within 30-second window)
        stmt = StatementCreate(statement_text="SELECT 1", ttl_seconds=300)
        result = await find_in_flight_primary(
            fingerprint="test_fingerprint",
            connection_id=primary.connection_id,
            parameters={},
            ttl_seconds=300,
            now=datetime.now(timezone.utc),
            session=async_session
        )
        
        # Should find the recently completed primary and mark as cache hit
        assert result is not None
        assert hasattr(result, '_is_cache_hit')
        assert result._is_cache_hit is True
```

## 7. Monitoring and Observability

### 7.1 Metrics to Track

```python
# utils/deduplication_metrics.py
from prometheus_client import Counter, Histogram, Gauge
import time

# Counters
dedup_queries_total = Counter(
    'vesta_dedup_queries_total',
    'Total number of queries processed by deduplication system',
    ['query_type', 'result']  # query_type: primary/secondary, result: hit/miss/error
)

dedup_cache_hits_total = Counter(
    'vesta_dedup_cache_hits_total', 
    'Total number of cache hits'
)

dedup_secondary_creations_total = Counter(
    'vesta_dedup_secondary_creations_total',
    'Total number of secondaries created'
)

# Histograms
dedup_lookup_duration_seconds = Histogram(
    'vesta_dedup_lookup_duration_seconds',
    'Time spent on deduplication lookups',
    buckets=[0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0]
)

dedup_secondary_wait_duration_seconds = Histogram(
    'vesta_dedup_secondary_wait_duration_seconds', 
    'Time secondaries wait for primary completion',
    buckets=[1, 5, 10, 30, 60, 120, 300, 600, 1200]
)

# Gauges
dedup_active_primaries = Gauge(
    'vesta_dedup_active_primaries',
    'Number of currently active primary queries'
)

dedup_waiting_secondaries = Gauge(
    'vesta_dedup_waiting_secondaries', 
    'Number of secondaries currently waiting'
)

dedup_avg_secondaries_per_primary = Gauge(
    'vesta_dedup_avg_secondaries_per_primary',
    'Average number of secondaries per primary'
)

class DeduplicationMetrics:
    """Helper class for recording deduplication metrics."""
    
    @staticmethod
    def record_query_processed(query_type: str, result: str):
        """Record a processed query."""
        dedup_queries_total.labels(query_type=query_type, result=result).inc()
    
    @staticmethod
    def record_lookup_time(duration: float):
        """Record deduplication lookup duration."""
        dedup_lookup_duration_seconds.observe(duration)
    
    @staticmethod
    def record_secondary_created():
        """Record secondary creation."""
        dedup_secondary_creations_total.inc()
    
    @staticmethod
    def record_secondary_wait_time(duration: float):
        """Record how long a secondary waited."""
        dedup_secondary_wait_duration_seconds.observe(duration)
    
    @staticmethod
    async def update_gauges():
        """Update gauge metrics from database."""
        async with get_session() as session:
            # Count active primaries (statements with waiting secondaries)
            primaries_query = select(func.count(Statement.id.distinct())).where(
                Statement.id.in_(
                    select(Statement.primary_id).where(
                        Statement.status == 'waiting_for_primary'
                    ).distinct()
                )
            )
            primaries_result = await session.execute(primaries_query)
            active_primaries = primaries_result.scalar() or 0
            dedup_active_primaries.set(active_primaries)
            
            # Count waiting secondaries
            secondaries_query = select(func.count(Statement.id)).where(
                Statement.status == 'waiting_for_primary'
            )
            secondaries_result = await session.execute(secondaries_query)
            waiting_secondaries = secondaries_result.scalar() or 0
            dedup_waiting_secondaries.set(waiting_secondaries)
            
            # Calculate average secondaries per primary
            if active_primaries > 0:
                avg_secondaries = waiting_secondaries / active_primaries
                dedup_avg_secondaries_per_primary.set(avg_secondaries)
            else:
                dedup_avg_secondaries_per_primary.set(0)

# Context manager for timing deduplication operations
class DeduplicationTimer:
    def __init__(self, operation: str):
        self.operation = operation
        self.start_time = None
    
    def __enter__(self):
        self.start_time = time.perf_counter()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        duration = time.perf_counter() - self.start_time
        if self.operation == "lookup":
            DeduplicationMetrics.record_lookup_time(duration)
```

### 7.2 Logging Strategy

```python
# utils/deduplication_logger.py
import logging
import json
from datetime import datetime, timezone
from typing import Dict, Any, Optional

class DeduplicationLogger:
    """Specialized logger for deduplication events."""
    
    def __init__(self):
        self.logger = logging.getLogger("vesta.deduplication")
    
    def log_primary_created(self, statement_id: str, fingerprint: str, user_id: str):
        """Log creation of a primary statement."""
        self.logger.info(
            "Primary created",
            extra={
                "event_type": "primary_created",
                "statement_id": statement_id,
                "fingerprint": fingerprint[:16],  # First 16 chars for privacy
                "user_id": user_id,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        )
    
    def log_secondary_created(self, secondary_id: str, primary_id: str, user_id: str, wait_estimate: Optional[int] = None):
        """Log creation of a secondary statement."""
        extra_data = {
            "event_type": "secondary_created",
            "secondary_id": secondary_id,
            "primary_id": primary_id,
            "user_id": user_id,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        if wait_estimate:
            extra_data["estimated_wait_seconds"] = wait_estimate
        
        self.logger.info("Secondary created", extra=extra_data)
    
    def log_primary_completed(self, primary_id: str, secondary_count: int, duration: float, success: bool):
        """Log primary completion and secondary updates."""
        self.logger.info(
            f"Primary completed ({'success' if success else 'failure'})",
            extra={
                "event_type": "primary_completed",
                "primary_id": primary_id,
                "secondary_count": secondary_count,
                "duration_seconds": round(duration, 3),
                "success": success,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        )
    
    def log_deduplication_miss(self, fingerprint: str, reason: str):
        """Log when deduplication lookup misses."""
        self.logger.debug(
            "Deduplication miss",
            extra={
                "event_type": "deduplication_miss", 
                "fingerprint": fingerprint[:16],
                "reason": reason,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        )
    
    def log_timeout_event(self, statement_id: str, statement_type: str, action: str):
        """Log timeout-related events."""
        self.logger.warning(
            f"Timeout event: {action}",
            extra={
                "event_type": "timeout",
                "statement_id": statement_id,
                "statement_type": statement_type,  # primary/secondary
                "action": action,  # promoted/failed/retried
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        )
    
    def log_error(self, error_type: str, statement_id: str, error_message: str, context: Optional[Dict[str, Any]] = None):
        """Log deduplication errors."""
        extra_data = {
            "event_type": "deduplication_error",
            "error_type": error_type,
            "statement_id": statement_id,
            "error_message": error_message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        if context:
            extra_data["context"] = context
        
        self.logger.error(f"Deduplication error: {error_type}", extra=extra_data)

# Global instance
dedup_logger = DeduplicationLogger()
```

## 8. Security Considerations

### 8.1 Access Control

- **Tenant Isolation**: Deduplication MUST respect tenant boundaries
- **User Privacy**: Secondaries MUST NOT see primary's user information
- **Parameter Security**: Query parameters MUST remain encrypted in logs

### 8.2 Resource Protection

- **Natural Rate Limiting**: Unlimited secondaries provide inherent rate limiting through deduplication
- **Memory Management**: Efficient cleanup of completed deduplication groups
- **Cost Control**: Each additional secondary represents avoided expensive query execution

## 9. Rollout Strategy

### 9.1 Feature Flag Implementation

```python
# Feature flag integration
def should_use_deduplication(connection_id: str, user_id: str) -> bool:
    """Determine if deduplication should be used for this request."""
    
    # Global feature flag
    if not DeduplicationConfig.is_enabled():
        return False
    
    # Per-connection feature flag (optional)
    if connection_id in get_deduplication_blacklist():
        return False
    
    # Gradual rollout by user_id hash
    user_hash = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
    rollout_percentage = int(os.getenv("DEDUPLICATION_ROLLOUT_PERCENTAGE", 100))
    return (user_hash % 100) < rollout_percentage
```

### 9.2 Gradual Rollout Plan

1. **Week 1**: Deploy with feature disabled, monitor baseline metrics
2. **Week 2**: Enable for 10% of traffic, monitor for issues
3. **Week 3**: Increase to 50% of traffic
4. **Week 4**: Increase to 100% of traffic
5. **Week 5**: Remove feature flag, make permanent

## 10. Success Metrics

### 10.1 Performance Metrics

- **Query Reduction**: Target 50-90% reduction in duplicate query executions (unlimited secondaries)
- **Response Time**: No degradation in API response times
- **Database Load**: Significant reduction in database connection usage
- **Cost Savings**: Massive reduction in cloud data warehouse costs (proportional to secondary count)
- **Natural Scaling**: System becomes MORE efficient under higher duplicate loads
- **Failure Clarity**: Clean failure modes with explicit retry recommendations
- **Architecture Simplicity**: 70% reduction in custom infrastructure code by leveraging PgQueuer + TaskErrorHandler

### 10.2 Quality Metrics

- **Error Rate**: No increase in query failure rates
- **Data Consistency**: 100% accuracy in secondary result matching
- **System Stability**: No impact on system uptime
- **Retry Success**: High success rate on client retries after failures

## 11. Future Enhancements

### 11.1 Advanced Features

- **Smart Timeout Prediction**: Use historical data to predict query completion times
- **Priority-Based Deduplication**: Allow high-priority queries to jump ahead
- **Cross-Tenant Deduplication**: Careful deduplication across tenant boundaries
- **Result Streaming**: Stream results to secondaries as they become available

### 11.2 PgQueuer Integration Enhancements

- **Job Dependencies**: Explore PgQueuer's job dependency system for primary-secondary relationships
- **Custom Job Priorities**: Use PgQueuer priorities for urgent queries
- **Enhanced Monitoring**: Leverage PgQueuer's built-in metrics for better observability
- **Batch Processing**: Use PgQueuer's batch capabilities for bulk secondary updates

### 11.3 Performance Optimizations

- **Bloom Filters**: Use bloom filters for faster fingerprint lookups
- **Connection Pooling**: Optimize database connections for deduplication queries
- **Caching Layer**: Add Redis layer for frequently accessed deduplication data

---

---

## Document Information

| **Field** | **Value** |
|-----------|-----------|
| **Document Version** | 2.0 |
| **Author** | AI Assistant |
| **Date** | December 2024 |
| **Review Status** | Ready for Review |
| **Last Updated** | December 2024 |

## Document Summary

This document provides the complete technical specification for implementing in-flight query deduplication in Vesta. The design leverages PgQueuer's built-in capabilities for simplified and reliable failure handling, includes comprehensive race condition protection, and provides detailed visual documentation through architecture diagrams and sequence flows.

**Key Features:**
- ✅ Primary-secondary deduplication pattern with unlimited scaling
- ✅ Race condition protection with optimistic locking
- ✅ PgQueuer integration for simplified timeout handling  
- ✅ Enhanced TaskErrorHandler for immediate failure propagation
- ✅ Comprehensive visual documentation and test coverage

This document should be reviewed by the development team and updated based on implementation feedback.

## **Key Architectural Decision**

**Leverage PgQueuer + Enhanced TaskErrorHandler:**
- ✅ **PgQueuer handles**: Job timeouts, worker lifecycle, and queue management
- ✅ **TaskErrorHandler handles**: Immediate deduplication failure propagation  
- ✅ **Our system handles**: Primary-secondary relationships and result sharing
- ✅ **Result**: Simpler, more reliable architecture with 70% less custom infrastructure code
