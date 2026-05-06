# PortalCanvas Technical Specification

## 1. Product Summary

PortalCanvas is a lightweight visual BUIDL tool for managing Portaldot contracts on a whiteboard.
It helps developers understand, inspect, and operate a contract through connected nodes
that represent contracts, entities, storage, actions, events, permissions, fee data,
accounts, networks, and runtime results.

Instead of treating a contract as scattered code, scripts, and terminal output, a developer
models it visually as a graph. PortalCanvas keeps the model readable and operational by
showing the important technical details in one place.

Short pitch:

> PortalCanvas lets developers visualize Portaldot contracts as a graph, then inspect
> parameters, permissions, storage, events, and POT fee data from that model.

## 2. Problem

Portaldot is a native Substrate/Rust/ink! ecosystem. That gives strong technical
capabilities, but it also creates onboarding friction for many builders:

- They need to understand contract storage design before writing code.
- They need to map product concepts into ink! structs, mappings, actions, and events.
- They need to track POT fees, transaction hashes, and block inclusion manually.
- They need to understand how a contract changes storage, emits events, and consumes POT.
- They need to prepare a clear demo and README for hackathon submission.

PortalCanvas solves this by making the contract model visible first, then surfacing the
runtime and fee information from that model.

## 3. Target Users

- Hackathon builders who need to build a runnable Portaldot MVP quickly.
- Web2 developers learning native Portaldot development.
- Rust/ink! developers who want a better way to inspect contract structure.
- Teams building identity, payment, DAO, gaming asset, or workflow prototypes.

## 4. Portaldot Context

PortalCanvas should explicitly support Portaldot's native environment:

- Chain endpoint: `wss://mainnet.portaldot.io`
- Local endpoint: `ws://127.0.0.1:9944`
- SS58 format: `42`
- Gas token: `POT`
- Token decimals: `14`
- Smart contract model: Rust/ink!
- SDK path: Python `substrate-interface` / Portaldot SDK examples

The product must avoid EVM assumptions. It should show native concepts such as extrinsics,
contract calls, block inclusion, storage queries, events, permissions, and POT fee inspection.

## 5. Core Product Concept

PortalCanvas must stay lightweight. It is not a cloud platform, hosted IDE, SaaS dashboard,
or enterprise deployment system. The product should feel like a small local-first builder tool
that helps developers understand and operate Portaldot contracts quickly.

PortalCanvas has three layers:

1. Visual modeling layer
   - Whiteboard/canvas where users model contracts as connected nodes.

2. Inspection layer
   - Shows parameters, permissions, storage reads and writes, event outputs, and fee estimates.

3. Runtime layer
   - Connects to Portaldot/local node and mirrors real execution data such as balances,
     block hashes, extrinsic hashes, storage values, and event logs.

## 6. Whiteboard Node System

### 6.1 Contract Node

Represents one smart contract.

Example:

```txt
PortalPassContract
```

Fields:

- contract name
- owner/admin account
- network profile: local or mainnet
- deployed address
- deployment transaction hash
- gas token: POT
- linked storage nodes
- linked action nodes
- linked fee inspector nodes

### 6.2 Entity Node

Represents a domain object used by the contract.

Examples:

- `Builder`
- `Event`
- `Badge`
- `PaymentRequest`
- `Proposal`
- `GameAsset`

Example fields:

```txt
Builder
- wallet: AccountId
- name: String
- reputation: u32
- createdAt: u64
```

Supported MVP field types:

- `AccountId`
- `String`
- `u32`
- `u64`
- `bool`

### 6.3 Storage Node

Represents onchain storage.

Examples:

```txt
builders: Mapping<AccountId, Builder>
events: Mapping<u32, Event>
badges: Mapping<u32, Badge>
nextEventId: u32
```

The storage node should show:

- key type
- value type
- default value if applicable
- related entity
- read/write actions
- whether the node is read by a UI or action node

### 6.4 Action Node

Represents a callable contract method.

Examples:

