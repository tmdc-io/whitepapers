# DataOS 2.0 for Lenovo
Date: Feb 21, 2026

## The Starting Point

DataOS 1.0 proved a thesis: organizing data work around data products, with ownership, quality, governance, and consumption interfaces, is the right abstraction for modern data teams. Your deployment validated that thesis at scale.

Industry direction and evolving enterprise needs pointed toward a clear next phase: robust observability, true multi-tenancy, streamlined onboarding, real-time reliability, and interactive analysis at scale. These priorities—shaped by where the market is heading and what modern data teams will require—defined the roadmap for DataOS 2.0.

2.0 is not a cosmetic refresh. It is an architectural evolution that aligns the platform with where the industry is going and what enterprises need going forward. The vision has not changed. The execution layer has evolved to match it.

---

## Co-existence: Working With Your Investments, Not Against Them

DataOS 1.0 was architected with Minerva (Trino) and Flare (Spark) as the primary compute engines. This provided a unified query experience but created a constraint: all computation ran on DataOS-managed infrastructure, which meant a new budget line item and no leverage of existing warehouse investments.

### What 2.0 changes

**Compute federation** is the foundational shift. Transformations can now execute on **Snowflake**, **Databricks**, **BigQuery**, **Redshift**, **MS Fabric**, **MS SQL**, **Postgres**, **Clickhouse**, or **DataOS Managed Spark**, whichever engine your team already uses and your finance team has already approved. DataOS handles orchestration, governance, and data product management. Your existing compute handles execution. *Engine support is phased by tranche; see Release Tranches table.*

This directly changes how interactive analysis works for your data scientists and analysts. Instead of routing all queries through a single engine, 2.0 lets you execute against the compute engine best suited for the workload. The Workbench in 2.0 supports multi-tab editing, composable query blocks, cross-query result references, and removes the 50,000 row limit that constrained exploration in 1.0. Your source warehouse engine is available directly for exploration within DataOS.

**Flash 2.0**, our evolved query acceleration engine, runs on DataOS Lakehouses and eliminates the need for Trino on Lakehouse. It handles the other end of the spectrum: low-latency queries at high concurrency for dashboards, parameterized queries during EDA, and AI/agent workloads requiring thousands of concurrent requests. *Lands in Tranche 2.*

**Cola**, the new metadata intelligence engine, provides automated discovery, profiling, and classification across connected cloud warehouses, databases, and BI tools. Cataloging that took weeks of manual effort in 1.0 now completes in hours. Column-level lineage extends across platform boundaries, so you can trace data from external warehouse sources through transformations to data products and consumers. *Support is phased by source type; see Release Tranches table.*

**External engines can query into DataOS Lakehouse.** Snowflake, Databricks, and BigQuery can access the DataOS Lakehouse via Iceberg, with governance enforced at the storage layer. Data no longer needs to be copied out, which eliminates duplication. *Lands in Tranche 3.*

### What this means for Lenovo

Your teams running EDA, building real-time dashboards, and executing ad-hoc queries get the performance of their preferred engine with the governance and discovery of DataOS. Compute costs map to existing budgets. Procurement friction drops. And the platform works alongside what you already have rather than asking you to consolidate onto a single engine.

---

## The Data Product Stack: From Transformation to Activation

In 1.0, building a data product meant stitching together multiple engines (Flare, PyFlare, SQL, Lens), a separate quality framework (Soda), YAML-based CLI configuration, and API layer (Talos). Each component worked, but the experience was fragmented. Onboarding was steep. Patterns were inconsistent across teams.

### What 2.0 changes

**Vulcan** is the unified transformation engine. Write in **SQL** for declarative transformations or **Python** for custom logic, ML integration, and complex workflows. Run on **Snowflake**, **Databricks**, **BigQuery**, **Redshift**, **MS Fabric**, **MS SQL**, **Postgres**, **Clickhouse**, or **DataOS Managed Spark**—whichever engine your team uses. *Engine support is phased by tranche.*

This is where your requirement for complex transformations, custom logic, and ML integration lands. Python models in Vulcan can incorporate ML logic, external API calls, and custom transformation patterns, covering the cases where PySpark was previously the only option. Vulcan runs on Spark when that is the optimal execution path, but abstracts away the cluster management and engine-specific configuration. For workloads that need your existing Databricks Spark clusters, compute federation pushes execution there directly.

