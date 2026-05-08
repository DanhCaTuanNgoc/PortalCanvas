# PortalCanvas Phase 2: Visual Modeling MVP

## Goal

Build the first real modeling surface for PortalCanvas so users can represent a Portaldot contract as a graph with selectable and draggable nodes.

## What Phase 2 Delivers

- A canvas workspace for contract graphs.
- Core node types visible in the UI:
  - Contract
  - Entity
  - Storage
  - Action
  - Event
  - Permission
- Basic edges between nodes.
- Selection state for the active node.
- Inspection panel for the selected node.
- Drag interaction for repositioning nodes.

## User Value

Phase 2 gives PortalCanvas a real modeling experience. Instead of only explaining the product, the homepage now shows how a contract graph behaves in practice.

## MVP Rules

- Keep the graph understandable in a single screen.
- Keep the node set small and Portaldot-native.
- Prefer clarity over dense feature packing.
- Make every edge and panel serve contract understanding.

## Current Implementation Status

- Canvas component created.
- Nodes can be dragged.
- Nodes can be selected.
- Inspection panel shows the selected node.
- Basic connector paths are rendered between nodes.

## Phase 2 Completion Criteria

- A viewer can understand the graph without explanation.
- The canvas feels interactive, not static.
- The selected node context is visible on the right side.
- The modeling surface is stable enough to support later inspection and runtime phases.

## Next Steps After Phase 2

- Expand node creation beyond the seed graph.
- Add node add/remove controls.
- Persist graph state locally.
- Connect graph actions to runtime inspection in Phase 3 and 4.