- `createEvent(name, startTime)`
- `checkIn(eventId)`
- `issueBadge(builder, badgeType)`
- `createPaymentRequest(amount, memo)`
- `payRequest(requestId)`

Each action node should show:

- input parameters
- caller permission
- storage reads
- storage writes
- emitted events
- estimated POT fee
- latest transaction hash after execution
- latest block hash after inclusion

### 6.5 Event Node

Represents a contract event.

Examples:

- `EventCreated`
- `AttendanceClaimed`
- `BadgeIssued`
- `PaymentRequestPaid`
- `VoteCast`

Each event node should show:

- event fields
- source action
- latest emitted values
- block number/hash when observed

### 6.6 Permission Node

Represents access control.

Examples:

- `OnlyOwner`
- `Organizer`
- `PublicUser`
- `BadgeIssuer`

Each permission node connects to action nodes and explains who can call them.

### 6.7 Fee Inspector Node

Represents fee information for a selected action or deployment.

Shows:

- estimated fee in POT
- actual fee in POT
- account balance before
- account balance after
- extrinsic hash
- block hash

### 6.8 Network And Account Node

Represents the active network and account context.

Shows:

- selected network
- websocket endpoint
- latest block
- connected account
- free balance
- nonce
- token name: POT
- decimals: 14

### 6.9 UI Screen Node

Represents a generated or planned UI screen.

Examples:

- `Builder Profile Page`
- `Organizer Dashboard`
- `Check-in Form`
- `Payment Request Page`
- `Contract Admin Panel`

Each UI node connects to:

- actions it can execute
- storage it reads
- events it displays

## 7. Example Graph

PortalPass graph:

```txt
[Organizer Role] ---> can call ---> [createEvent Action]
                                      |
                                      +-- writes --> [events Mapping]
                                      |
                                      +-- emits --> [EventCreated Event]

[Builder Profile UI] ---> reads ---> [builders Mapping]

[Organizer Role] ---> can call ---> [issueBadge Action]
                                      |
                                      +-- writes --> [badges Mapping]
                                      |
                                      +-- updates --> [builders Mapping]
                                      |
                                      +-- emits --> [BadgeIssued Event]
                                      |
                                      +-- measured by --> [POT Fee Inspector]
```

Check-in flow:

```txt
[Check-in UI]
    |
    v
[checkIn(eventId)]
    |
    +-- updates --> [attendance Mapping]
    |
    +-- emits --> [AttendanceClaimed Event]
    |
    +-- measured by --> [POT Fee Inspector]
```

## 8. Main Features To Show

### 8.1 Visual Contract Whiteboard

The user can create and connect nodes on a canvas:

- contract node
- entity nodes
- storage nodes
- action nodes
- event nodes
- permission nodes
- fee inspector nodes
- network/account node
- UI screen nodes

MVP can start with a fixed template graph and limited editing, then expand later.

### 8.2 Model Inspector

Clicking a node opens a side panel showing its schema.

Example for `Badge`:

```txt
Entity: Badge
id: u32
title: String
issuer: AccountId
holder: AccountId
issuedAt: u64
```

### 8.3 Contract Preview

PortalCanvas shows contract structure previews, node summaries, and optional generated ink!
snippets.

Optional generated files:

```txt
contracts/portalpass/lib.rs
contracts/portalpass/Cargo.toml
frontend/src/generated/types.ts
scripts/deploy.py
scripts/call_issue_badge.py
scripts/watch_events.py
```

### 8.4 Deployment Console

A terminal-like panel shows connection and action logs.

Example:

```txt
Connecting to ws://127.0.0.1:9944
Using ss58_format: 42
Gas token: POT
Preparing action...
Extrinsic submitted
Included in block: 0xdef...
```

### 8.5 POT Fee Inspector

Shows fee estimates and actual transaction results.

Example:

```txt
Action: issueBadge(builder, badgeId)
Estimated fee: 0.0312 POT
Actual fee: 0.0308 POT
Balance before: 18.5000 POT
Balance after: 18.4692 POT
```

### 8.6 Contract Action Panel