**Quality is shift-left.** Pre-execution validation with blocking quality gates catches issues in CI, not in production. Assertions validate model logic before deployment. Integrated unit testing with coverage reporting brings software engineering rigor to data work. Bad data no longer reaches consumers before problems are detected.

**Think in models, not pipelines.** You define transformations as declarative models with dependencies. Vulcan resolves execution order, parallelism, and orchestration automatically—you focus on what the data should become, not how to wire the steps.

**Version control is native.** Full Git history for transformation code. One-click rollback. Column-level lineage with downstream impact simulation, so you can preview which assets will be affected before deploying a change. Vulcan resolves execution order automatically from declared dependencies, manages parallelism based on the dependency graph, and handles cross-data-product references.

**Perspectives** are first-class Data APIs with SLAs, freshness guarantees, and access policies. REST, GraphQL, and SQL from a single definition. Client SDK generation for Python, JavaScript, and Java. Governance inherited from the underlying data product. Multiple consumers (including applications like LITA) can integrate with multiple data products through a single, governed interface.

**The MCP Server** exposes data products via the Model Context Protocol, the emerging standard for AI assistant integration. Build (Copilot-based) is available in Tranche 1; discover and explore from within AI coding tools (Cursor, GitHub Copilot, and others) land in Tranche 2. Context assembly APIs package data subsets for LLM prompt construction. Natural language query interfaces over data products are being built as a subsequent capability within the 2.0 release cycle, extending the MCP foundation so developers can interact with DataOS through conversational patterns in their preferred development environment.

**Data Product Recipes** encode engineering standards into reusable templates. New team members follow established patterns. Consistency across teams is built into the workflow, not enforced through code review. *Lands in Tranche 3.*

**Incremental processing** means transformations process only changed data. For large workloads, this translates to 60-80% cost reduction compared to full refreshes.

**Data App Runtime** allows deployment of Streamlit, Vizro, Python, and Node.js applications with platform authentication. For ML inference pipelines, this provides a managed environment for inference endpoints that participate in the DataOS governance model.

### What this means for Lenovo

Your data engineers get a linear path from transformation to activation. Your large-scale dataset orchestration gets declarative dependency management with automatic parallelism. Your ML teams get Python-native transformation and managed deployment for inference. Your application consumers get governed APIs with SLAs. And the entire workflow, from writing a transformation to exposing it as an API, lives in one platform with one set of patterns.

For feature engineering specifically: features defined as data products in Vulcan inherit versioning, lineage, quality gates, and governance. Nilus streaming pipelines can feed external feature stores like SageMaker in near real-time. Perspectives provide the governed API layer that external ML infrastructure can consume. DataOS handles feature computation and governance; your existing feature store handles serving. As streaming SQL capabilities mature in Vulcan, feature computation on streaming data becomes part of the standard transformation workflow.

---

## Enterprise-Grade DataOps: The Operational Foundation

1.0 used workspace-level isolation and component-specific observability. This was appropriate for initial deployments but created constraints at scale: no true multi-tenancy, fragmented monitoring across Monitor/Pager/Metis, no cost attribution by data product, and basic pipeline alerting that led to alert fatigue without auto-remediation.

### What 2.0 changes

**Multi-tenant isolation** is architectural, not logical. Data, compute, and workloads are isolated at tenant boundaries. Blast radius is contained. Security incidents in one tenant cannot affect others. Strict resource boundaries with cross-tenant policies where needed. Tenant-specific SLAs enable performance guarantees per business unit; full cost attribution and chargeback land with FinOps (Tranche 3).

The 2.0 governance model introduces a unified policy engine with simplified RBAC mapped to enterprise personas. The architecture supports serving distinct user populations with separate identity providers from a single platform deployment, directly supporting your goal of instance consolidation across environments.

**Unified observability** replaces the fragmented toolset. A centralized metrics store collects telemetry across all workloads. Workload log search with structured filtering. Pre-built dashboards for common operational patterns. SLA tracking for data freshness and pipeline completion. *Lands in Tranche 2.*

**FinOps** provides cost attribution by data product, tenant, and workload. Track spend against existing warehouse budgets (via compute federation) or DataOS-managed compute. CPU, memory, and disk usage at the resource and component level. Autoscaling events tracked and visible. Chargeback models at the business unit level. *Lands in Tranche 3.*

