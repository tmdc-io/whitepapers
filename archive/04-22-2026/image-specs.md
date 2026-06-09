# Image Specifications: "Data Products: The Missing Layer for Enterprise AI"

*Companion spec sheet for the five images referenced in `data-products-missing-layer-ai.md`. Each image has a defined role in the narrative; this document tells a designer what the image needs to communicate, not how it should look stylistically. Brand/style decisions (palette, typography, illustration style) should layer on top of these concepts.*

**Version:** 0.9
**Last updated:** 22 April 2026
**Intended audience:** Designer or design team producing final images for internal deck + public blog post.

---

## Shared style notes

Apply these to all five images so the set hangs together:

- **Palette:** Three-color maximum. Suggest: brand neutral (dark gray or near-black for structural lines and text), brand accent (Modern/DataOS primary color, whatever that is, for emphasis and DataOS-specific elements), cautionary red for "this is what fails" markers. No gradients except subtle if used sparingly.
- **Typography:** Single sans-serif throughout. Brand font if there is one; otherwise Inter, IBM Plex Sans, or similar. No decorative fonts anywhere.
- **Weight:** Professional but not sterile. These go in a CEO deck *and* a public blog, so they should look designed without looking like advertising.
- **Aspect ratios:** Design for both inline blog (roughly 1200×600 landscape) and deck (4:3 or 16:9). If a single image must serve both, 16:9 is the safer default.
- **Captions:** Each image has a caption in the main doc. The image itself should not duplicate that caption text; treat the caption as metadata, not part of the image.
- **No stock photography.** Every image is a diagram or illustration, not a photo of people looking at laptops.

---

## Image 1: The Moment (Timeline)

**File:** `images/01-moment-timeline.png`
**Placement:** Top of §1, before the opening paragraph.
**Role:** Establishes "why now" at a glance. A CEO who reads only images should understand the market timing from this one.

**Concept:** A horizontal timeline from 2024 to early 2026, with four marked moments along it. The timeline is not evenly spaced by calendar; it's spaced by narrative weight. The first two moments (agent frenzy, hitting the wall) take up the first two-thirds of the visual width; the last two (OpenAI, a16z) are closer together on the right.

**Markers along the timeline (left to right):**

