# DataOS Technical Architecture Deep Dive

## **Architectural Foundation: The Tier 4 Semantic Layer**

The DataOS architecture is built around the **Tier 4 Semantic Layer**, which serves as the foundational component that enables platform-wide semantic capabilities. This layer maps business concepts to physical data structures and provides the semantic context that flows through all other tiers:

- **Business Logic Translation**: Converts business intent into technical execution plans
- **Cross-Engine Consistency**: Ensures semantic meaning is preserved across different compute engines
- **Governance Integration**: Embeds business rules and policies into data access patterns
- **AI-Ready Context**: Provides the semantic foundation required for reliable AI applications

All technical flows described below leverage this Semantic Layer as the central coordination point for business meaning and technical execution.

## **System Flow and Connective Tissue**

**What Flows Through the Architecture:**

The DataOS architecture operates through three distinct but interconnected flows:

**1. Metadata Flow (Control Plane)**
- **Source**: Business definitions, schema changes, governance policies, lineage updates
- **Processing**: Semantic compiler validates and optimizes metadata across tiers
- **Storage**: Unified metadata graph in Tier 3 Core Kernel
- **Distribution**: Propagated to all consumption layers and compute engines

**2. Data Flow (Data Plane)**  
- **Ingestion**: Raw data enters through Tier 3 Data Primitives (Iceberg, streaming, batch)
- **Processing**: Multi-tenant scheduler routes workloads to optimal compute engines
- **Transformation**: Business logic compiled to engine-specific optimized queries
- **Consumption**: Served through Tier 5 APIs with applied governance policies

**3. Intent Flow (Orchestration Plane)**
- **Input**: Declarative data product definitions, user queries, AI agent requests
- **Translation**: Semantic compiler converts intent to execution plans
- **Orchestration**: Tier 2 Cloud Kernel manages resource allocation and scheduling
- **Feedback**: Usage patterns and performance metrics inform optimization

**Inter-Tier Communication Protocols:**

**Tier 5 ↔ Tier 4**: GraphQL/REST APIs with semantic context injection from Semantic Layer
**Tier 4 ↔ Tier 3**: Compiled query plans with semantic mappings and metadata enrichment
**Tier 3 ↔ Tier 2**: Resource allocation requests with SLA requirements  
**Tier 2 ↔ Tier 1**: Cloud-agnostic provisioning commands with cost optimization

## **User Journey: Defining a Metric**

**Scenario**: A business analyst defines "Customer Lifetime Value" as a new metric

**Step 1: Intent Declaration (Tier 5 → Tier 4)**
```yaml
# Data Product Definition
apiVersion: dataos.info/v1
kind: DataProduct
metadata:
  name: customer-ltv-metric
spec:
  description: "Customer Lifetime Value calculation for enterprise customers"
  inputs:
    - product: "customer-data-hub"
      dataset: "customers"
    - product: "transaction-ledger" 
      dataset: "purchases"
  outputs:
    - name: "ltv_enterprise_customers"
      description: "90-day CLV for enterprise segment"
```

**Step 2: Semantic Resolution (Tier 4 → Tier 3)**
- Tier 4 Semantic Layer maps business concepts to physical data structures
- Semantic compiler resolves "customer-data-hub.customers" to physical tables across BigQuery, Snowflake
- Validates schema compatibility between customer and transaction data through semantic mappings
- Applies governance policies (PII masking, regional access controls) via Semantic Layer rules
- Generates lineage graph connecting CLV metric to source systems through semantic relationships

**Step 3: Query Compilation (Tier 3)**
- Intent engine translates business logic from Tier 4 Semantic Layer to optimized SQL for each compute engine
- Cost optimizer selects BigQuery for historical analysis, Snowflake for real-time updates
- Metadata registry tracks dependencies and impact analysis across semantic relationships

**Step 4: Resource Orchestration (Tier 3 → Tier 2 → Tier 1)**
- Multi-tenant scheduler provisions BigQuery slots in us-central1 (lowest cost)
- Cloud kernel allocates Snowflake compute credits for EU customers (compliance)
- Infrastructure tier handles network routing and storage optimization

**Step 5: Policy Application (Throughout Stack)**
- Row-level security applied: EU customers only accessible from EU infrastructure
- Column masking: PII fields automatically anonymized for non-privileged users
- Audit logging: All data access tracked for compliance reporting

**Step 6: Consumption Activation (Tier 5)**
- CLV metric available via REST API: `GET /api/v1/metrics/customer-ltv`
- Natural language queries enabled: "What's the CLV for enterprise customers in Germany?"
- MCP protocol exposes governed access for AI agents

## **Technical Anchors: Multi-Engine Orchestration**

**Problem**: Organizations have BigQuery for analytics, Snowflake for operational reporting, and Databricks for ML - but no unified way to optimize across them.

**DataOS Solution**: The semantic compiler and multi-tenant scheduler provide intelligent workload placement:

**Query Analysis Engine:**
```
Business Query: "Show CLV trends by region for the past 90 days"

Semantic Compiler Analysis:
- Data Sources: customer_data (BigQuery), transactions (Snowflake), regional_mapping (Databricks)
- Compute Requirements: 500GB scan, aggregation heavy, no ML inference
- Compliance: EU data must stay in EU region
- Cost Analysis: BigQuery 40% cheaper for this workload pattern
```

