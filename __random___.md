# **How DataOS Makes Data AI-Ready**

DataOS turns raw enterprise data into AI-ready assets through a unified lifecycle:  
**Explore → Ingest → Productize → Activate.**


- **Explore:** Discover and profile data sources with automatic metadata and lineage capture.  
- **Ingest:** Bring in data from on-prem, cloud, or SaaS systems via declarative ingestion specs.  
- **Productize:** Curate datasets into governed, versioned **Data Products (DPs)** that package data, metadata, policies, and lineage.  
- **Activate:** Each DP exposes a **semantic layer** that connects to BI, AI, or downstream APIs. Users can create *APIs*, *perspectives*, and *features* directly — making the data actionable by design.  

### **Native Orchestration**

DataOS includes its own **runtime orchestration layer** built on three declarative primitives — **Service**, **Worker**, and **Workflow** — defined in YAML and triggered by time or events.  

It automatically tracks **schema drift**, **data-quality SLAs**, and **lineage health**, eliminating the need for Airflow while remaining compatible with it.  

External schedulers (Airflow, Prefect, Dagster) can trigger DataOS primitives, but once DPs are adopted, **no external orchestration system is required**.

### **AI-Readiness Differentiators**

Every DP carries built-in semantics, improving **Gen-AI accuracy and explainability**.  
DataOS also provides **vector stores**, a **lakehouse runtime**, and **LLM gateways** for RAG, knowledge agents, and agentic automation.  The platform focuses on **semantic and generative AI enablement** rather than classical ML training.

**Airflow vs DataOS at a glance:**

| **Aspect** | **Airflow** | **DataOS** |
|:--|:--|:--|
| **Paradigm** | Python DAGs | Declarative YAML (Service / Worker / Workflow) |
| **Trigger Model** | Time-based | Time + Event-based (semantic triggers) |
| **Context Awareness** | Task-level only | Data-product-aware (schema, quality, lineage) |
| **Governance Integration** | External | Native per Data Product |
| **AI Readiness** | None | Built-in semantics, vector stores, LLM gateways |


# **Integration & Scale**

### **Brownfield Integration**

DataOS connects directly to on-prem and legacy systems (Oracle, SAP, Hadoop, etc.) and can be extended with **custom connectors** for proprietary environments.  

It supports both **federated query-in-place** and **colocated ingestion** models.  

For productization, we recommend colocating all relevant data for a DP within one domain — the DataOS Lakehouse, Snowflake, Databricks, or BigQuery — ensuring consistent governance and performance.  

This flexibility enables hybrid modernization **without rip-and-replace**.

### **Enterprise Scale**

- Proven at **multi-petabyte scale** with **thousands of concurrent queries**.  
- Employs **compute–storage separation**, **query pushdown**, **caching**, **cost observability**, and **adaptive scaling**.  
- Built on **Apache Iceberg**, providing open formats, schema evolution, and ACID guarantees.

# **Governance, Metrics & Semantics**

### **Identity & Authorization**

Customers bring their own IDPs (AD, Azure AD, OIDC, etc.) — DataOS authenticates natively and applies **ABAC-based authorization** built on OAuth.  

It supports **fine-grained permissions** (down to column, metric, or perspective) using a **Policy Decision Point (PDP)** and **Policy Enforcement Point (PEP)** architecture.  

All policy events are captured in **audit logs** for full traceability.

### **Semantic Layer & Metrics**

Every Data Product exposes a **semantic layer** that defines **business metrics as code**.  Metrics are **versioned**, monitored for **changes and anomalies**, and synced to BI tools through the **BI-Sync system** — ensuring every report or model references **consistent, governed definitions** across the enterprise.  

This provides a single source of semantic truth spanning **data, analytics, and AI**.
