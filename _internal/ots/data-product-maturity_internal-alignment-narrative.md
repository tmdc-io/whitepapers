# Otis Data Product Maturity: Internal Alignment Narrative

> **Purpose.** Align Product Managers and Account Managers on the strategic story we are taking to Otis, before producing customer-facing material.
>
> **Audience.** Internal PMs and AMs working the Otis account.
>
> **Status.** Draft for internal review. Pressure-test, mark up, push back.

---

## Contents

1. [The Setup: what Otis is trying to build](#1-the-setup-what-otis-is-trying-to-build)
2. [The Gap: what Snowflake-native cannot do](#2-the-gap-what-snowflake-native-cannot-do)
3. [The Reframe: control plane vs execution layer](#3-the-reframe-control-plane-vs-execution-layer)
4. [Surface what exists: DataOS Hera](#4-surface-what-exists-dataos-hera)
5. [How DataOS Vulcan works: what it contains and what it does](#5-how-dataos-vulcan-works-what-it-contains-and-what-it-does)
6. [The killer capability: reversibility](#6-the-killer-capability-reversibility)
7. [The maturity trajectory: L3 to L4 to L5](#7-the-maturity-trajectory-l3-to-l4-to-l5)
8. [AI-readiness as inherent property, not retrofit project](#8-ai-readiness-as-inherent-property-not-retrofit-project)
9. [Objections, addressed](#9-objections-addressed)
10. [Recommended pilot path](#10-recommended-pilot-path)
11. [Summary: two architectures, two outcomes](#summary-two-architectures-two-outcomes)

---

## 1. The Setup: what Otis is trying to build

Otis is building data products on Snowflake. They have invested significant time and headcount in this direction, and the guidance they have received from Snowflake's field organization, from the broader Snowflake community, and from large consulting partners has been consistent:

- Use object tags to declare domain and product context
- Use COMMENT to document tables and columns in code
- Use Data Metric Functions for quality checks
- Use Secure Views and Dynamic Tables for derived products
- Use RBAC and masking for governance
- Treat code as the catalog, with no separate metadata and no drift

This is a good pitch. It is mostly correct. But it quietly conflates two questions that have very different answers:

- **Can Snowflake hold the current truth of what a data product looks like?** Yes.
- **Can Snowflake operate the practice that produces, changes, audits, and recovers those data products over time?** No, and Otis is usually months into the implementation before they notice the difference.

The data product maturity framework, with its nine dimensions spanning definition, ownership, discoverability, documentation, quality, SLAs, governance, reusability, and consumption, is the right lens here. It forces the conversation past "can Snowflake store metadata" and into "can Snowflake operate a data product practice at L3."

Otis is targeting L3 ("Defined") as their near-term horizon. That is a reasonable goal. But L3 reached by every stream-aligned team writing its own conventions, its own audit trails, its own quality dashboards, and its own recovery procedures is fragile L3. It looks mature on day one and accumulates entropy by month six.

Our job in this conversation is not to argue that Snowflake is the wrong execution layer. It is the right execution layer. The question we are putting to Otis is narrower and sharper:

> **The hinge question for the entire conversation:**
>
> Who owns the lifecycle of the data products that run on top of Snowflake?

That question, asked plainly, opens the entire conversation we want to have.

---

## 2. The Gap: what Snowflake-native cannot do

Snowflake gives Otis a complete set of primitives for governed data:

- **Object tags** carry domain and product context
- **COMMENT fields** document tables and columns in code
- **Data Metric Functions** check freshness, uniqueness, and null rates on a schedule
- **Structural constraints** (NOT NULL enforced; UNIQUE, PK, FK informational) declare schema intent
- **RBAC** enforces access; **column masking** and **row-level security** handle PII
- **Access History** captures lineage as a byproduct of query execution
- **INFORMATION_SCHEMA** and **ACCOUNT_USAGE** make all of this queryable

That is not a small toolbox. With discipline and CI/CD rigor, an Otis stream-aligned team can use these primitives to reach L3 across most of the nine dimensions without leaving Snowflake. We should say this openly. Otis's existing investment is not wasted; it is necessary.

The gap is what these primitives do not give Otis, and it is concentrated in one place: **the lifecycle of a data product.**

Snowflake tells you what a table looks like right now. It does not, on its own, tell you:

- What changed yesterday, and by whom
- From which Git commit, against which Jira ticket
- With what execution plan, against what input volumes
- Whether a quality outcome was caused by the data, the logic, or both
- How to roll back a logic change and re-derive correct values

Time Travel and Dynamic Tables are the closest Snowflake comes to lifecycle capability, and both fall short in specific ways Otis needs to understand:

- **Time Travel** restores the data state of an object within a retention window. It does not restore the logic that produced that data, and it does not allow you to re-derive corrected values from a previous logic version.
- **Dynamic Tables** refresh declaratively, which is elegant for simple cases. But the refresh is operationally opaque. You cannot inspect a single run's plan, you cannot reliably tie a quality outcome to the specific code version that produced it, and you cannot roll back a bad transformation without manually reconstructing it from Git history.

These are not academic concerns. They are common operational realities. The pattern is familiar:

1. A bug ships on Tuesday
2. Dashboards quietly serve wrong values for a week
3. The team catches it on the following Friday
4. The only path back is manual reconstruction: revert SQL in Git, redeploy, and hope affected downstream tables can be rebuilt from upstream sources that may themselves have moved on

In raw Snowflake, every Otis team builds this recovery procedure themselves. Most build it badly. None build it the same way twice.

This is the gap that points to **the most critical dimension of data product maturity: Lifecycle, Auditability, and Reversibility.** It is the dimension that determines whether the other nine remain stable over time. A data product with declared ownership, good quality scores, and clear documentation is not L3 if a logic change can silently break it and the only recovery path is heroics. The first nine dimensions describe the state of a data product. The tenth describes the integrity of the practice that produces and maintains it.

> **AM framing, say this plainly:**
>
> Otis's existing Snowflake-native plan will likely get them to L3 on dimensions one through nine. It will leave the tenth unbuilt. We are not arguing that Snowflake fails. We are arguing that L3 across nine dimensions plus zero on the tenth is not actually L3. It is L2 with better packaging.

---

## 3. The Reframe: control plane vs execution layer

If the tenth dimension is real, then the original "Snowflake is authoritative, DataOS scans it" architecture is incomplete. Nothing in that picture owns the lifecycle. Code may be the catalog, but code alone does not change itself, audit itself, or roll itself back.

This shift in ownership has a corresponding shift in how a data product is conceived. In the original framing, a data product was effectively a labeled set of warehouse objects, with tables, views, and semantic views grouped under a tag. In the control plane model, a data product is **runtime software**: a versioned, executable artifact that produces and maintains data, with quality, dependencies, ownership, and consumption endpoints all declared as part of its definition. The control plane is the system that runs this software.

The reframe we are putting to Otis is direct, and there are only two layers in the architecture:

- **DataOS Vulcan** is the control plane. It defines, deploys, orchestrates, audits, and surfaces every data product. DataOS Vulcan builds every object and knows every object. The catalog, lineage, quality health, and SLA status are direct outputs of the control plane.
- **Snowflake** is the execution layer. Compute, storage, and governance enforcement live there. Data never leaves Snowflake.

This is a real architectural shift from the original framing, and we should name it openly when we present it. Otis stakeholders who heard the earlier story will notice if we slide past the change. They will respect us more if we say: the earlier architecture was correct as far as it went, and the lifecycle gap is what made us reframe.

### The inversion, visualized

```
┌─────────────────────────────────────────────────────────────────┐
│  BEFORE: original Snowflake-native framing                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│        ❄  SNOWFLAKE  (authoritative)                            │
│              │                                                  │
│              │ scan                                             │
│              ▼                                                  │
│        ⬡  DATAOS  (passive observer)                            │
│                                                                 │
│   Lifecycle owned by: nobody in particular                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  AFTER: control plane reframe                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────────────────────────────────────────┐          │
│   │  ⬡  DATAOS VULCAN                                │          │
│   │                                                  │          │
│   │  Builds · Runs · Surfaces                        │          │
│   │  One system                                      │          │
│   │                                                  │          │
│   │  • Declarative DP definitions                    │          │
│   │  • Orchestration, plans, run audit               │          │
│   │  • Perspectives (query cache)                    │          │
│   │  • GitOps and Jira                               │          │
│   │  • Catalog, lineage, quality, SLA, APIs, MCP     │          │
│   │                                                  │          │
│   │  Vulcan builds it. Vulcan knows about it.        │          │
│   └──────────────────────────────────────────────────┘          │
│                          │                                      │
│                          │ provisions, orchestrates             │
│                          ▼                                      │
│   ┌──────────────────────────────────────────────────┐          │
│   │  ❄  SNOWFLAKE  (execution layer)                 │          │
│   │                                                  │          │
│   │  Tables · Views · Semantic Views                 │          │
│   │  Tags · COMMENTs · DMFs · Policies               │          │
│   │  RBAC · Masking · Access History                 │          │
│   │  Compute · Storage                               │          │
│   └──────────────────────────────────────────────────┘          │
│                                                                 │
│   Consumers reach data products through DataOS Vulcan           │
│   (discovery, governance, APIs, MCP) and query Snowflake        │
│   directly when needed (BI tools, Python, AI agents)            │
│                                                                 │
│   Lifecycle owned by: DataOS Vulcan, end to end                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The shift is the inversion. In the BEFORE picture, Snowflake is on top and DataOS observes from below. In the AFTER picture, DataOS Vulcan is on top as the control plane and Snowflake executes below. Two layers, one inversion.

### The trade-off

We are asking Otis to accept a different shape of dependency than the original pitch implied:

- **What they gain.** An authoritative, declarative, auditable, reversible lifecycle for every data product. The tenth dimension, addressed by design.
- **What they give up.** "Pure" Snowflake-native architecture where every artifact is a directly-authored DDL statement. Some of that authoring now flows through DataOS Vulcan.
- **What stays available as an exit path.** Every object DataOS Vulcan creates in Snowflake remains queryable directly. The data is not stranded. If Otis ever leaves DataOS Vulcan, they lose the lifecycle metadata and orchestration, but the data products themselves continue to function as ordinary Snowflake objects.

A clean division of responsibility, worth stating explicitly. Snowflake owns data access governance: RBAC, masking, row-level security, audit. DataOS Vulcan owns data product accountability: quality, freshness, semantic accuracy, lifecycle. These are complementary, not competing.

> **AM framing, say this in the room:**
>
> We are not asking Otis to abandon Snowflake-native principles. Snowflake remains the execution layer and the system of record for data. We are asking Otis to recognize that "native" has not produced lifecycle management for any customer, and that the practice of building data products needs a control plane regardless of who provides it.

> **Tip.** If asked "could we build this control plane ourselves on top of Snowflake?" the answer is yes, and several large enterprises have tried. The cost is typically a 6 to 10 person platform team for 12 to 18 months, and the result is not portable across customer engagements. The build-versus-buy math is the conversation we want to have.

---

## 4. Surface what exists: DataOS Hera

Otis has years of accumulated work in Snowflake: tables that have been built, schemas that have evolved, data collected from countless upstream sources. This is real value. It is also the raw material from which proper data products should be built, but in its current form, it is a warehouse of capability without a product shape.

DataOS Hera surfaces this accumulated knowledge. It scans the Snowflake estate (and other supported sources) and brings into DataOS:

- What tables and views exist
- What columns, types, and relationships they expose
- What metadata, comments, tags, and constraints are in place
- What lineage and access patterns are observable

This is a knowledge layer, available to anyone building a new product before they start. It is not a claim that the scanned objects are the data products.

With Hera's knowledge in hand, a developer building a new data product knows what raw material exists, what shape it's in, what semantics are already documented. They use that knowledge to build the right product, as software, with the instruction types described in Section 5, in DataOS Vulcan. The existing estate continues to do what it has always done. The new data product is what gets built, and built right.

Worth saying openly: yes, Hera scans Snowflake, and we have argued that scan-and-surface is insufficient. The distinction is what the scanning is for. Cataloging warehouse objects and calling them data products is what we are arguing against. Surfacing the estate as knowledge that grounds a proper product build is what Hera does. The product is what Vulcan builds. Scanning is the input, not the output.

> **AM framing, say this in the room:**
>
> Otis has built a tremendous amount in Snowflake. None of that work is wasted. DataOS Hera surfaces it as the foundation developers need to build the right products. DataOS Vulcan is where those products get shaped: as software, with lifecycle, audit, and reversibility built in. The existing estate stays useful. New products are built right.

---

## 5. How DataOS Vulcan works: what it contains and what it does

Once the control plane is accepted as the architectural shape, the conversation moves to what the control plane actually contains and what it does. AMs should be able to describe both.

### What DataOS Vulcan contains

A DataOS Vulcan data product is a versioned set of declarations. Every product, regardless of complexity, is made up of the same instruction types:

| Instruction type | What it does |
|---|---|
| **DDL / DML** | Creates and populates objects in Snowflake using Snowflake-native SQL. Data stays in Snowflake; Snowflake compute does the work. |
| **Unit tests** | Validates transformation logic against expected outputs before deployment. Tests run in CI, not in production. |
| **Blocking assertions** | Quality gates that halt the pipeline when data fails validation. Bad data never reaches downstream consumers. |
| **Non-blocking checks** | Monitoring checks that surface warnings without stopping execution. Useful for observability without breaking flows. |
| **Semantic models** | Business definitions (metrics, dimensions, relationships) integrated directly into the data product. Not a separate layer that drifts from reality. |
| **Dependency graph** | Explicit upstream and downstream relationships that determine execution order, incremental refresh triggers, and impact analysis. |

These six things, declared together in one place, are what a DataOS Vulcan data product is. The control plane is what runs them.

### What DataOS Vulcan does: five capabilities

#### 5.1 Declarative object management

DataOS Vulcan holds the declarative definition of every data product object (Tables, Views, Semantic Views, Policies) and provisions them into Snowflake.

> **Example.** A data engineer raises a PR in Git that defines a new Customer 360 CADP. The PR is reviewed and merged. DataOS Vulcan generates the corresponding Snowflake DDL, applies it with the correct tags (DOMAIN, PRODUCT, TIER), populates the COMMENT fields, stamps ownership metadata, and immediately publishes it to the DataOS Vulcan catalog, all from a single declared specification.

**Why it matters.** The intent (the declaration) and the reality (the Snowflake object) cannot drift, because the declaration is what produces the reality. Code is the catalog, but now the code lives somewhere that can also manage change.

#### 5.2 Orchestration with plan and run audit

DataOS Vulcan orchestrates pipelines that produce data products. For managed CADPs, this replaces Snowflake Tasks and Dynamic Tables. Every orchestration produces two artifacts: a plan (what would happen) and a run (what did happen).

> **Example.** Run #4571 refreshed `gold.customer_360`. DataOS Vulcan logs: sources read (4 SADPs, 12.3M rows total), tables written, row counts in/out, DQ check results (47 passed, 1 warning), warehouse used, credits consumed, duration (9 min 14 sec), code version (v1.4.2), triggered by (schedule), Git commit hash. All retained, all queryable.

**Why it matters.** This is the telemetry that the entire L4 maturity argument depends on. We will return to it in Section 7.

#### 5.3 Perspectives: query result caching

DataOS Vulcan maintains a caching layer over Snowflake CADPs. During the window between refreshes, repeat queries against a product return from cache rather than executing against Snowflake.

> **Example.** A finance dashboard hits a `revenue_daily` CADP twelve times per hour. The CADP refreshes hourly. Without perspectives, that is twelve full Snowflake warehouse executions per hour. With perspectives, it is one execution per refresh and eleven cache hits, a substantial reduction in Snowflake compute for read-heavy repeat-query workloads.

**Why it matters.** Real Snowflake credits saved on the workloads where perspectives apply. This is a quantifiable line item in the ROI conversation, but only with reference numbers from a comparable customer in hand.

> **Note.** We need concrete savings numbers from at least one reference customer for this to land in pricing conversations.

#### 5.4 GitOps and Jira integration

Every change to a data product flows through Git. Every Git change is linked to a Jira ticket. Every deployment is a traceable event.

> **Example.** Schema change to `customer_360.gold` adds a new column. Engineer creates a Jira ticket, opens a PR referencing the ticket, requests review. PR approval triggers DataOS Vulcan to plan the change. Plan is applied on merge. The full chain (ticket, commit, plan, run) is queryable from a single audit view.

**Why it matters.** Change governance becomes process-driven rather than convention-driven. Compliance and audit conversations stop being "we have a wiki page that says we should" and become "every change since go-live, with full provenance, is queryable."

#### 5.5 Logic rollback and data reinstate

The capability that justifies the architecture. Treated in full in the next section.

---

## 6. The killer capability: reversibility

This is the section that should anchor the customer pitch. It is the one capability raw Snowflake cannot deliver, and it speaks directly to a pain every senior data engineer has lived through.

### The scenario

```
TIMELINE: "Tuesday bug" scenario

DAY 0 (Tuesday morning)
  └─▶ v1.4.2 deployed to gold.customer_value
       SQL change: revenue calculation refactored
       Tests passed. Looked clean.

DAY 1 to 4 (Wed to Sat)
  └─▶ Pipeline runs nightly
       Wrong revenue values written each night
       BI dashboards display inflated numbers
       Nobody catches it; values look "plausible"

DAY 5 (Sunday)
  └─▶ Finance team flags discrepancy vs. operational system
       Investigation begins
       
                  │
                  ▼
       In raw Snowflake                In DataOS Vulcan
       ───────────────                 ──────────────────
       "When did this change?"         Audit log:
       Git log search.                   v1.4.2 deployed Day 0
       QUERY_HISTORY                     by jane@otis
       correlation.                      via PR #2347
       Half a day to                     against Jira OTIS-1188
       trace.                            plan diff: + revenue calc
                                       
                  │                                │
                  ▼                                ▼
       Manual revert SQL in Git.       Rollback to v1.4.1
       Manual redeploy.                executed via single op.
       Manually rebuild gold.          Re-derives gold.customer_value
       customer_value from             from upstream SADPs using
       upstream sources,               v1.4.1 logic, automatically.
       which may have shifted          Replay window respected.
       during the bad window.          Downstream dependents notified.
       
                  │                                │
                  ▼                                ▼
       1 to 3 days of cleanup.         ~90 minutes end to end.
       Patchy audit trail.             Full audit retained:
       Some derived tables             bad version, detection,
       still inconsistent.             rollback, re-derivation.
       Confidence shaken.              Confidence preserved.
```

### Why Time Travel is not the answer to this

Snowflake Time Travel is frequently raised as the rebuttal here. It is worth handling cleanly:

- Time Travel restores **data state** within a retention window
- It does not restore **logic state**
- It does not allow re-derivation of corrected data from prior logic against current upstream
- It does not provide a record of why the data was wrong, who changed the logic, or what version produced which output

DataOS Vulcan's reversibility is logic-aware. It knows the code version that produced every row of every refresh, can re-execute prior logic against current inputs, and preserves the audit of the entire incident.

> **AM framing, the line to deliver:**
>
> In raw Snowflake, recovery from a bad logic change is a project. In DataOS Vulcan, it is a procedure. The difference is not convenience; it is whether MTTR for data incidents is measured in hours or in days.

> **Tip.** If you have demo capacity in the room, this is the demo to run. Audit log, identify bad version, execute rollback, show re-derived data. Five minutes, end to end, with the customer's own (or a mirrored) scenario. It is the most persuasive single artifact we have.

---

## 7. The maturity trajectory: L3 to L4 to L5

Otis is targeting L3. We are positioning for L3 plus the path to L4 and L5. The argument is not that we will help them reach L5 someday; every vendor says that. The argument is sharper:

> **The L3 architecture you build today determines whether L4 takes 3 months or 18 months.**

Snowflake-native L3 produces point-in-time artifacts: a current catalog, current quality scores, current lineage. These are queryable but not continuous. To get to L4 (measured, trend-aware, decision-driving), Otis would need to bolt on a measurement platform that captures these as time series, correlates them to logical data products, and unifies dbt run logs, Snowpark logs, GE outputs, and Snowflake query history into a coherent view. That is a multi-quarter side project, and most enterprises do not finish it.

DataOS Vulcan, by being the orchestrator, already emits every L4 event:

- Every plan diff = a change record
- Every run = a telemetry event tied to a specific product version
- Every quality check outcome = a trend point against a product
- Every perspective cache hit = a cost-saved measurement
- Every rollback = an MTTR data point

This is what we mean by "L4 as a side effect of L3." Otis does not build an L4 measurement platform later. They start emitting L4 telemetry from day one of the DataOS Vulcan implementation, and turn on the L4 dashboards when they are ready to act on the data.

### What each level actually looks like

| Dimension | L3 (Defined) | L4 (Managed, measured) | L5 (Optimizing, self-tuning) |
|---|---|---|---|
| **Quality** | Rules exist and run | Trends per product; change-failure rate computed | Drift predicted; bad releases auto-blocked |
| **SLA / Freshness** | Targets documented | p50/p95/p99 latency tracked; MTTR measured | Refresh cadence auto-tuned to consumption |
| **Ownership** | Owner named | Response time, incident metrics per owner | Auto-routing based on resolution history |
| **Consumption** | Telemetry captured | Cost per query, cost per product, ROI | Low-usage products auto-flagged for deprecation |
| **Lifecycle** | Versioned, rollback declared | DORA-for-data metrics (deploy freq, lead time, CFR, MTTR) | Predictive deprecation; auto-snapshot before risky changes |
| **Reusability** | SADPs reused across CADPs | Reuse metrics; dependency hotspots | Duplicate logic detected at PR time |
| **Discoverability** | Self-service search | Time-to-access metrics; discovery friction | Recommended products based on consumer behavior |

### The DORA-for-data framing

The DevOps Research and Assessment (DORA) metrics are familiar to most enterprise data leaders. They have direct equivalents in data product practice that DataOS Vulcan emits natively:

- **Deployment frequency.** How often data product versions ship.
- **Lead time for change.** Commit to live in Snowflake.
- **Change failure rate.** Percentage of releases causing rollback or DQ incident.
- **MTTR.** Incident detection to logic rollback or fix deployed.

Plus the data-specific extensions:

- Quality trend per product
- Freshness adherence (% of refreshes meeting SLA)
- Consumption growth (new consumers per quarter)
- Cost per product (Snowflake credits attributed)

> **AM framing, the line for the executive room:**
>
> Snowflake gives Otis the primitives to reach L3. The question is what runs on top. Either Otis builds an L4 measurement platform later as a separate program, or the L3 architecture is itself the L4 telemetry source. We are pitching the second option, and it costs less than the first.

---

## 8. AI-readiness as inherent property, not retrofit project

Otis's broader ambition extends beyond L3 maturity. They have stated interest in becoming agentic, building AI systems that act on enterprise data rather than just reporting on it. This places a different set of requirements on the data layer than traditional BI does, and the requirements are unforgiving. AI agents need data they can independently assess, query through governed interfaces, and trust without human intermediation.

A usable data product for an AI agent needs to expose:

- **Self-describing schema.** What columns exist, what types, what they mean semantically.
- **Live quality signals.** Is this data fresh, has it passed validation, what is its current trust state.
- **Lineage and provenance.** Where did this data come from, which version produced it.
- **Governed query access.** Authorized, audited, with clear consumption boundaries.

Data products built as labeled warehouse objects have none of these properties in machine-accessible form. An AI agent looking at a tagged Snowflake table sees columns and a few static tags. It cannot ask the table whether it is currently healthy, what its SLA status is, or whether the row it just queried came from a logic version that has since been rolled back. The metadata is static. The data product needs to be a contract.

DataOS Vulcan data products expose this contract as a first-class operational surface. Each product automatically generates an MCP (Model Context Protocol) endpoint with a defined set of tools that AI agents can interrogate before and during consumption:

| MCP tool | What the agent can ask |
|---|---|
| **About** | What is this product, who owns it, what does it contain |
| **Schema** | What columns, types, semantic definitions, relationships |
| **Quality** | Current quality state, recent check results, trust signals |
| **Query** | Governed query interface with the product's semantic model |
| **Lineage** | Upstream sources, downstream dependents, transformation history |
| **Activity** | Recent refreshes, current freshness, SLA compliance |
| **Runs** | Specific execution history, including the code version that produced any given row |

The agent connects to the data product, evaluates trust, and queries through governed APIs without custom per-product integration.

This is the second future-proofing axis alongside the L3 to L4 to L5 trajectory. Where the maturity argument says "the L3 architecture you build today determines whether L4 takes three months or eighteen," the AI-readiness argument says: the L3 architecture you build today determines whether agentic AI is a deployment flag or a migration project.

> **AM framing, say this in the room:**
>
> AI-readiness is not a separate program. Data products built with DataOS Vulcan are AI-ready on the day they ship. Otis does not need to choose between L3 today and agentic capability tomorrow; the same architecture delivers both. The alternative is to reach L3 with labeled warehouse objects, then rebuild them as runtime software when AI agents need them.

> **Note.** The strength of this argument depends on where AI sits in Otis's strategic roadmap. If their agentic ambition is concrete and near-term, this becomes a primary closing argument. If it is exploratory or longer-horizon, it should support the L4/L5 trajectory argument rather than lead. This needs validation with the Otis account team.

---

## 9. Objections, addressed

The objections we will encounter in every Otis conversation. Each AM should be able to deliver the response without hesitation.

### 9.1 "Why not just use Dynamic Tables?"

**Honest answer.** Dynamic Tables are elegant for simple derived tables with no lifecycle requirements. They become a liability the moment you need plan-level audit, cross-table orchestration consistency, or logic rollback. Snowflake is auto-managing the refresh, which means it is also auto-hiding what happened during the refresh.

**Talk track.** "Dynamic Tables are great for the parts of your estate where you do not need lifecycle, audit, or rollback. For your governed CADPs (the ones consumers depend on, the ones finance reports run against) you do need those things. Use Dynamic Tables where they fit. Use DataOS Vulcan-orchestrated pipelines where the lifecycle matters."

### 9.2 "Doesn't Snowflake Time Travel give us rollback?"

**Honest answer.** Time Travel rolls back data state within retention. It does not roll back logic. If a SQL change has been writing wrong values for a week, Time Travel does not help you re-derive correct values from corrected logic.

**Talk track.** "Time Travel and logic rollback are solving different problems. Time Travel is for accidental deletes and corrupted writes. Logic rollback is for shipped bugs. Both are valuable. DataOS Vulcan provides logic rollback; we encourage Otis to continue using Time Travel for the cases it covers."

### 9.3 "Why not dbt + Snowflake + GitHub Actions?"

**Honest answer.** Because that is three loosely coupled tools, not a managed platform. You get partial coverage: dbt for transformations, GitHub Actions for CI/CD, Snowflake for execution. You get no unified audit, no perspectives, no logic rollback as a first-class operation, and no continuous L4 telemetry. Each gap is fillable in isolation; the integration cost is what makes it a multi-quarter program.

**Talk track.** "dbt is in many Otis stacks already and that is fine. DataOS Vulcan does not displace it. The question is whether the assembly of dbt, Actions, Snowflake, a homegrown audit layer, and a homegrown rollback procedure is the platform Otis wants to maintain, or whether a control plane that does this natively is a better investment."

### 9.4 "Aren't we adding lock-in to DataOS Vulcan?"

**Honest answer.** Yes. The exit story is layered. Snowflake objects DataOS Vulcan creates remain queryable directly, so the data is never stranded. Hera-surfaced knowledge (the catalog visibility into the existing Snowflake estate) also persists in DataOS regardless of whether Vulcan is engaged for product builds. What Otis would lose if they wound down DataOS Vulcan entirely is the lifecycle metadata, the audit history, and the orchestration of Vulcan-managed products. That is real, and we should not pretend otherwise.

**Talk track.** "Every platform choice is a lock-in choice. The honest comparison is not 'DataOS Vulcan vs. no lock-in'; it is 'DataOS Vulcan vs. the lock-in to whatever combination of tools Otis would assemble instead.' Even if Vulcan adoption is wound down, the Hera-surfaced catalog and the underlying Snowflake objects remain available. We think the trade-off is favorable, and the exit path is intact."

### 9.5 "What about Snowflake cost?"

**Honest answer.** Net negative for workloads with repeat-query patterns, because of perspectives. Net neutral or slightly positive for workloads dominated by one-off analytical queries. DataOS Vulcan adds its own licensing cost, which needs to land in the same TCO conversation as the perspectives savings.

**Talk track.** "For Otis's BI and operational reporting workloads (which is most of their Snowflake spend) perspectives produce credit savings that meaningfully offset the DataOS Vulcan license. We should run the numbers on a representative workload before the pricing conversation, not during it."

> **⚠ Open issue.** We need a worked example with real Snowflake credit numbers from a comparable customer before this line is safe to deliver.

### 9.6 "This sounds heavy. Can our team adopt it?"

**Honest answer.** DataOS Vulcan reduces the per-team skill demand because the control plane absorbs the operational complexity that stream-aligned teams would otherwise build themselves. The adoption curve is real but it replaces a steeper curve. DataOS Vulcan's Builder MCP integrates with the IDEs Otis developers already use (Cursor, GitHub Copilot, Claude Code) so AI-assisted code generation handles the boilerplate of declaring models, quality checks, and semantic definitions. In pilot deployments, teams have taken a data product from blank repository to deployed product within a working session rather than across a sprint.

**Talk track.** "Without DataOS Vulcan, every Otis stream-aligned team needs to be expert in Snowflake DDL, CI/CD, audit logging, quality framework integration, and recovery procedures. With DataOS Vulcan, those concerns are absorbed by the platform. Combined with AI-assisted IDE integration through the Builder MCP, the developer workflow is significantly lighter than it appears. Most teams build their first deployed data product in a single working session, not across a sprint."

> **Note.** Confirming current pilot evidence for the "working session" timing and the enablement program details.

---

## 10. Recommended pilot path

Once internal alignment is in place, the conversation with Otis should move toward a pilot rather than a contract. A pilot does two things: it makes the developer experience concrete, and it gives Otis hands-on evidence to evaluate against their current approach. We recommend a five-step path that starts with the lowest-friction step we can offer.

### Step 1: Run DataOS Hera against the Otis Snowflake account

Hera scans the existing estate and surfaces it into DataOS as a knowledge layer. Otis gets day-one visibility into what they already have (tables, schemas, columns, lineage, metadata) without committing to any rebuild or architectural shift. This is the lowest-friction first step we can offer, and it delivers real value before any decision is made.

**Duration.** Typically one to two days for setup and initial scan, depending on estate size.
**Outcome.** Otis sees their full Snowflake estate in DataOS, with existing metadata visible and searchable. The subsequent steps draw from this foundation.

### Step 2: Working session with Otis data engineering

A live walkthrough of a DataOS Vulcan project on Snowflake, using Hera-surfaced knowledge from Step 1 as the starting context. The session goes from blank repository to a deployed data product with quality gates, semantic models, and consumption endpoints. The objective is not to demonstrate features. It is to make the developer experience tangible. Otis engineers should leave with a clear sense of what their day looks like in this model, including the Builder MCP integration with their existing IDEs.

**Duration.** Half a day.
**Outcome.** Otis engineers can describe the workflow back to their own leadership without our help.

### Step 3: Pilot one source-aligned data product (SADP)

Select an existing Snowflake dataset that the Otis team understands well, informed by what Hera has surfaced. Register it in DataOS Vulcan, declare quality checks, define a semantic model, and deploy. The objective is to compare the operational experience (what is captured, what is enforced, what is visible) against the current scan-and-surface plan for the same dataset.

**Duration.** One to two weeks.
**Outcome.** A working DataOS Vulcan-managed SADP with quality enforcement, audit trail, and consumption endpoint, with side-by-side comparison artifacts against the original Snowflake-native plan.

### Step 4: Pilot one consumer-aligned data product (CADP)

Take a transformation pipeline currently managed outside DataOS Vulcan. Rebuild it as a DataOS Vulcan-managed CADP using Snowflake-native SQL. Measure time-to-build, quality enforcement behavior under intentional fault injection (we deliberately ship a logic bug, then demonstrate rollback), and the consumer experience through the DataOS Vulcan catalog.

**Duration.** Two to three weeks.
**Outcome.** A working DataOS Vulcan-managed CADP with reversibility demonstrated end to end, telemetry visible, and consumer access flowing.

### Step 5: Evaluate and decide

After the pilots, Otis will have hands-on evidence of developer experience, operational behavior, integration footprint, and the L4 telemetry that emerges automatically. This is the point to make an informed decision on the architectural direction.

**Total elapsed time.** Typically three to seven weeks depending on Otis team availability and estate size. Builder MCP integration with their existing IDEs reduces setup time. Our solutions engineering team supports the work throughout.

> **AM framing, what we propose, not what we conclude:**
>
> We are not asking Otis to commit to an architectural shift before they have evidence. We are asking them to run Hera, see the full estate, then run two pilots to experience the developer workflow and operational behavior. The decision belongs to Otis. Our job is to make the evaluation as honest and as low-friction as possible.

---

## Summary: two architectures, two outcomes

The contrast between the two paths, in one view:

| Scan-and-surface approach | DataOS Vulcan data product stack |
|---|---|
| DataOS passively reads Snowflake metadata | DataOS Vulcan actively manages the data product lifecycle |
| Quality is detected after production | Quality is enforced before production |
| SLAs are documented in comments | SLAs are contracts the system manages |
| Lineage is inferred from query logs | Lineage is declared in code and verified |
| Semantic definitions drift from reality | Semantic definitions evolve with the code |
| APIs are built and managed separately | APIs are auto-generated from semantic models |
| AI access requires custom integration | AI access is a deployment flag (MCP) |
| Catalog reflects what was found | Catalog reflects what was built, tested, and deployed |

This is the closing visual for the customer deck. It is also the single artifact AMs should have ready to share in any meeting where the architectural choice is on the table.

---

## Closing note

This document is intentionally longer than a deck because alignment requires exposing the argument fully, including its weak spots. The deck that follows will compress this into perhaps fifteen slides. Before we build that deck, we need confidence that every section here survives internal pressure.

The single line we are asking Otis to take away is this:

> Snowflake is the right execution layer. DataOS Vulcan is the control plane that makes Snowflake operate at L3 today, emit L4 telemetry by design, and ship AI-ready data products from day one. The data product lifecycle has to be owned by something. We are arguing it should be owned by software, not by tribal practice.

If that line lands, the rest is implementation detail. If it does not, we need to find out before the customer meeting, not during it.

---

Internal alignment document. Pre-decisional. Do not distribute externally.