**Execution Plan:**
1. **Metadata Resolution**: Unified schema registry resolves field mappings across engines
2. **Compute Selection**: Cost optimizer routes aggregation to BigQuery, joins data from Snowflake via federated queries
3. **Result Materialization**: Output cached in Iceberg format for future queries
4. **Policy Enforcement**: EU customer data processed only in EU BigQuery regions

**Cross-Engine Optimization:**
- **Spark Integration**: Complex transformations automatically routed to Spark when SQL limitations exceeded
- **Trino Federation**: Cross-engine joins handled seamlessly through Trino's federated query capabilities
- **Iceberg Unification**: All results stored in vendor-neutral Iceberg format for maximum portability

## **Control Plane vs Data Plane Architecture**

**Control Plane (Declarative)**
- **What**: Metadata management, policy definition, resource allocation, governance rules
- **Ownership**: DataOS Core Kernel (Tier 3)
- **Interface**: GitOps workflows, YAML/JSON specifications, REST APIs
- **Examples**:
  - Data product definitions
  - Governance policies (masking, access controls)
  - Resource allocation rules
  - Schema evolution management

**Data Plane (Compiled Execution)**
- **What**: Actual data processing, query execution, storage operations
- **Ownership**: Individual compute engines (BigQuery, Snowflake, Spark) orchestrated by DataOS
- **Interface**: Engine-native protocols (SQL, Spark APIs, etc.)
- **Examples**:
  - SQL query execution
  - Data ingestion pipelines
  - Model training workloads
  - Real-time stream processing

**Compilation Boundary:**
```
Control Plane                    Data Plane
─────────────────────────────────────────────────────
Business Intent                  ┌─→ BigQuery SQL
     ↓                          │
Semantic Compiler   ────────────┼─→ Snowflake SQL
     ↓                          │  
Execution Plan                   └─→ Spark PySpark Code
```

**Who Owns What:**

**DataOS Owns (Control Plane):**
- Tier 4 Semantic Layer for business concept mapping
- Unified metadata registry and schema evolution
- Cross-engine query optimization and workload routing
- Governance policy enforcement and audit trails
- Resource scheduling and cost optimization
- API standardization and semantic consistency

**Compute Engines Own (Data Plane):**
- Physical query execution and performance optimization
- Storage format handling and compression
- Memory management and parallel processing
- Engine-specific performance tuning

**Execution Flow Example:**
1. **User**: Declares data product in YAML (Control Plane)
2. **DataOS**: Validates schema, applies policies, generates execution plan (Control Plane)
3. **DataOS**: Routes optimized query to BigQuery (Control → Data Plane)
4. **BigQuery**: Executes SQL, returns results (Data Plane)
5. **DataOS**: Applies post-processing policies, updates lineage (Control Plane)
6. **DataOS**: Serves results via standardized API (Control Plane)

This architecture ensures DataOS maintains unified governance and optimization while leveraging the specialized performance capabilities of each compute engine.

## **Real-World Policy Application Flow**

**Scenario**: An EU customer data protection policy needs to be applied across all customer data access

**Step 1: Policy Definition (Control Plane)**
```yaml
apiVersion: dataos.info/v1
kind: Policy
metadata:
  name: eu-customer-data-protection
spec:
  scope:
    - datasets: ["customer-data-hub.customers", "transaction-ledger.purchases"]
    - regions: ["EU"]
  rules:
    - type: "data-residency"
      requirement: "eu-only-processing"
    - type: "column-masking"
      fields: ["email", "phone", "address"]
      method: "partial-hash"
    - type: "row-filtering"
      condition: "region = 'EU' AND consent_status = 'active'"
```

**Step 2: Policy Compilation (Tier 4 → Tier 3)**
- Tier 4 Semantic Layer analyzes policy impact across all data products and semantic mappings
- Semantic compiler generates engine-specific enforcement rules:
  - **BigQuery**: Row-level security policies + column masking functions
  - **Snowflake**: Dynamic data masking + secure views
  - **Databricks**: Unity Catalog attribute-based access controls

**Step 3: Policy Distribution (Tier 3 → All Engines)**
- Metadata registry updates schema definitions with policy annotations
- Compute engines receive policy updates via their native governance APIs
- Cross-engine consistency validated through policy verification queries

**Step 4: Runtime Enforcement**
When a user queries customer data:
```sql
-- User Query (Business Intent)
SELECT customer_id, email, total_purchases 
FROM customer_analytics 
WHERE region = 'Germany'

-- Compiled Query (BigQuery - Data Plane)
SELECT 
  customer_id,
  CASE WHEN CURRENT_USER() IN ('privileged_users') 
    THEN email 
    ELSE CONCAT(SUBSTR(email, 1, 3), '***', SUBSTR(email, -10)) 
  END as email,
  total_purchases
FROM customer_analytics_secure_view
WHERE region = 'Germany' 
  AND consent_status = 'active'
  AND processing_region = 'eu-west-1'
```

**Step 5: Audit and Compliance**
- Every policy application logged with full context
- Lineage tracking shows which policies affected each data access
- Compliance reports generated automatically for auditors

This demonstrates how DataOS's control plane ensures consistent policy enforcement across heterogeneous compute engines while maintaining performance and user experience. 