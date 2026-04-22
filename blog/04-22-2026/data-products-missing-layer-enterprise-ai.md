# Data Products: The Missing Layer for Enterprise AI

*Document A, external and leadership audience. Argues why Data Products are the right abstraction for the AI era, why most current approaches fall short, and how DataOS positions itself in that landscape. Blog-ready draft, intended to complement the internal guide with the broader thesis.*

- **Version:** 0.9 (for internal review)
- **Last updated:** 22 April 2026
- **Owner:** Animesh Kumar
- **Status:** Draft, for stakeholder review before external publication.

---

## 1. The Moment

![Timeline 2024-2026: Agent frenzy through 2024-2025, then hitting the wall mid-2025 (MIT NANDA), then OpenAI's proof in Jan 2026, then a16z's thesis in March 2026](images/01-moment-timeline.png)
*The convergence took roughly two years. What's new is not the observation but the urgency behind it.*

Through 2024 and 2025, "AI agents for your data" was one of the most promoted categories in enterprise software. Every major vendor had a demo. Every board deck had a slide. The pitch was deceptively simple: ask your data a question in English, get an answer. Skip the analyst, skip the dashboard, skip the SQL.

And through 2024 and 2025, most of these agents quietly failed in production.

MIT's [*State of AI in Business 2025*](https://nanda.media.mit.edu/ai_report_2025.pdf) report flagged the reason in general terms: enterprise AI efforts fail due to *brittle workflows, lack of contextual learning, and misalignment with day-to-day operations*. The industry spent much of 2025 assuming this was a model problem. Better reasoning, bigger context windows, smarter fine-tuning. The model side improved dramatically through the year. The problem did not go away.

