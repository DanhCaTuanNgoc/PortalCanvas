# PortalCanvas Phase 3: Inspection Layer

## Goal

Let users explain what an action node does in contract terms: who can call it, what it reads or writes, which events it emits, and what fee estimate it implies.

## What Phase 3 Delivers

- Action-focused inspection panel.
- Visible caller permission for action nodes.
- Storage reads and writes tied to the selected action.
- Emitted events shown directly in the inspector.
- Fee estimate surfaced as a first-class UI value.

## User Value

Phase 3 turns the graph from a visual model into an explanation layer. Builders can point at an action node and explain the contract flow without switching context.

## MVP Rules

- Keep the inspector concise and readable.
- Show only the most important contract semantics first.
- Prefer structured data over paragraph-heavy copy.
- Make action details feel native to the graph, not a separate tool.

## Current Implementation Status

- Action nodes already exist in the canvas.
- The inspector can display the selected node context.
- The next step is to enrich action nodes with permission, reads, writes, events, and fee metadata.

## Phase 3 Completion Criteria

- An action node clearly explains who can call it.
- A viewer can see the storage touched by that action.
- Emitted events and fee estimate are visible without leaving the canvas.

## Next Steps After Phase 3

- Connect the inspector to runtime data sources.
- Add fee estimation and live trace input.
- Make the action panel responsive to selected action type.