**Nilus** in 2.0 has evolved for enterprise-grade streaming reliability. Automatic schema drift detection with configurable handling policies. Self-healing pipelines with retry logic, failure recovery, and automatic offset management. Full pipeline lineage including source, schema evolution, and operational events. Built-in CDC connectors for your MongoDB and Postgres requirements with automatic change detection.

**Lakehouse improvements** include row and column-level access policies enforced at the storage layer (not just query layer), automated compaction, partitioning, and optimization without manual table maintenance, and Flash 2.0 for AI-optimized high-concurrency queries.

### What this means for Lenovo

You can consolidate DataOS instances through true multi-tenancy. Your streaming pipelines get self-healing reliability with auto-recovery. As capabilities land by tranche, your operations team gets a single pane of glass for observability, and your finance team gets cost attribution that maps to business units. Your security team gets architectural isolation, not just RBAC on shared infrastructure.

---

## Ontology: From Data Catalog to Organizational Knowledge

1.0 focused on data infrastructure: moving, transforming, and serving data. Business context was handled through Lens and the Data Product Hub, but classification was manual, metric definitions lacked ownership or certification, and discovery was one-size-fits-all.

### What 2.0 changes

**Cola** provides intelligent classification with confidence scoring. ML-based NER, regex patterns, and custom classifiers automatically identify PII, financial data, and sensitive fields. Confidence scores prioritize review effort. Classifications propagate through lineage, so downstream assets inherit context and governance travels with data through transformations. Compliance assessment moves from weeks to hours.

**Semantic definitions are merged with transformation in Vulcan.** No drift between the semantic model and reality. Entity relationship mapping across data products enables cross-product joins and understanding of how products relate to each other. *Lands in Tranche 2.*

**Discovery in 2.0.** The Data Product Hub shows all data products with metadata, descriptions, quality scores, lineage, and glossary terms regardless of access level. Users can understand what a data product contains, assess fitness for their use case, and initiate access requests from the discovery interface. Personalized discovery, semantic search, and role-aware ranking are part of the future roadmap.

**Business metrics** get a centralized catalog with ownership, dependencies, and calculation lineage. Certified metrics with approval workflows replace ungoverned metric sprawl. Every consumer, whether BI tool, API, or direct query, uses the same calculation. *Lands in Tranche 3.*

**For AI consumption:** Data products carry semantic definitions, business glossary terms, column-level descriptions, and quality scores. Schema and metadata descriptions are optimized for LLM comprehension. The MCP Server exposes data products in a format purpose-built for AI assistants and agents. Your catalog becomes consumable by AI systems, not just searchable by humans.

### What this means for Lenovo

Your data users, from new team members to cross-functional teams, can discover what data exists and request access through a single interface. AI-powered classification handles what manual tagging could not scale to. Your metrics mean the same thing everywhere. And your data estate becomes machine-readable for AI-driven workflows.

---

## Developer and User Experience: Reducing Friction Everywhere

1.0 required CLI for most operations. The interface was the same for all users. Onboarding was steep, especially for non-technical team members.

### What 2.0 changes

**Copilot-based Data Product building.** Build data products with AI assistance through Cursor, GitHub Copilot, and other MCP-enabled tools. Local compile and run for rapid iteration. Integrated unit tests validate transformation logic before deployment. The development workflow stays in your IDE with full governance and lineage when you deploy to DataOS.

**Self-service operations.** Tenant administrators manage users and compute resources without platform team involvement. API token management, access requests, and data product discovery are self-service.

**MCP for Exploration and Discovery.** The MCP Server exposes data products for discovery and exploration from within AI coding tools. Developers can find, inspect, and query data products directly from Cursor, Copilot, and other MCP-enabled IDEs without leaving their workflow. *Lands in Tranche 2.*

**Documentation designed for LLMs.** The 2.0 documentation and API surface are structured for both human and machine consumption, supporting integration with AI coding assistants like Cursor and Copilot through MCP.

### What this means for Lenovo

Your data engineers build data products in their preferred IDE with AI assistance. Local compile and unit tests catch issues before deployment. Full governance and lineage apply when you deploy to DataOS.

---

## The Bigger Picture

Every requirement you raised points to a common theme: a data platform that operates at enterprise scale without enterprise friction.

DataOS 2.0 takes the data product paradigm that 1.0 validated and evolves the execution layer to meet the operational, governance, and integration standards that Lenovo requires. The changes are architectural, not cosmetic.

