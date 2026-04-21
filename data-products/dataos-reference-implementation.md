# DataOS: A Reference Implementation

*A companion to the Data Products manifesto, describing how DataOS implements the path a Data Product travels from first question to active consumption. Read the manifesto first for the position; read this for the implementation.*

**Version:** 0.9 (for internal review)
**Last updated:** 22 April 2026
**Owner:** [Name / role]
**Status:** Draft, companion to the Data Products manifesto.

---

## Contents

1. **Purpose**: what this document is, who it's for, and how it relates to the Data Products manifesto.
2. **The Three-Stage Flow**: Discovery, Production, Consumption, and the engine as the through-line.
3. **The Engine: Through-line Across All Stages**: what the engine is, and the two patterns for choosing one.
4. **Discovery, Before the Data Product Exists**: answering *what do I have, and can I build what I want from it?* before committing to build.
5. **Production, Building the Data Product**: where Data Products are built in the chosen engine, including AI-assisted construction.
6. **Consumption, Accessing the Data Product**: the API, protocol, BI, and AI-agent surfaces through which Data Products are used.
7. **Governance, Lineage, Observability Across All Stages**: the horizontal capabilities that wrap around the three stages.
8. **Full-stack and Overlay Patterns**: the two realistic adoption shapes and when each fits.

---

## 1. Purpose

The Data Products manifesto sets out a position: what a Data Product is, how it is grounded, how it is governed, and what the organization commits against. This document is its companion. It describes how DataOS implements the ideas in the manifesto, stage by stage.

The document is for anyone who has read the manifesto and needs to understand what building a Data Product in DataOS actually looks like in practice. It does not repeat the manifesto's arguments; it assumes them. The manifesto is the *why*. This is the *how*.

Every capability in DataOS is designed to move a team along the **Discovery → Production → Consumption** path for Data Products. There is no more, and no less. The sections that follow describe those capabilities stage by stage.

---

## 2. The Three-Stage Flow

A Data Product in DataOS is supported across three stages: **Discovery**, **Production**, and **Consumption**. Discovery happens before any specific Data Product exists, when a team is answering *"what data do we have, and can we build what we want from it?"* Production is where a decided-upon Data Product is built in the chosen engine. Consumption is where the built Data Product is used by humans, applications, and agents.

Strictly, only Production and Consumption are stages of a Data Product's lifecycle. Discovery is what happens *before* a Data Product exists at all. The three stages are grouped here because the capabilities supporting them all live in DataOS, and a team moves through them in sequence when building something new.

