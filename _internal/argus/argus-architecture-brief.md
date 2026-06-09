# Argus — Architecture Brief

*For product. The full technical reference exists separately; this is the concept and the shape of the system.*

## The problem

Every product team describes its own data in its own words. The revenue team's "ARR," the finance team's "ARR," and the sales team's "active accounts" each live in a separate per-product model (we call these **Vulcan** models). Each is locally correct and locally well-understood. The problem is at the seams: nobody can reason *across* them. Ask "what's our ARR org-wide" or "what breaks if we change this revenue table" and there's no system that knows how the pieces relate, because the knowledge is scattered across teams, in their heads and their local models.

The usual fix is a central team that authors one master glossary everyone must adopt. It fails the same way every time: the central definitions don't match how teams actually work, adoption stalls, and the glossary rots.

## What Argus is

**Argus is the organization's knowledge system** — the layer that collects every team's local model and converges them into one coherent, org-wide semantic layer that both people and AI agents can reason over.

The defining choice is the direction of flow: **decentralized generation, centralized convergence.** Teams keep authoring locally, where the expertise is. Argus gathers what they produce and reconciles it centrally, rather than dictating definitions top-down. Knowledge is grown bottom-up, not imposed.

The other defining choice is the **primary consumer: AI agents.** Argus is not principally a glossary for humans to browse. It is a reasoning substrate that agents query through tools to understand the company's data — what a metric means, where it lives, what it depends on, whether a calculation is valid, whether two teams mean the same thing. Humans author and approve at the edges; agents are the main users of the result.

## How it's built: two layers

**Layer 1 — Meaning.** A knowledge graph of *concepts* — "ARR," "active customer," "churn rate" — and how they relate. A concept has a stable identity that never changes even when its name does, so renaming never breaks anything downstream. Concepts carry their definitions, their synonyms, and their relationships: which concept is a kind of which, which depends on which, and which concept in one team's vocabulary aligns with another team's. This layer is built on **SKOS**, a mature W3C standard for exactly this kind of knowledge organization, which means we adopt a proven model instead of inventing one. This layer is purely about *meaning*; it never touches a physical table.

**Layer 2 — Meaning meets data.** Where concepts connect to reality. Three things happen here:

- **Asset attachment** — linking a concept to the actual table or measure that realizes it. This is what turns an abstract definition into something an agent can run a query against. A concept can be realized in several places across the org; that set of links *is* the cross-product picture.
- **Term mapping** — when a team's raw term (a column name like `arr_total`) needs to be matched to a concept, AI proposes the match with a confidence score, and a human decides. This is the convergence engine: it is how the scattered local vocabulary gets pulled onto shared concepts cheaply, without a central team authoring it all by hand.
- **Workflow & governance** — the lifecycle of concepts (proposed → active → deprecated), who approves them, and the rules that keep the system trustworthy.

The clean rule between the layers: meaning lives in Layer 1; *meaning applied to actual data*, and the work of curating and governing it, lives in Layer 2.

## The operating principle that makes it work

**Governance is approving, not authoring.** Stewards never face a blank page. AI watches the terms teams are using, compares them to the concepts that already exist, and does three things: maps a term to an existing concept, proposes a brand-new concept when a cluster of terms across teams clearly names something that doesn't exist yet, or proposes that two teams' concepts are actually the same thing and should be aligned. In every case, AI produces a well-formed proposal with evidence; the steward gives a yes / no / edit. Reviewing is cheap and fast; authoring from scratch is expensive and slow. Putting the human only at the approval step is what makes governance tractable without a big central team.

This also means Argus is useful immediately, with imperfect inputs. It does not require every team to have a mature model before it delivers value — it rewards incremental maturity, aligning what exists and surfacing gaps rather than demanding everything upfront.

## Why this wins

- **It reflects how the org actually works** instead of fighting it — local authorship, central convergence.
- **It is honest about disagreement.** When two teams define "customer" differently and both are right, Argus keeps both as distinct concepts, records the relationship, and can mark one as the enterprise default, rather than forcing a false consensus that nobody adopts.
- **It is built for the AI era.** The primary consumer is agents reasoning about data through tools. A catalog built for human browsing and then retrofitted for AI is the trap competitors are in; Argus is designed agent-first from the foundation.
- **It sees across products.** Single-product catalogs can answer "what does this mean here." Argus answers "what does this mean across the company, where is it realized, and what depends on it" — which is the question that actually matters for impact analysis, governance, and trustworthy AI answers.

## What's true today vs. ahead

The meaning layer (Layer 1) is fully specified. The meaning↔data layer (Layer 2) — bindings, the resolver, governance workflow — is specified in design and is where build effort concentrates next. The agent-facing tool surface (how agents actually call Argus) is the next design step and the thing that will validate the whole system end-to-end.

---

*Full technical specification: see the Argus knowledge-system reference (`skos-reference-and-argus.md`).*