1. **2024–2025: "Agent frenzy"** — label this moment with a short phrase like *"Every vendor launches an AI-for-data agent."* Could show a cluster of generic agent icons or logo-style shapes. Mood: busy, crowded, optimistic.
2. **Mid-2025: "Hitting the wall"** — [MIT NANDA](https://nanda.media.mit.edu/ai_report_2025.pdf) publishes *State of AI in Business 2025*. Label: *"Most enterprise AI initiatives fail. MIT names why: brittle workflows, lack of contextual learning, misalignment with operations."* Mood: sober, red-tinged if using the cautionary color.
3. **January 29, 2026: "OpenAI proof"** — [OpenAI publishes in-house data agent post](https://openai.com/index/inside-our-in-house-data-agent/). Label: *"Six deliberate layers of context. Two engineers, three months, 4,000 internal users."* Mood: constructive, solution-shaped.
4. **March 10, 2026: "a16z thesis"** — [a16z publishes *Your Data Agents Need Context*](https://a16z.com/your-data-agents-need-context/). Label: *"The industry names the missing layer."* Mood: consolidation, consensus.

**Layout options:**
- **Option A (preferred):** Straight horizontal timeline with a main axis line, four pin markers above or below the line, each with a small descriptor box. Keep text minimal so it's readable at deck scale.
- **Option B:** Arc or s-curve to suggest narrative motion. More dynamic but harder to execute cleanly.

**What it must communicate:** The market just converged on a problem diagnosis. The pieces arrived in a specific order, and the order matters (frenzy → failure → proof → thesis).

**What to avoid:** Making this look like a product roadmap. It's a market chronology.

---

## Image 2: OpenAI's Six Layers Mapped to a Data Product

**File:** `images/02-openai-six-layers-mapped-to-data-product.png`
**Placement:** In §3, after the bulleted list of the six layers.
**Role:** The single most shareable image in the document. A CEO who screenshots this and posts it to LinkedIn is doing marketing for us. Needs to be *visually memorable.*

**Concept:** Two columns side by side. Left column shows OpenAI's six context layers as a labeled stack (based on their "burger" metaphor in some third-party coverage, but we don't need to call it that). Right column shows the same six capabilities as *intrinsic properties of a Data Product.* Arrows or thin connectors between each layer and its Data Product counterpart, emphasizing the one-to-one correspondence.

**Left column: OpenAI's six layers (top to bottom, or in any stacked order)**
1. Schema metadata & lineage
2. Historical query patterns (Query inference)
3. Curated expert descriptions (Human annotations)
4. Code-derived definitions (Codex Enrichment)
5. Institutional knowledge (Slack, Docs, Notion)
6. Memory (persistent corrections)

*Label the column:* "OpenAI built this from scratch."
*Subtext (smaller):* Two engineers, three months, internal-only.

**Right column: Data Product intrinsic properties**
1. Schema + upstream lineage (in the product specification)
2. Usage telemetry (natural byproduct of governed interface)
3. Owner-written descriptions (in the product contract)
4. Versioned transformation logic (the definition itself)
5. Semantic layer (captures the tribal knowledge)
6. Governance feedback loop (accumulates corrections)

*Label the column:* "A Data Product provides this by construction."
*Subtext (smaller):* Built once, reused across every agent.

**Connectors:** Thin lines from each left-item to each right-item, showing exact one-to-one match. Not tangled.

**What it must communicate:** The thing OpenAI built as a one-off is what a Data Product *is*. Building from scratch was a consequence of not starting with a Data Product.

**What to avoid:** Making it look like a product comparison chart (feature checkmarks, etc.). This is a conceptual correspondence, not a feature matrix.

---

## Image 3: Data Product vs Raw Warehouse (Revenue Growth Example)

**File:** `images/03-data-product-vs-raw-warehouse.png`
**Placement:** In §5, after *"a properly-constructed Data Product would have prevented the failure."*
**Role:** The most educational image. Makes the concept concrete through a single worked example. CEOs understand examples faster than definitions.

**Concept:** Two columns labeled "Raw warehouse" and "Data Product." Above both: the question *"What was revenue growth last quarter?"*. Below each column label: five rows, each representing one of the five failure points (revenue definition, quarter, source table, freshness, trust). In the raw warehouse column, each row is a question mark or red X. In the Data Product column, each row is a concrete answer in green or the brand accent.

**Header (spans both columns):**
> Question: *"What was revenue growth last quarter?"*

**Left column: Raw warehouse (each row is unresolved)**
| Row | Content |
|-----|---------|
| Revenue? | ??? (red marker) |
| Quarter? | ??? (red marker) |
| Which table? | ??? (red marker) |
| Fresh? | ??? (red marker) |
| Trustworthy? | ??? (red marker) |

Footer under column: *"Agent fails, confidently."*

**Right column: Data Product (each row is resolved)**
| Row | Content |
|-----|---------|
| Revenue | = net of refunds (semantic layer) |
| Quarter | = fiscal, ending last Friday |
| Source | Single addressable contract |
| Freshness | SLA published, agent gates on it |
| Trust | Quality gates passed, lineage intrinsic |

Footer under column: *"Agent succeeds, safely."*

**Visual treatment:** The raw warehouse column should feel "hollow" (red markers, empty space). The Data Product column should feel "filled in" (concrete labels, brand accent). The contrast carries the point.

**What it must communicate:** A raw warehouse leaves every question about correctness open. A Data Product answers each by construction. The agent's success or failure is not about the agent; it's about what the agent is given.

**What to avoid:** Making it cluttered. Keep each row to one line. The eye should scan top-to-bottom on each side and see the pattern.

---

## Image 4: Discovery → Production → Consumption Flow

**File:** `images/04-three-stage-flow.png`
**Placement:** In §8, after the paragraph describing Consumption.
**Role:** The operational map of DataOS. Shows how the platform delivers on the thesis. Less flashy than Image 2, but load-bearing for anyone asking *"okay, how does this actually work?"*

**Concept:** Three stage boxes in a row, connected by arrows left-to-right: Discovery → Production → Consumption. Below the three boxes: a single horizontal bar labeled "The engine" spanning the full width, with small labels inside listing the engine options (DataOS Lakehouse, Snowflake, BigQuery, Databricks, Postgres, etc.). Below the engine bar: a thinner horizontal band labeled "Governance · Lineage · Observability" spanning the full width. The whole composition is enclosed in a light outline labeled "DataOS (control plane)."

**Top row: three stage boxes**

1. **Discovery**
   - Subtitle: *"What do we have, and can we build what we want?"*
   - Small icons or text: metadata, lineage, profile, exploratory SQL, ingestion if needed

2. **Production**
   - Subtitle: *"Build the Data Product."*
   - Small icons or text: transformations, in-band validation, semantic layer, versioned API

3. **Consumption**
   - Subtitle: *"Reach the consumers."*
   - Small icons or text: REST, GraphQL, wire protocols, SDKs, MCP for agents

**Arrows between stages:** Simple right-pointing arrows between boxes. Could be slightly thicker than hairlines to suggest flow.

**Middle horizontal bar:** "The engine (through-line)" with a discreet row of engine labels. Should feel like a foundation under the three stages, not a fourth stage.

**Bottom horizontal band:** "Governance · Lineage · Observability" as a thin ribbon under the engine. Conveys "horizontal across all stages."

**Enclosing outline:** Light outline or soft background shading labeled "DataOS (control plane)" at the top-left corner.

**What it must communicate:** DataOS is organized around a single path. The engine is substrate, not platform. Governance, lineage, and observability are properties of the platform, not separate projects.

**What to avoid:** Making the engine or governance look like afterthoughts. They're structurally significant and should be visually present, not squeezed into corners.

---

## Image 5: Compute-locked vs Engine-agnostic

**File:** `images/05-compute-locked-vs-engine-agnostic.png`
**Placement:** In §7, right after the opening sentence about Data Products being the atomic unit.
**Role:** The single most important positioning image. This is the one that answers the CEO's five-minute question of *"how is this different from Databricks and Snowflake?"* If we had to keep only one image, this would be it.

**Concept:** Two architectural diagrams side by side. Left side shows the "compute-locked" pattern (three separate vendor stacks, each with Data Products trapped inside their own compute platform). Right side shows DataOS with Data Products above multiple engines as a shared layer.

**Left side: "Compute-locked" (three parallel stacks)**

- Stack 1: **Databricks** — labeled box for compute (Databricks Lakehouse), with a Data Product icon *inside* it. Unity Catalog / Genie named as the AI surface on top.
- Stack 2: **Snowflake** — labeled box for compute (Snowflake warehouse), with a Data Product icon *inside* it. Cortex Analyst / Polaris named as the AI surface on top.
- Stack 3: **Palantir** — labeled box for compute (Foundry), with a Data Product icon *inside* it. Ontology named as the AI surface on top.

All three stacks separated by clear gaps, emphasizing that they're siloed. Each stack's Data Product is visibly "locked" to its compute (maybe a subtle outline or tether).

Caption under left side: *"Data Products live inside the compute. Consumed only through it."*

**Right side: "Engine-agnostic" (DataOS)**

- Top layer: horizontal bar labeled "DataOS" with Data Products sitting clearly *above* (or *in*) this layer, not inside any one engine. Data Product icons visible here.
- Below DataOS: multiple engine boxes side by side. Snowflake, BigQuery, Databricks, Postgres, DataOS Lakehouse. Each engine holds bytes, but none of them holds the Data Product contract.
- Connection lines from Data Products down to multiple engines: a single Data Product can connect to whichever engine is appropriate; consumers connect to the Data Product, not the engine.

Caption under right side: *"Data Products live above the compute. The same contract reaches consumers regardless of which engine holds the bytes."*

**Visual treatment:**
- The left side should feel *fragmented*: three separate stacks, each closed.
- The right side should feel *integrated*: one DataOS layer spanning multiple engines cleanly.
- The same Data Product icon (whatever we choose) appears in both sides, so the viewer sees it's the same *thing* being treated differently.

**What it must communicate:** The difference isn't feature richness. It's *where the Data Product lives*. Below the compute (locked) vs above the compute (portable).

**What to avoid:**
- Making the left side look bad or the competitors look dumb. The diagram should feel analytical, not combative. Databricks, Snowflake, Palantir have real products; the distinction is architectural, not qualitative.
- Making the right side look magical. It's a different architectural choice, not a miracle.

---

## Delivery checklist

For each image:
- Final file in PNG and SVG (SVG preferred for the blog, PNG as fallback)
- Light-mode version (primary use)
- Dark-mode version (optional, for decks with dark backgrounds)
- Export at 2x resolution for retina displays
- Alt text matches the alt text already in the markdown (check `![...]` descriptions in `data-products-missing-layer-ai.md`)
- Place final files in an `images/` directory at the same level as the markdown

For the set:
- All five images share the same palette and typography
- Captions live in the markdown, not on the images
- File names match the placeholders already in the markdown

---

## Attribution notes

A few images adapt ideas from other sources. Best practice is to credit these in the caption where relevant:

- **Image 1 (timeline):** No attribution required, but the four source links are already in the markdown caption area.
- **Image 2 (six layers):** The six-layer concept is from OpenAI's in-house data agent post. Caption should note: *"Six layers sourced from OpenAI's in-house data agent architecture, January 2026."*
- **Image 5 (compute-locked vs engine-agnostic):** The "data gravity platforms" framing is from a16z's March 2026 piece. Caption could note: *"'Data gravity platforms' framing adapted from a16z, March 2026."*

Images 3 and 4 are original framings; no attribution needed.