The engine is the through-line across all three. In Discovery, a team inspects what lives in the engine (and brings in what's missing). In Production, Data Products are built in the engine. In Consumption, consumers read from the engine. DataOS is the control plane; the engine is where the bytes actually live.

```
┌──────────────────────────────────────────────────────────────────────┐
│                        DataOS  (control plane)                       │
│                                                                      │
│   ┌───────────────┐    ┌───────────────┐    ┌───────────────┐        │
│   │   Discovery   │───►│  Production   │───►│  Consumption  │        │
│   │  before DP    │    │ Data Product  │    │  APIs · BI ·  │        │
│   │    exists     │    │   is built    │    │   AI agents   │        │
│   └───────┬───────┘    └───────┬───────┘    └───────┬───────┘        │
│           │                    │                    │                │
│           ▼                    ▼                    ▼                │
│   ┌──────────────────────────────────────────────────────────┐       │
│   │              ENGINE  (through-line)                      │       │
│   │   DataOS Lakehouse  (Iceberg + Spark/Trino)              │       │
│   │               OR                                         │       │
│   │   External engine  (Snowflake, BigQuery, Databricks,     │       │
│   │                     Postgres, ...)                       │       │
│   └──────────────────────────────────────────────────────────┘       │
│                                                                      │
│   ═══════════════════════════════════════════════════════════════    │
│   Governance · Lineage · Observability  (horizontal, across all)     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

This path is the whole of DataOS. Every feature described in the sections that follow exists to make one of these three stages real: to answer *what do we have and can we build from it* (Discovery), to build a Data Product reliably (Production), or to put that product in front of its consumers (Consumption). Features that fall outside this path are not part of DataOS. The coherence of the platform comes from that constraint: discipline about what belongs, not accumulation of what could.

Horizontal capabilities (governance, lineage, observability) apply uniformly across all three stages, and are covered in §7.

---

## 3. The Engine: Through-line Across All Stages

A Data Product materializes somewhere. That somewhere is the engine. DataOS does not replace engines; it operates on top of them. Two patterns exist, and both are first-class.

**Pattern A: DataOS Lakehouse.** DataOS provides a first-party Lakehouse built on **Iceberg** as the storage format, with **Spark and Trino** as the execution engines on top. The underlying object store can be **S3**, **ADLS**, or **GCS** depending on the cloud. Teams that choose this pattern get a Lakehouse DataOS governs natively: storage, compute, and governance in one coherent stack.

**Pattern B: Bring-your-own-engine.** Many organizations already have data landed in a governed warehouse: Snowflake, BigQuery, Databricks, Postgres, or similar, often populated by existing pipelines like Fivetran, Airbyte, or internal ETL. DataOS builds Data Products directly in that existing engine, without requiring a migration to the DataOS Lakehouse.

```
   Pattern A: DataOS Lakehouse                 Pattern B: Bring-your-own-engine
   (full-stack)                                (overlay)

   ┌──────────────────────────────┐            ┌──────────────────────────────┐
   │   DataOS control plane       │            │   DataOS control plane       │
   └──────────────┬───────────────┘            └──────────────┬───────────────┘
                  ▼                                           ▼
   ┌──────────────────────────────┐            ┌──────────────────────────────┐
   │   DataOS Lakehouse           │            │   Existing engine            │
   │   Iceberg + Spark/Trino      │            │   Snowflake / BigQuery /     │
   │   on S3 / ADLS / GCS         │            │   Databricks / Postgres /... │
   └──────────────────────────────┘            └──────────────────────────────┘
           (storage + compute                         (already operated
            operated by DataOS)                        by the organization)
```

The capabilities described in §4 through §7 work against both patterns. The engine is a deployment choice; the Data Product discipline above it does not change. Pattern selection is covered in §8.

---

## 4. Discovery, Before the Data Product Exists

Discovery is the work a team does before any specific Data Product exists. It answers one question: *"what data do we have, and can we build what we want from it?"* No artifacts are produced at this stage. No contracts are signed. What Discovery produces is a decision: either *yes, we have what we need, let's build* (and proceed to §5), or *we know what's missing and how to get it*, or *we're looking in the wrong place and need to rethink*.

This is why Discovery is not strictly part of a Data Product's lifecycle. A Data Product doesn't exist yet when Discovery is happening; the team is deciding whether one *should*. But it's critical work, and DataOS supports it with three capability clusters.

### 4.1 Understanding what's there: metadata, lineage, profile

The starting point for Discovery is *reading* before *querying*. Before running a single SQL query, a team can use **Metis** to browse what DataOS already knows about the data landscape:

- **Metadata** across connected sources and DataOS-internal resources: schemas, tables, columns, types, descriptions, tags, business terms.
- **Lineage** traced back to source systems, across any pipelines DataOS has observed. A team can see where a candidate dataset originated and what has transformed it.
- **Profile information** produced by earlier scanning: cardinalities, null rates, distributions, sample values. A team learns the shape of the data before touching it.

Metis turns a directionless search ("is there customer revenue data somewhere?") into a directed inspection ("here are three datasets that look relevant, with their profiles and lineage").

### 4.2 Exploring the data: SQL and EDA

Once candidate datasets are identified, the next step is interrogating them. **Workbench** is where this happens: an interactive SQL and exploration environment that connects to whatever the team has access to (raw sources, already-landed data, DataOS-internal datasets). The team writes queries, inspects samples, validates hypotheses, checks edge cases.

This is classic exploratory data analysis, but grounded in the DataOS environment: access is governed, lineage is captured, and queries run against the real substrate rather than a disconnected copy.

### 4.3 Bringing data in (if it isn't there): ingestion

If Discovery concludes that the team needs data not currently in the engine, the third cluster applies: **Nilus** handles ingestion.

- **Batch and CDC ingestion.** Batch for periodic pulls; Change Data Capture for near-real-time replication from transactional sources. One framework covers both.
- **Wide source coverage.** Operational databases (Postgres, MySQL, MongoDB, MS SQL Server, DB2), warehouses (Snowflake, BigQuery, Databricks, Redshift), streaming (Kafka, NATS), SaaS APIs (Salesforce, HubSpot, Stripe, Google Analytics), and custom connectors authorable in Python.
- **Schema absorption at the boundary.** Upstream schema changes are handled at ingestion, not leaked to downstream consumers.
- **Data masking for sensitive fields.** Sensitive values are transformed at ingestion, before they ever reach the governed destination.
- **Metadata scanning and profiling.** Newly ingested data is scanned, profiled, and catalogued, which feeds straight back into Metis and strengthens the next round of Discovery.

Ingestion is the *remedial* part of Discovery: something the team does when they've determined that what they need isn't already in the engine. Often ingestion is *not* needed, because the data is already there (populated by an existing pipeline, or already in the DataOS Lakehouse from a previous project).

### The shape of Discovery

```
                    Question: what do we have,
                and can we build what we want from it?

   ┌───────────────────────┬───────────────────────┬───────────────────────┐
   │                       │                       │                       │
   ▼                       ▼                       ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│     METIS        │  │    WORKBENCH     │  │      NILUS       │
│                  │  │                  │  │                  │
│  metadata        │  │  interactive SQL │  │  ingestion if    │
│  lineage         │  │  exploration     │  │  data is missing │
│  profile         │  │  EDA             │  │  batch + CDC     │
│                  │  │                  │  │  masking + scan  │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               ▼
                  ┌──────────────────────────┐
                  │       DECISION           │
                  │                          │
                  │  Yes:  build it  (§5)    │
                  │  No:   rethink           │
                  │  Not yet:  ingest first  │
                  └──────────────────────────┘
                               │
                               ▼
                        (on to §5)
```

The three clusters are not a linear sequence. A team might start in Metis, dip into Workbench to verify, realize data is missing, trigger Nilus, wait for data to land, re-scan through Metis, explore again in Workbench, and only then decide. Discovery is iterative, and DataOS is shaped to support that iteration rather than enforce a workflow.

### What Discovery is not

Discovery is not Production. Nothing built in Discovery is a Data Product. Queries written in Workbench are not published artifacts. Data landed by Nilus becomes a raw input to Production, not a Data Product in its own right. The moment the team decides *"yes, let's build,"* they leave Discovery and begin §5 with that decision as input.

---

## 5. Production, Building the Data Product

Production is where Data Products are built. The engine hosts the data and runs the compute; the build stack above the engine is **Vulcan**. Vulcan turns raw landed data into a versioned, validated, contracted Data Product with a thin API layer for consumers.

The capabilities at this stage:

- **Declarative transformations in SQL or Python.** SQL for the bulk of transformations; Python for logic that is painful in SQL (API calls, ML scoring, complex business rules). Both coexist in one project.
- **In-band validation.** Transformations pass through a validation gauntlet before publication: a linter catches syntax errors, tests confirm expected outputs, signals verify dependencies are met, assertions and quality checks block bad data from being published. The manifesto's principle *quality is in-band, not after-the-fact* is enforced here by construction.
- **Semantic layer.** Business metrics and dimensions declared once, consumed everywhere. The semantic definition is what consumers bind to, not raw tables. Train/serve skew is eliminated because offline analysis, online features, and AI agents all resolve through the same semantic definitions.
- **Materialization into the engine.** The Data Product is materialized as an artifact in the chosen engine: an Iceberg table in the Lakehouse, or a table in Snowflake, BigQuery, Databricks, whichever applies. This is the versioned, owned artifact the manifesto requires.
- **Thin API layer for accelerated access.** Vulcan auto-generates REST and GraphQL interfaces from the semantic layer. Consumers read the API rather than running raw SQL, and the API accelerates access patterns (caching, pushdown, semantic resolution) that would be slow or error-prone as ad-hoc queries.
- **CI/CD with plan-style previews.** Changes are planned, diffed against the current state, reviewed, approved, and rolled back if needed. Breaking changes follow the API-style versioning discipline the manifesto requires.
- **Policy and governance at product level.** Classification, access control, and retention are properties of the product, enforced in one place. See §7.
- **Observability as first-class output.** Freshness, quality signals, run history, and lineage are emitted as machine-readable signals, not dashboard-only artifacts.

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │                           VULCAN                                    │
 │            (declarative build stack above the engine)               │
 │                                                                     │
 │    SQL / Python models                                              │
 │          │                                                          │
 │          ▼                                                          │
 │    ┌─────────────────────────────────────────────────────────┐      │
 │    │  Linter ─► Tests ─► Signals ─► Assertions ─► Checks     │      │
 │    │              (in-band validation gauntlet)              │      │
 │    └─────────────────────────────────────────────────────────┘      │
 │          │                                                          │
 │          ▼                                                          │
 │    Semantic Layer  (metrics, dimensions, relationships)             │
 │          │                                                          │
 │          ├──────►  Materialized artifact in the ENGINE              │
 │          └──────►  Auto-generated REST / GraphQL API                │
 │                                                                     │
 └─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                  ┌──────────────────────┐
                  │      ENGINE          │
                  │  compute  +  storage │
                  └──────────────────────┘
```

### 5.1 AI-assisted Data Product construction

A distinctive capability of Vulcan at this stage: an AI agent can participate in building a Data Product, not just consuming one. Through an MCP interface, Vulcan exposes a set of build-time tools the agent can invoke:

- **Concept explanation and syntax templates** so an agent can scaffold correct Vulcan components without guessing.
- **Code review for SQL and YAML** so the agent can validate a human's draft before it enters the validation gauntlet.
- **Retrieval of real working examples** from curated Vulcan projects so the agent grounds its suggestions in patterns that work.
- **Design advisement** so an agent can turn a use case ("I need a customer churn metric for quarterly reporting") into a structured Data Product design specification.
- **Scaffold generation** producing a file manifest covering seed, staging, final, semantics, checks, and tests, wired together correctly.
- **Metadata enrichment** adding column descriptions, tags, business terms, and check stubs to an existing project.
- **Quality rule suggestion** producing a checks YAML, SLO definitions, audit suggestions, and a coverage gap analysis.

```
   ┌─────────────────────────────────────────────────────────────┐
   │                    AI AGENT                                 │
   │          (Claude, GPT, internal model, ...)                 │
   └───────────────────────────┬─────────────────────────────────┘
                               │  MCP
                               ▼
   ┌─────────────────────────────────────────────────────────────┐
   │          VULCAN BUILD-TIME TOOLS  (design surface)          │
   │                                                             │
   │   ┌───────────────────┐   ┌───────────────────────────┐     │
   │   │ Design advisement │   │  Syntax + scaffolding     │     │
   │   │ (use case → spec) │   │  (file manifest, wiring)  │     │
   │   └───────────────────┘   └───────────────────────────┘     │
   │                                                             │
   │   ┌───────────────────┐   ┌───────────────────────────┐     │
   │   │ Code review       │   │  Example retrieval        │     │
   │   │ (SQL / YAML)      │   │  (curated patterns)       │     │
   │   └───────────────────┘   └───────────────────────────┘     │
   │                                                             │
   │   ┌───────────────────┐   ┌───────────────────────────┐     │
   │   │ Metadata enrich   │   │  Quality rules + SLOs     │     │
   │   │ (tags, terms)     │   │  (checks YAML, gaps)      │     │
   │   └───────────────────┘   └───────────────────────────┘     │
   │                                                             │
   └─────────────────────────────────────────────────────────────┘
```

This is distinct from the runtime agent tools in §6. These tools *help build* a Data Product; those tools *help use* one. Both matter, and most platforms only offer the second.

---

## 6. Consumption, Accessing the Data Product

Once a Data Product is built, it is accessed. DataOS exposes a Data Product through several parallel surfaces, each matched to a type of consumer. The contract behind each surface is the same (one product, one engine, one set of guarantees, per the manifesto's principle); the protocol adapts to the consumer.

The surfaces:

- **Thin REST and GraphQL APIs** auto-generated from the semantic layer. Applications, services, and modern frontends call these directly.
- **Database wire protocols (Postgres, MySQL)** so BI tools and SQL clients connect as if the Data Product were a regular database. Tableau, Power BI, Superset, and Excel all reach Data Products this way.
- **SDKs and notebook access** for analysts and ML practitioners. Python SDKs expose Data Products to Jupyter, training pipelines, and custom applications.
- **MCP runtime tools for AI agents.** A set of structured tools through which an agent can query semantics, inspect schema, check quality and freshness, view run history, and read product metadata. This is the agent-equivalent of what BI does for humans, except machine-readable and semantically grounded.
- **Data Product Hub for discovery and activation.** A catalog surface where humans find Data Products, understand their contracts, and activate them against the BI or ML tool of their choice.

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │                        CONSUMERS                                    │
 │                                                                     │
 │  Apps · BI tools · Notebooks · ML pipelines · AI agents · Hub       │
 │                                                                     │
 └─────────────────────────────────────────────────────────────────────┘
                                  │
    ┌───────────────┬──────────┬──┴──┬─────────┬─────────────────┐
    ▼               ▼          ▼     ▼         ▼                 ▼
 ┌──────┐      ┌─────────┐  ┌─────────┐  ┌─────────┐     ┌──────────────┐
 │ REST │      │ GraphQL │  │ PG/MySQL│  │ Python  │     │ MCP tools    │
 │ API  │      │  API    │  │  wire   │  │  SDK    │     │ (meta,       │
 │      │      │         │  │         │  │         │     │  discovery,  │
 │      │      │         │  │         │  │         │     │  lineage,    │
 │      │      │         │  │         │  │         │     │  quality,    │
 │      │      │         │  │         │  │         │     │  semantic    │
 │      │      │         │  │         │  │         │     │  query)      │
 └──┬───┘      └────┬────┘  └────┬────┘  └────┬────┘     └──────┬───────┘
    │               │            │            │                 │
    └───────────────┴────────────┴────────────┴─────────────────┘
                                  │
                                  ▼
                   ┌──────────────────────────┐
                   │  DATA PRODUCT  (one      │
                   │  contract, one engine,   │
                   │  many surfaces)          │
                   └──────────────────────────┘
                                  │
                                  ▼
                   ┌──────────────────────────┐
                   │         ENGINE           │
                   └──────────────────────────┘
```

The MCP tools are abstracted above as "metadata, discovery, lineage, quality, semantic query" because that captures what they let an agent do. The individual tool names evolve; the capability they collectively provide is what matters for this document: an AI agent can *safely* use a Data Product with the same contractual guarantees a human gets, because it resolves the product through the semantic layer rather than scraping raw storage.

---

## 7. Governance, Lineage, Observability Across All Stages

The three stages describe how a Data Product comes into existence and how it is consumed. Three horizontal capabilities wrap around all three, and apply uniformly regardless of which stage is active.

**Governance.** Classification (PII, sensitive, restricted) is applied to data as it is discovered and ingested, propagates through Production, and enforces at Consumption. Access control, row-level and column-level policies, and retention are properties of the product, declared once and enforced across every surface in §6. The Data Product Team operates the product; Governance defines the policies the product operates within. See the manifesto's §8 for the role split.

**Lineage.** Column-level lineage traces from source systems, through Nilus ingestion, through Vulcan transformations, into the materialized artifact, and onward to every consumption surface. This is lineage by construction, not lineage reconstructed from logs after the fact. Auditors, agents, and compliance reviewers all consume the same lineage graph.

**Observability.** Freshness, completeness, quality, run history, and cost are emitted as first-class signals from every stage. Pipelines, dashboards, pagers, and AI agents all gate on the same signals. A Data Product that is stale, failed, or degraded announces itself rather than being discovered by a consumer.

```
   ┌───────────────────────────────────────────────────────────────┐
   │                    HORIZONTAL CAPABILITIES                    │
   │                                                               │
   │  Governance  │  Classification, access policy, retention      │
   │  Lineage     │  Column-level, source to consumer              │
   │  Observabi.  │  Freshness, quality, runs, cost                │
   │                                                               │
   └───────────────────────────────────────────────────────────────┘
              ▲                   ▲                   ▲
              │                   │                   │
              │ applied at        │ applied at        │ applied at
              │                   │                   │
   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
   │    Discovery    │  │   Production    │  │  Consumption    │
   │                 │  │                 │  │                 │
   │ scan, classify  │  │ transform under │  │ enforce policy  │
   │ raw sources     │  │ classification  │  │ at every access │
   └─────────────────┘  └─────────────────┘  └─────────────────┘
```

Without these horizontals, DataOS would be a collection of stage-specific capabilities. With them, it is a single coherent platform: what's classified in Discovery is still classified in Consumption, what's owned in Production is owned end-to-end, and what's observed anywhere can be observed everywhere.

---

## 8. Full-stack and Overlay Patterns

Two realistic adoption shapes, both first-class.

### Full-stack

The organization adopts DataOS end-to-end. The DataOS Lakehouse is the engine. Discovery uses Metis, Workbench, and Nilus together (Nilus bringing data into the Lakehouse). Vulcan builds Data Products. Consumption goes through the DataOS surfaces. Governance, lineage, and observability are DataOS-native across the board.

This pattern fits when:
- The organization is building its data platform fresh, or undertaking a deliberate replatform.
- There is no pre-existing warehouse investment the team is committed to preserving.
- The team values a coherent single-vendor stack with minimal integration surface.

### Overlay

The organization already has a governed engine (most often Snowflake, BigQuery, or Databricks) populated by existing pipelines (Fivetran, Airbyte, internal ETL). DataOS is adopted as an overlay: the existing engine stays, data is already landed, Discovery focuses on Metis and Workbench against what's already there (Nilus is typically not needed), Vulcan builds Data Products inside the existing engine, and consumers access through the DataOS surfaces.

This pattern fits when:
- The organization has a significant investment in an existing warehouse and its pipelines.
- The pain point is not ingestion or storage, but the discipline and consumability *above* the engine.
- The team wants Data Product discipline without a migration.

```
     FULL-STACK                              OVERLAY
     (new / replatform)                      (existing engine)

  ┌──────────────────────────┐            ┌──────────────────────────┐
  │  DataOS control plane    │            │  DataOS control plane    │
  ├──────────────────────────┤            ├──────────────────────────┤
  │  ┌────────────────────┐  │            │  ┌────────────────────┐  │
  │  │  Discovery         │  │            │  │  Discovery         │  │
  │  │  Metis + Workbench │  │            │  │  Metis + Workbench │  │
  │  │  + Nilus (ingest)  │  │            │  │  (no ingestion)    │  │
  │  └──────────┬─────────┘  │            │  └──────────┬─────────┘  │
  │             ▼            │            │             ▼            │
  │  ┌────────────────────┐  │            │  ┌────────────────────┐  │
  │  │  Vulcan build      │  │            │  │  Vulcan build      │  │
  │  └──────────┬─────────┘  │            │  └──────────┬─────────┘  │
  │             ▼            │            │             ▼            │
  │  ┌────────────────────┐  │            │  ┌────────────────────┐  │
  │  │  DataOS Lakehouse  │  │            │  │  Existing engine   │  │
  │  │  (Iceberg + S/T)   │  │            │  │  Snowflake / BQ /  │  │
  │  │                    │  │            │  │  Databricks / ...  │  │
  │  └──────────┬─────────┘  │            │  └──────────┬─────────┘  │
  │             │            │            │             ▲            │
  │             ▼            │            │             │            │
  │  ┌────────────────────┐  │            │  ┌──────────┴─────────┐  │
  │  │  Consumption       │  │            │  │  Existing pipeline │  │
  │  │  surfaces          │  │            │  │  Fivetran /        │  │
  │  └────────────────────┘  │            │  │  Airbyte / ETL     │  │
  │                          │            │  └────────────────────┘  │
  │                          │            │                          │
  │                          │            │  ┌────────────────────┐  │
  │                          │            │  │  Consumption       │  │
  │                          │            │  │  surfaces          │  │
  │                          │            │  └────────────────────┘  │
  └──────────────────────────┘            └──────────────────────────┘
```

The two patterns are not a hierarchy. An organization can start with overlay for one set of products and full-stack for another, or migrate from overlay to full-stack over time, or stay in overlay permanently. What matters for the Data Products discipline is not which pattern is in use, but that the manifesto's principles are upheld on whichever pattern is chosen: one owned artifact per product, one engine per product, one contract per product, a named owner, published quality, and versioning that respects consumers.

The engine is the choice. The discipline does not change.