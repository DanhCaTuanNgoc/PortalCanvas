# PortalCanvas

PortalCanvas is a lightweight, local-first visual builder for Portaldot contracts. The product helps developers model contracts as a graph, inspect what each node does, and connect that model to runtime data from Portaldot.

## What It Is

- A visual whiteboard for Portaldot contracts.
- A lightweight inspection tool for storage, actions, events, permissions, and fees.
- A runtime-aware builder that can connect to a local node or mainnet.

## Project Structure

- `apps/web` - Next.js web app for the PortalCanvas UI.
- `portalcanvas-technical-spec.md` - Product and technical reference.
- `PHASE_0_ALIGNMENT_SCOPE.md` - Phase 0 scope and alignment notes.
- `IMPLEMENTATION_PLAN.md` - Phase-by-phase implementation roadmap.
- `PHASE_1_FOUNDATION.md` - Foundation work for the current phase.

## Local Development

Install dependencies and run the web app:

```bash
cd apps/web
npm install
npm run dev
```

Build the app for production:

```bash
cd apps/web
npm run build
```

## Product Principles

- Local-first by default.
- Portaldot-native, not EVM-shaped.
- Clear enough to explain in a demo.
- Small enough to ship quickly.

## Current Phase

Phase 1 focuses on foundation work:

- Establishing a clean repository baseline.
- Standardizing docs and setup instructions.
- Keeping the web app scaffold stable for the next feature phases.