In January 2026, OpenAI published [an unusually detailed description of the internal data agent](https://openai.com/index/inside-our-in-house-data-agent/) they had built for their own employees. Two engineers, three months, a production system used daily by roughly 4,000 people across the company. The headline wasn't the output; it was the architecture. The agent was built on **six deliberate layers of context** grounding every query: schema metadata and lineage, historical query patterns, curated expert descriptions, code-derived definitions from pipelines, institutional knowledge pulled from Slack and docs, and persistent memory of past corrections. Separately, the agent could issue live queries to inspect schemas when context was missing or stale.

OpenAI's own framing, from that post: *high-quality answers depend on rich, accurate context. Without context, even strong models can produce wrong results.*

Two months later, in March 2026, a16z published [a thesis piece by Jason Cui and Jennifer Li titled *"Your Data Agents Need Context."*](https://a16z.com/your-data-agents-need-context/) The argument was that the market had just spent a year relearning a lesson: data agents are not a model problem, they are a context problem. And context, the authors argued, needed to become a real architectural layer in its own right, not an afterthought, not a semantic layer bolted onto a BI tool, but first-class infrastructure.

Foundation Capital and others converged on similar framings over the same window. So did Palantir, which has been quietly saying a version of this for a decade, through its ontology work. The practitioner community had been writing in the same direction for months before the OpenAI and a16z pieces crystallized it. [Modern Data 101's "Rise of the Context Architecture"](https://moderndata101.substack.com/p/rise-of-the-context-architecture) in October 2025 made the argument explicitly: metadata and relationships are the new product; raw data is the raw material. The consensus, broadly, is new; the underlying observation is not. What changed is that the consensus now has urgency. Agents need context. The organizations that have it will ship AI that works. The organizations that don't will keep paying what might be called the OpenAI tax: building context infrastructure from scratch, per agent, without reuse.

This document is about what that context layer should look like, why the right abstraction already exists and is called a Data Product, and why most of the current market is addressing the problem from the wrong direction.

---

## 2. The Industry's Realization

For most of the last decade, the dominant idea in enterprise data was *centralization*. Get all the data into one place (a warehouse, a lakehouse), clean it up, and business users would be able to self-serve. Write SQL, pull data, power dashboards. The modern data stack was the architectural expression of this idea. It worked, up to a point. Dashboards got better. Analysts got faster. A large category of companies, from dbt to Snowflake, was built on making this centralization practical.

The limits of centralization became visible once AI agents arrived. A human analyst reading a warehouse doesn't just see the tables. They know which table is the "real" one. They know that *revenue* means net of refunds unless otherwise specified. They know the fiscal quarter ends on the 28th, not the 30th. They know that the finance team uses one source, the product team another, and which one to trust for a given question. Most of what makes the warehouse useful to a human analyst is the analyst's own accumulated context.

An AI agent walking into the same warehouse has access to the tables but not the context. It doesn't know which of five similarly-named tables is canonical. It doesn't know that the semantic layer was last updated by someone who left the company, and that three new product lines have been launched since. It doesn't know that *active customer* means something different in the growth dashboard than in the finance model. When asked *"what was revenue growth last quarter?"* the agent can write competent SQL against a plausible-looking table and return confidently wrong numbers.

This is why a year of AI-for-data agents largely failed to land in production. The model wasn't the bottleneck. The model was flying blind through an environment that depended on context the model didn't have.

The realization that crystallized across early 2026 is that context itself has to become a durable architectural layer. Not a prompt. Not a wiki. Not tribal knowledge that evaporates when someone leaves the team. A managed, versioned, discoverable layer that can be connected to, queried by, and relied on by anything that needs to reason about the company's data.

The useful next question is what shape that layer should take. And here the answer has been hiding in plain sight for several years, under a name most enterprise data leaders already know: the Data Product.

---

## 3. The Shape of the Answer

A **Data Product** is a managed unit of data that is treated like a product rather than as a byproduct of some operational system. It has an owner. It has a contract describing what it guarantees and what it doesn't. It has a named consumer in mind. It has a lifecycle: versioned changes, deprecation windows, sunset. It is discoverable in a catalog, addressable through a stable interface, and accompanied by its own semantics, lineage, and quality signals.

None of this is new. The term has been in circulation since at least 2019, most prominently through [Zhamak Dehghani's data mesh writing](https://martinfowler.com/articles/data-monolith-to-mesh.html). What's new is the context in which the definition now lands. A Data Product was, until recently, a good idea for making warehouses more usable to humans. In the AI era, it becomes the right unit of consumption for agents.

The definition can be restated in a way that makes the AI relevance obvious: a Data Product is *context packaged as a first-class asset*. Everything an agent would otherwise have to reconstruct from scratch (the schema, the semantics, the ownership, the freshness, the lineage, the quality, the right way to read it) is part of the product by construction.

This is not a coincidence. The six layers of context that OpenAI built by hand for their internal agent correspond, almost one-to-one, to what a well-constructed Data Product already includes:

- Schema metadata and lineage: a Data Product carries its schema and its upstream lineage as part of its specification.
- Historical query patterns: usage telemetry is a natural byproduct of a Data Product served through a governed interface.
- Curated expert descriptions: the Data Product's owner writes these as part of its contract.
- Code-derived definitions: the transformation logic that produces the product *is* its definition, and it's already versioned.
- Institutional knowledge: the product's semantic layer captures the decisions that tribal knowledge otherwise preserves.
- Memory of past corrections: a governed product that reviews and incorporates feedback accumulates this automatically.

![OpenAI's six context layers mapped one-to-one onto the properties of a Data Product](images/02-openai-six-layers-mapped-to-data-product.png)
*What OpenAI built from scratch, in months, a Data Product provides by construction. The correspondence is near-exact.*

OpenAI built context infrastructure from scratch because they had to. Most enterprises should not have to. The abstraction already exists, and the industry has already converged on its shape.

---

## 4. Why This Is the Right Shape for AI

A reasonable question at this point: if Data Products are so obviously the right shape, why didn't this become the dominant architecture five years ago? The answer is that the demand hadn't yet arrived. A Data Product is more expensive to build than a raw table. Someone has to own it, contract it, version it, keep it fresh. Organizations absorb that cost only when the consumer justifies it.

Human analysts don't always justify it. An experienced analyst can read a raw warehouse and fill in the missing context from experience. Dashboards can work around missing metadata. A small data team can informally serve as the "context layer" for a whole company. Up to a certain scale, this works, and the overhead of formalizing Data Products feels like discipline for discipline's sake.

AI agents are different in four ways that collectively push the economics.

First, they **scale to a breadth no analyst team does.** A single agent can field questions across every department in an organization, simultaneously. The accumulated informal context of any one person is useless at that breadth; the context has to be external, shared, and machine-readable.

Second, they **cannot improvise safely.** An analyst who encounters an ambiguous table asks a colleague or flags it. An agent asked the same question has no such instinct; it writes a confident query against whatever is in front of it. The cost of "confidently wrong" is much higher than the cost of "paused to clarify," and the only way to avoid confidently wrong is to hand the agent context that is already correct.

Third, they **operate under contracts, not conventions.** A human analyst can tell the difference between a table that "probably works" and one that "definitely works." An agent has no such discrimination. It needs a machine-readable signal (an SLA, a quality gate, a contract) to know whether to trust what it's reading. Data Products carry these signals natively.

Fourth, they **benefit massively from reuse.** Every agent in an organization can consume the same Data Product. Every new agent that arrives can be pointed at the same catalog. The context investment amortizes across agents, across use cases, across years. This is the one factor that fully justifies the overhead: a Data Product built for one consumer serves the next hundred without rebuild.

The result is that Data Products become architecturally necessary at roughly the same moment AI agents become organizationally necessary. The shape that was merely good discipline for human analysts is structurally required for agents, and the cost calculation has flipped: not investing in Data Products is now more expensive than investing, because every agent has to carry its own context infrastructure otherwise. Modern Data 101 made a parallel argument in ["AI-Ready Data: A Technical Assessment"](https://moderndata101.substack.com/p/ai-ready-data-a-technical-assessment): the semantic layer inside a Data Product is the authoritative source of business meaning that persists across systems, and it's precisely what lets AI move from statistical correlation to business decision.

---

## 5. What Happens Without It

The concrete failure mode, stated in the a16z piece, is worth walking through because it happens constantly and reveals exactly what the industry missed.

An agent is asked a question that looks trivial on its surface: *"What was revenue growth last quarter?"*

The first thing that breaks is the **definition of revenue.** Revenue is not a column in a table. It is a business definition that depends on billing terms, refund policy, recognition timing, product mix, and a dozen other factors that are specific to the company. Net of refunds? Gross? Recognized or booked? The agent has no way to know.

The second thing that breaks is the **definition of quarter.** Fiscal calendars vary by company. Some companies close on the last day of the month, some on the last Friday, some on the 28th. The agent's built-in notion of "Q1" almost certainly doesn't match.

The third thing that breaks is the **identification of the source.** Three tables in the warehouse have "revenue" in their name. One is the fact table, one is a materialized view, one is a legacy snapshot that has not been maintained since 2023. A human analyst knows which is which. The agent does not.

The fourth thing that breaks is **recency.** The source the agent picks has not been updated in four days because an upstream pipeline failed overnight and no one has noticed. The agent has no way to detect this; it reads the freshest row it can find and returns it.

The fifth thing that breaks is **trust.** The agent returns a number, confidently. A human asks *"is this right?"* and no one can answer quickly, because the chain from question to answer is opaque. The agent has no way to show its work in a form that makes the chain auditable.

At every one of these five failure points, a properly-constructed Data Product would have prevented the failure:

![Raw warehouse vs Data Product: the agent asking "what was revenue growth last quarter?" fails on five dimensions against a raw warehouse and succeeds against a Data Product](images/03-data-product-vs-raw-warehouse.png)
*A raw warehouse leaves every question open; a Data Product answers each by construction through its semantic layer, contract, SLA, and quality gates.*

The question answers itself. An AI agent is only as reliable as the context it is given. A raw warehouse does not give it context. A Data Product does.

---

## 6. The Market's Current Answers

The industry has noticed. What the industry has not fully internalized yet is that the *shape* of its answer will determine whether the architecture scales or locks the problem in place.

The most visible answers today come from what a16z calls the **data gravity platforms**, the companies that already hold most of the enterprise's data and compute, and are adding AI-agent functionality on top.

**Databricks** has released Unity Catalog for governance and metadata, Genie for natural-language data exploration, and is building the context surface around its lakehouse. **Snowflake** has Cortex Analyst for natural-language querying, Polaris for open catalog access, and a parallel effort to serve AI workloads from the warehouse. **Palantir** has been building Ontology for a decade and a half, arguably the most mature version of this architecture in the market, and is now selling it explicitly as the AI context layer.

These are all credible efforts, led by teams that understand the problem. They are not wrong about what they're building. The differentiating question is about shape.

The pattern these platforms share is that their AI functionality is *compute-locked*. A Data Product built in Databricks lives in Databricks, and its AI surface is served by Databricks. A Data Product built in Snowflake lives in Snowflake. A Palantir ontology lives in Palantir Foundry. This is a natural consequence of their business model: the context layer is an entry point into more compute consumption on the same platform.

For enterprises that run their data in one place and intend to continue doing so, this is fine. For enterprises that have data across multiple engines (Snowflake for analytics, Postgres for operations, a lakehouse for ML, Databricks for certain workloads) the compute-locked model forces a choice. Either consolidate onto one platform (an expensive and often impossible project), or accept that your AI agents will have fragmented context, with a different surface in each engine.

The a16z piece frames this explicitly: data gravity platforms are credible but structurally limited by the compute they are tied to. A separate category of *dedicated context-layer companies* has emerged to address the problem from a different direction: context-first, engine-independent. This is the architectural choice that determines whether a Data Product strategy is portable across the organization's actual data landscape, or captive to wherever the largest contract was signed.

---

## 7. What DataOS Does Differently

DataOS is built on the thesis that the Data Product, not the engine, is the atomic unit.

![Compute-locked vs engine-agnostic: on the left, Databricks, Snowflake, and Palantir each hold Data Products locked inside their own compute platforms; on the right, DataOS sits above multiple engines with Data Products as the shared contract layer](images/05-compute-locked-vs-engine-agnostic.png)
*In the data gravity model, Data Products live inside the compute platform and are consumed through it. In DataOS, Data Products live above the compute, with the same contract reachable regardless of which engine holds the bytes.*

The practical consequence is that a Data Product in DataOS is not tied to any particular compute platform. It can be built in Snowflake if that's where the data lives. It can be built in BigQuery or Databricks or Postgres if that's where the organization has standardized. It can be built in the DataOS Lakehouse (Iceberg on S3, ADLS, or GCS, with Spark and Trino) if the team wants a native, governed substrate. The *same discipline*, the *same contract*, the *same consumption surface* applies regardless of which engine holds the bytes.

This is what "engine-agnostic" means in practice. It's not a marketing claim. It is an architectural stance that produces specific outcomes:

- An organization adopting DataOS does not have to replatform. If data already lives in Snowflake with Fivetran pipelines feeding it, DataOS builds Data Products directly in that Snowflake. No migration. No rip-and-replace. This is the overlay pattern, and it is one of the most common adoption shapes.
- A single AI agent can reason across Data Products from multiple engines through a consistent interface, because the contract lives above the engine, not within it.
- As the organization's substrate evolves (new engines added, old ones deprecated), the Data Products above them can remain stable. Consumers bind to the contract, not to the storage.

The comparison to the data gravity platforms is not that DataOS does more than they do. In several dimensions, they do more, because they own the substrate. The comparison is about *where the Data Product lives*. In their model, it lives inside the compute platform. In DataOS, it lives above the compute platform, so it can be consumed consistently regardless of which compute platform holds it.

For an enterprise whose data landscape is one platform today and will be one platform forever, this distinction doesn't matter. For everyone else, it is the distinction.

---

## 8. Discovery, Production, Consumption

The architecture that makes this possible is organized around the path a Data Product takes from first question to active consumption: Discovery, Production, Consumption.

**Discovery** is the work that happens *before* a Data Product exists, when a team is answering *"what data do we have, and can we build what we want from it?"* Metadata, lineage, and profile information are browsable through the catalog. Exploratory SQL is available through an interactive workbench. If data is missing, it can be brought in: batch, CDC, a wide range of source types, with masking and schema-absorption at the boundary. Discovery is iterative and ends with a decision: we have what we need, let's build; or we know what's missing.

**Production** is where the Data Product is built. Transformations are declarative, SQL or Python. Validation runs in-band: tests, audits, assertions, quality checks that block bad data from being published rather than alerting on it after. A semantic layer captures business metrics and dimensions once, with definitions that consumers (humans, applications, agents) all resolve through. The result is materialized in the chosen engine, exposed through a thin API layer (REST and GraphQL), versioned like software, governed like a product.

**Consumption** is where the Data Product is used. Applications connect through REST or GraphQL. BI tools connect through database wire protocols as if they were talking to a regular database. Notebooks and ML pipelines connect through SDKs. AI agents connect through MCP (the Model Context Protocol) to a set of tools that expose the product's metadata, schema, lineage, quality, runs, and semantic query surface. Each consumer gets the protocol that fits; the contract behind every protocol is the same.

![Three-stage flow in DataOS: Discovery, Production, Consumption, with the engine as through-line and governance, lineage, observability as a horizontal layer across all three](images/04-three-stage-flow.png)
*DataOS organizes every capability around the path a Data Product takes from first question to active consumption. The engine is the through-line; governance, lineage, and observability apply across all three stages.*

The full capability description of each stage lives in the internal guide. The relevant point for this document is structural: the three stages are how DataOS operationalizes the thesis. Discovery makes the cost of building a Data Product low. Production makes the product reliable. Consumption makes it reachable by every consumer shape the organization has. Each stage is instrumented so that governance, lineage, and observability are not additional projects but properties of the platform.

---

## 9. Why MCP Matters

The most important surface in consumption, for the purposes of this document, is the one for AI agents. This deserves its own section because it is the mechanism through which a Data Product becomes an answer to the enterprise AI problem described at the start of the document.

[MCP is the Model Context Protocol](https://modelcontextprotocol.io/), originated by Anthropic in late 2024 and now broadly adopted as a standard for how AI agents talk to tools and data sources. It is conceptually simple: an agent connects to a server that exposes a set of tools, each with a defined input schema and behavior, and the agent invokes them as needed during reasoning.

For a Data Product, MCP is the native agent interface. DataOS exposes tools through which an agent can read the product's metadata, inspect its schema, trace its lineage, check its quality, view its run history, and issue semantic queries against it. Every one of these is grounded in the product's contract. The agent does not write raw SQL against arbitrary tables; it resolves through the semantic layer, constrained by the product's definitions, observed through the product's quality gates.

The practical difference this makes: an agent operating against a raw warehouse is an OpenAI-scale context-infrastructure project in its own right. An agent operating against a Data Product through MCP is a consumer of context infrastructure that has already been built. The agent's job shrinks from *"assemble and reason about a data landscape"* to *"reason within a contracted, observable product."* This is the difference between agents that work and agents that fail quietly.

It is also why the AI-era conversation about data cannot be separated from the Data Product conversation. The model is one input. The context layer is the other. MCP is the wire between them. And the reliability of the whole system depends on whether the context being wired in is a governed product or an ad-hoc scrape.

A caution worth naming, from analyst consensus. At Gartner D&A 2026, Andres Garcia-Rodeja presented a prediction that [roughly 60% of agentic analytics projects relying solely on MCP will fail by 2028](https://metadataweekly.substack.com/p/gartner-d-and-a-2026-where-the-context), specifically because MCP without a consistent semantic layer underneath is insufficient. MCP is the wire; what travels over it still has to be a governed product with coherent semantics. This is the architecture Modern Data 101 describes in ["Architectural Standards for Data Products and AI Interactions"](https://moderndata101.substack.com/p/architecture-data-products-ai-interactions): Data Products provide the economic unit, a Data Developer Platform provides the industrialization, and MCP provides the AI interface. All three, together, are what makes agent-driven analytics work. Missing any one, it fails.

---

## 10. What This Means

The argument assembled across this document comes down to four claims, each of which holds independently and together.

*First*, the enterprise AI era is real and is here. Agents are being deployed, deals are being signed, budget is being allocated. The organizations that make this work will have an advantage; those that don't, won't.

*Second*, making it work is not primarily a model problem. The industry spent 2025 discovering this, and the consensus across OpenAI, a16z, MIT, Palantir, and others is that the missing piece is context infrastructure: durable, managed, versioned, available to agents.

*Third*, the right shape for that context is the Data Product. This is not a new idea, but the AI era has made it load-bearing. A Data Product is what an enterprise builds once and agents consume forever, in contrast to the status quo of agents assembling context per query.

*Fourth*, the architectural choice of *where the Data Product lives* determines whether this strategy is portable across the enterprise or locked into a single compute platform. The data gravity platforms (Databricks, Snowflake, Palantir) are building strong context surfaces tied to their compute. DataOS is building for the enterprise whose data lives in more than one place, and intends to keep it that way.

The four claims together make the positioning statement that this document exists to carry: the missing layer for enterprise AI is the Data Product, and the right way to build Data Products is above the engine, not inside it.

If this thesis is right, the category of *engine-agnostic Data Product platforms* will be one of the consequential infrastructure categories of the next few years. DataOS is built on the bet that it is.

---

*If this thesis is interesting to you and you're thinking about Data Products for AI in your own organization, we'd welcome the conversation. Reach us at [contact].*