Co-existence means DataOS works with your existing investments. Enterprise DataOps means true multi-tenancy, unified observability, and cost attribution—delivered across tranches. The Data Product Stack means a linear path from understanding data to activating it. Ontology means your organizational knowledge becomes a managed, governed, AI-consumable layer.

This is not a version increment. It is the platform catching up to the ambition.

---

## Release Tranches: When Capabilities Land

The following table maps high-level DataOS 2.0 features to release tranches so Lenovo can plan adoption and migration.

| Feature Area | Breakdown | Tranche 1 | Tranche 2 | Tranche 3 |
|--------------|-----------|-----------|-----------|-----------|
| **Compute Federation** | By engine (phased) | Snowflake, Databricks, Postgres, Spark | BigQuery, Redshift, MS Fabric, MS SQL, Clickhouse | External engines query into DataOS Lakehouse (Iceberg) |
| **Unified Transformation (Vulcan)** | SQL + Python, declarative models | Vulcan SQL & Python, quality gates, version control, Perspectives | Streaming SQL in Vulcan | — |
| **Query Acceleration (Flash 2.0)** | Low-latency on Lakehouse | — | Flash 2.0 (Beta) | — |
| **Metadata Intelligence (Cola)** | By source type (aligned with compute federation; Postgres in T1) | Warehouses, Postgres | Databases | BI Tools |
| **Data APIs (Perspectives)** | REST, GraphQL, SQL | Perspectives, client SDKs | — | — |
| **AI Integration (MCP)** | Build, Explore, Discover | Build (Copilot-based) | Discover, Explore (MCP Server, query from IDE) | — |
| **Enterprise DataOps** | Tenancy, Observability, FinOps | Multi-tenancy, Nilus streaming | Unified observability | FinOps |
| **Ontology & Discovery** | Semantic definitions, Glossary, Classifications | Cola classifications, column-level lineage | Semantic definitions in Vulcan, business glossary | Business metrics catalog, certified metrics |
| **Copilot-Based Development** | IDE + AI, local compile, unit tests | Copilot-based building | MCP for discovery | Data Product Recipes |

*Tranche definitions (e.g., quarters, release names) can be aligned with Lenovo’s planning cycle.*

---

## Appendix: Requirements Traceability

| # | Lenovo Requirement | Addressed In | Key Capabilities |
| --- | --- | --- | --- |
| 1 | Interactive analysis on large datasets | Co-existence; Data Product Stack | Compute federation, Flash 2.0, Workbench redesign, row limit removed |
| 2 | Custom Spark jobs | Data Product Stack; Co-existence | Vulcan (SQL + Python), compute federation to Databricks/Spark, Data App Runtime |
| 3 | Observability and monitoring (SLA/SLI/SLO) | Enterprise DataOps | Unified telemetry, SLA tracking, assisted remediation, pre-built dashboards (T2) |
| 4 | Data quality monitoring | Enterprise DataOps; Data Product Stack | Shift-left quality gates, assertions, pre-execution validation |
| 4 | Core component alerting | Enterprise DataOps | Unified observability covering infrastructure and workloads (T2) |
| 4 | Real-time data processing | Enterprise DataOps; Data Product Stack | Nilus self-healing pipelines, CDC, auto-recovery, schema drift detection |
| 4 | Multi-tenancy | Enterprise DataOps | Tenant-level isolation, unified policy engine, multi-IDP support |
| 5 | Cost observability | Enterprise DataOps | FinOps with cost attribution by data product, tenant, workload (T3) |
| 6 | Task orchestration and parallel execution | Data Product Stack | Vulcan dependency management, automatic parallelism, Workflow resource |
| 7 | Interactive analysis on streaming data | Data Product Stack | Streaming SQL in Vulcan (progressive), Nilus observability, Workbench |
| 8 | Dependency management and visualization | Data Product Stack | Column-level lineage, impact simulation, Data Product Hub lineage canvas |
| 9 | Feature engineering pipelines | Data Product Stack; Co-existence | Vulcan Python models, Nilus streaming, Perspectives APIs, MCP Server |
| 10 | Simplified onboarding | Developer Experience | Copilot-based Data Product building, LLMs via MCP, self-service |
| 11 | Enhanced tagging and metadata | Ontology | Cola classification, semantic search, MCP |
| 12 | AI coding tool integration | Data Product Stack; Ontology | MCP Server, LLM-optimized metadata, context assembly APIs |
| 13 | Access visibility controls | Ontology; Enterprise DataOps | Data Product Hub redesign |

---