PortalCanvas generates forms from action nodes.

Example actions:

- `createEvent(name, startTime)`
- `checkIn(eventId)`
- `issueBadge(builder, badgeType)`
- `getBuilderProfile(wallet)`

The user enters parameters, executes the action, and sees tx result.

### 8.7 Event Stream

Realtime or simulated event stream.

Example:

```txt
Block #128812
EventCreated(id=1, name="Demo Day")
AttendanceClaimed(eventId=1, account=5F...)
BadgeIssued(account=5F..., badge="MVP Submitted")
```

### 8.8 Storage Browser

Shows contract state in table form.

Example:

| Key | Value |
| --- | --- |
| builders[5F...] | reputation: 30 |
| badges[1] | MVP Submitted |
| events[1] | Demo Day |

### 8.9 Report Generator

Generates a README/demo report.

Example output:

```md
Project: PortalPass
Network: Portaldot
Contract Address: 5G...
Gas Token: POT
Transactions:
- deploy: 0x...
- createEvent: 0x...
- issueBadge: 0x...
Open-source contract: contracts/portalpass/lib.rs
```

### 8.10 Error Explainer

Translates common failures into actionable messages.

Example:

```txt
Extrinsic failed: InsufficientBalance
Reason: account does not have enough POT for fee + value.
Suggested fix: top up account or reduce transaction amount.
```

## 9. MVP Scope

The first MVP should be intentionally narrow.

Must have:

- Visual whiteboard with a PortalPass template graph.
- Node inspector side panel.
- Network/account panel.
- POT fee inspector UI.
- Contract action form UI.
- Event stream UI.
- Storage browser UI.
- Report generator preview.
- Optional contract snippet preview.

Should have:

- Export graph as JSON.
- Import graph from JSON.
- Generate a static contract summary from the graph.

Nice to have:

- Real deploy/call integration.
- Realtime storage subscription.
- Multiple editable templates.
- CLI command support.

Out of scope for MVP:

- Full visual programming language.
- Arbitrary Rust code generation.
- Multi-chain support.
- EVM support.
- Production wallet infrastructure.
- Cloud project hosting.
- User accounts, teams, billing, or organization management.
- Hosted CI/CD pipelines.
- Managed contract infrastructure.
- Enterprise monitoring.
- Full block explorer.
- Complex AI agent workflows.

## 10. Recommended MVP Implementation Strategy

### Phase 1: Static Product Demo

Goal: prove the visual contract-management concept.

Build:

- React canvas/whiteboard view.
- Hardcoded PortalPass graph.
- Node inspector.
- Contract/action/event/storage panels.
- Mock transaction logs and POT fee values.
- Report preview.

This phase is useful for pitch and UI validation.

### Phase 2: Runtime Integration

Goal: connect to Portaldot.

Build:

- Python SDK scripts for account query, fee info, extrinsic submission.
- Event watcher.
- Storage query helper.
- UI hooks to display runtime results.

## 11. Data Model Schema

PortalCanvas graph can be represented as JSON.

Example:

```json
{
  "app": "PortalPass",
  "network": {
    "name": "Portaldot Mainnet",
    "endpoint": "wss://mainnet.portaldot.io",
    "ss58Format": 42,
    "token": "POT",
    "decimals": 14
  },
  "nodes": [
    {
      "id": "entity-builder",
      "type": "entity",
      "name": "Builder",
      "fields": [
        { "name": "wallet", "type": "AccountId" },
        { "name": "name", "type": "String" },
        { "name": "reputation", "type": "u32" }
      ]
    },
    {
      "id": "action-issue-badge",
      "type": "action",
      "name": "issueBadge",
      "params": [
        { "name": "holder", "type": "AccountId" },
        { "name": "badgeType", "type": "String" }
      ],
      "permission": "Organizer"
    }
  ],
  "edges": [
    {
      "from": "action-issue-badge",
      "to": "entity-builder",
      "type": "updates"
    }
  ]
}
```

## 12. Architecture

### Frontend

Recommended stack:

