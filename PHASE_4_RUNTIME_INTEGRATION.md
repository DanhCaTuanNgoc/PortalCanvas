# PortalCanvas Phase 4: Runtime Integration

## Goal

Connect the modeling canvas to Portaldot runtime context so the product can show live or replayed chain state: balance, block, extrinsic, and event evidence.

## What Phase 4 Delivers

- Runtime status panel on the canvas page.
- WebSocket connection attempt to `ws://127.0.0.1:9944`.
- Clear fallback to mock runtime data when the local node is unavailable.
- Visible account, balance, nonce, block hash, extrinsic hash, and event log.
- Runtime context tied back to the selected action or node.

## User Value

Phase 4 closes the loop between graph modeling and real execution evidence. Builders can keep the contract model visible while checking whether the runtime is alive and what it produced.

## MVP Rules

- Local-first must remain the default.
- Use mock labels when the node is offline.
- Keep runtime details readable and concise.
- Do not assume EVM-style abstractions.

## Current Implementation Status

- Canvas modeling layer already exists.
- Inspection layer already shows action-level semantics.
- Next step is to surface runtime state in a dedicated panel with a connection scaffold.

## Phase 4 Completion Criteria

- The UI shows whether the local node is connected.
- The panel exposes the latest block, hashes, and balance data.
- Runtime data can be read without leaving the canvas workspace.

## Next Steps After Phase 4

- Wire real chain queries for account and block metadata.
- Update runtime feed from actual WebSocket messages.
- Connect fee estimates and event logs to live execution traces.