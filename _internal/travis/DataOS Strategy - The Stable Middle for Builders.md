# DataOS Strategy: The Stable Middle for Builders

Sep 28, 2026 · @Travis T

## Strategic thesis

We win by being the stable, secure middle layer for highly technical organizations that want to build, own and run their own agents, apps, RL and inference. We do not compete on breadth. We compete on control, extensibility and safety at production scale.

AI is multiplying the number of people who write software and the number of things they build. That makes the layer underneath them more important, not less. The **DataOS** is that layer: builders change the top of the stack as fast as they like, while the platform keeps how things run safe, governed and consistent.

Three commitments follow from this:

- **Lean into being technical.** Our platform exposes low-level primitives on purpose. That is a strength for builders, not a gap to paper over.
- **Own the middle end.** We are the stable place to test, learn, build and run, so customers never rebuild it each time the AI landscape shifts.
- **Pick our customers.** We target organizations that want more than an opinionated, all-in-one ecosystem, and those whose workloads do not fit one.

## Who we serve

Our core customer is a highly technical organization that wants to truly own and run what it builds. These teams are builders: they write their own agents, their own applications, and their own RL and inference pipelines.

They choose us because they want the primitives, not a walled garden. The DataOS gives them the lower-level building blocks, so their engineers spend their time on higher-level compositions: the agents and apps that differentiate the business, not the runtime underneath them.

Signs a prospect fits:

- They have strong engineering and platform teams and prefer to configure rather than accept defaults.
- They want to run agents and models on infrastructure and policies they control.
- They think of their stack the way they think of Kubernetes: composable, extensible, declarative.
- They have workloads, data or compliance needs that do not sit cleanly inside an opinionated vendor ecosystem.

Signs a prospect does not fit: they want one vendor to decide everything for them, and speed of adoption matters more than control.

## The market shift

When everyone becomes a coder, the platform becomes the control point. Agents and copilots let far more people ship software, and each new agent, app or program has to run safely and cohesively alongside everything else in the organization.

The AI explosion compounds in every direction at once: more functionality, more applications, more data products, more data, and more need to train on that data. It is also a revolving door. Models, frameworks and patterns arrive and fade quickly, and the right model for a task keeps changing as new releases land.

So customers will experiment more, not less. That is exactly the case for a platform. Experimentation is only cheap when the foundation under it is stable, safe and already built. Rebuilding that foundation for every new idea is waste, and helping customers avoid that waste is what we sell.

## Change-rate architecture

The DataOS is a middle end. Every stack has back ends, middle ends and front ends, and each should change at a different rate. Front ends change fastest; as you move down the stack you want less change and less risk.

&#91;embedded content: stack layers by rate of change · 3 layers\]

Customers need flexibility and extensibility, but change should happen at the topmost layer. When the AI landscape shifts, the agents and apps above us change, and the platform under them does not have to. That separation is the product.

## The DataOS pillars

The DataOS provides the pillars every program needs to live safely in a complex production world: build, test, run, protect, observe, audit and collate.

&#91;embedded content: DataOS pillars · 7 pillars on a declarative foundation\]

The first three cover the lifecycle of what builders make. The last four give the organization assurance over all of it, including a single, collated view of the activity happening across every agent, app and data product.

## Division of labor: code for what matters, config for how it runs

Data developers write code, with agents and copilots, only for the parts of the business that matter. Everything about how that code runs is expressed as low-code, config-driven declaratives in the DataOS.

| Concern | Who owns it | How it is expressed |
| --- | --- | --- |
| Business logic, agents, apps, data products | Data developers, with copilots and agents | Code, iterated quickly |
| Where and how it runs: services, paths, ports, protocols | Platform, via the DataOS | Declarative config |
| Policy, access and governance | Platform and governance teams | Declarative config |
| Quality, observability and the other non-functionals | Platform, via the DataOS | Declarative config, applied by default |

Those infrastructure details do not matter to vibe coding or building an app quickly. They are exactly what is required to run something at production scale that is safe, high quality and meets its non-functional requirements. Separating the two lets builders move fast without making production fragile.

## Competitive positioning: two plays

We will not out-build Databricks or Snowflake on breadth. They have a depth of engineering labor we will never match, and they will keep moving fast inside their opinionated ecosystems. So we pick customers deliberately and run two plays.

|  | Play 1: the configurable platform | Play 2: fast deployment beyond the big ecosystems |
| --- | --- | --- |
| Customer | Wants more than an opinionated build-and-acquire ecosystem | Needs to onboard quickly and has workloads that do not fit Databricks or Snowflake |
| What they value | Kubernetes-style configurability, flexibility and extensibility | Speed to a running system |
| What we offer | Primitives plus declarative control over how everything runs | One-click deployment runtimes for complex data products and agent ecosystems |
| Standards angle | Open, composable building blocks they can extend | Compatible APIs for the emerging agent-runtime standards from the big players |
| Why we win | Control and ownership they cannot get from a closed stack | Fast time to value without being locked into one vendor's opinions |

The two plays reinforce each other. Play 2 lands customers quickly; Play 1 is why they stay as their needs grow.

## Aligning the ecosystem with the rate of change

Our partner and integration ecosystem should mirror the change-rate architecture. Each layer gets partners suited to how fast it moves, so we can steer a customer to the right tools for what they are trying to do.

- **Front end (fastest change):** stay open and swappable. Support the models, agent frameworks, copilots and dev tools customers want this quarter, and expect that list to turn over.
- **Middle end (DataOS):** stay stable and opinionated about safety. This is where we invest most deeply and change most carefully.
- **Back end (slowest change):** integrate with the clouds, compute and storage customers already run, favoring durable, long-lived relationships.

The test for any new integration: does it let customers change the top faster without adding risk to the middle or the bottom?

## What we convey

Every pitch, demo and piece of content should land these five messages:

1. **Build the agents, not the runtime.** Your engineers should spend their time on what differentiates you. We provide the primitives and the production layer beneath it.
2. **More AI means more platform, not less.** When everyone can build, safety, security and cohesion become the constraint. The DataOS removes it.
3. **Change at the top, stability in the middle.** Experiment freely with models and agents. Never rebuild the foundation to do it.
4. **Declare how it runs.** Policy, governance, networking and non-functionals are configuration, not custom code in every project.
5. **Own it, and still move fast.** Kubernetes-style control when you want depth; one-click runtimes when you want speed.

For audiences who do not yet see why a platform matters, show it: stand up an agent, change its model, and show that policy, security and observability held without anyone touching them.

## Implications and open questions

This strategy asks us to say no more often: to prospects who want a fully opinionated stack, and to features that chase breadth rather than deepen the middle end.

What it implies:

- **Product:** invest first in the pillars and the declarative foundation; ship one-click runtimes for the most common complex data products and agent ecosystems.
- **Go-to-market:** qualify for technical ownership and non-standard workloads; lead with builder-facing demos, not feature checklists.
- **Ecosystem:** track emerging agent-runtime standards and ship compatible APIs quickly.