- React
- TypeScript
- Tailwind CSS
- React Flow or custom canvas for node graph
- Zustand or React state for graph state

Main UI modules:

- `WhiteboardCanvas`
- `NodeInspector`
- `SummaryPanel`
- `DeploymentConsole`
- `FeeInspector`
- `ActionPanel`
- `EventStream`
- `StorageBrowser`
- `ReportPreview`

### Runtime

Recommended runtime path:

- Python scripts using `substrate-interface`
- React calls backend/local script runner later if needed
- For early MVP, use mock runtime data with clear labels

Runtime actions:

- connect network
- query account balance
- estimate fee
- watch events
- query storage

## 13. Demo Flow

Best demo flow:

1. Open PortalCanvas.
2. Select `PortalPass` template.
3. Whiteboard shows contract graph: `Builder`, `Event`, `Badge`, storage, actions, events,
   permissions, and fee nodes.
4. Click `issueBadge` action.
5. Inspector shows parameters, permissions, storage writes, emitted event, and estimated POT fee.
6. Open deployment console and show connection to Portaldot/local node.
7. Execute or simulate a contract action from the action panel.
8. Fee inspector updates with tx hash, block hash, estimated fee, actual fee.
9. Event stream shows `BadgeIssued`.
10. Storage browser shows builder reputation updated.
11. Generate README/demo report.

## 14. Hackathon Fit

PortalCanvas fits the Builder Tools for Portaldot track.

Alignment:

- Clear developer pain point: native Portaldot onboarding and contract workflow friction.
- Useful lightweight tool: visual modeling, contract inspection, fee inspection,
  event/storage debugging, and demo reporting.
- Strong Portaldot relevance: native ink!, Substrate-style extrinsics, Portaldot endpoint,
  POT gas, storage/events.
- Demo-ready: visual product flow plus runtime evidence and report output.
- Appropriate scope: focused on runnable MVPs and clear demos, not production cloud infrastructure.

## 15. Feasibility

### Static visual MVP

Feasibility: high.

Estimated time:

- Solo: 4-7 days
- Two-person team: 2-4 days

### Runtime integration MVP

Feasibility: medium.

Estimated time:

- Solo: 5-10 additional days
- Two-person team: 3-7 additional days

Primary risk is environment setup and contract deployment reliability.

## 16. Risks And Mitigations

### Risk: Whiteboard becomes only decorative

Mitigation:

- Every node should map to a visible runtime detail or report output.
- Action nodes must connect to forms, fee inspector, events, and storage changes.

### Risk: Portaldot runtime integration is unstable

Mitigation:

- Support local node first.
- Keep runtime scripts separate from UI.
- Provide mock runtime mode for demo fallback.

### Risk: Scope becomes too large

Mitigation:

- Start with one template: PortalPass.
- Keep editing limited in MVP.
- Avoid arbitrary Rust generation.

## 17. Success Criteria

MVP is successful if a user can:

- See a contract modeled visually as nodes.
- Understand entities, storage, actions, events, permissions, and UI flows.
- Click a node and inspect its schema.
- View POT fee estimates clearly.
- Execute or simulate a contract action.
- See event and storage changes after the action.
- Generate a demo-ready report.

Stronger version is successful if it can:

- Connect to a Portaldot/local node.
- Query account balance.
- Estimate real fees.
- Submit at least one real extrinsic or contract call.
- Record tx hash and block hash.

## 18. Product Positioning

PortalCanvas should not be positioned as just a CLI or a landing page.

It should also not be positioned as a cloud platform.

It should be positioned as:

> A lightweight visual BUIDL tool for managing and understanding native Portaldot contracts.

Main promise:

> Start from a graph. Inspect the contract. Execute or simulate actions. Review POT fees,
> events, and storage. Ship a demo-ready Portaldot MVP.

Positioning guardrail:

> Keep PortalCanvas local-first, prototype-focused, and hackathon-friendly. Do not expand it
> into project hosting, managed infrastructure, team management, billing, or a broad cloud platform.