'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  BaseEdge,
  Background,
  Controls,
  EdgeLabelRenderer,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  getBezierPath,
  useReactFlow,
  useNodesInitialized,
  type Edge,
  type EdgeProps,
  type EdgeTypes,
  type Node,
  type NodeProps,
  type NodeTypes,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { ChevronRight, Link2, Maximize2, Move3D, Plus, Workflow } from 'lucide-react';

import { RuntimePanel } from './runtime-panel';

type CanvasNodeType = 'contract' | 'entity' | 'storage' | 'action' | 'event' | 'permission';
type WhiteboardNodeType = 'whiteboard';

type CanvasNode = {
  id: string;
  type: CanvasNodeType;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  accent: 'yellow' | 'purple' | 'mint' | 'white';
  details: string[];
  inputs?: string[];
  outputs?: string[];
  permission?: string;
  reads?: string[];
  writes?: string[];
  emits?: string[];
  feeEstimate?: string;
};

type CanvasNodeData = CanvasNode;
type CanvasEdgeData = {
  label: string;
};

const nodeToneClass: Record<CanvasNode['accent'], string> = {
  yellow: 'bg-primary-soft',
  purple: 'bg-[#e9e2ff]',
  mint: 'bg-[#daf4e8]',
  white: 'bg-white',
};

const seedNodes: CanvasNode[] = [
  {
    id: 'contract',
    type: 'contract',
    title: 'PortalPassContract',
    subtitle: 'Contract node',
    x: 96,
    y: 152,
    accent: 'yellow',
    details: ['Network: local', 'Address: pending deploy', 'Gas token: POT'],
    outputs: ['Action nodes', 'Storage graph', 'Fee inspector'],
  },
  {
    id: 'entity',
    type: 'entity',
    title: 'Builder',
    subtitle: 'Entity node',
    x: 420,
    y: 88,
    accent: 'white',
    details: ['wallet: AccountId', 'name: String', 'reputation: u32'],
    outputs: ['Storage mapping', 'UI screen'],
  },
  {
    id: 'storage',
    type: 'storage',
    title: 'builders: Mapping',
    subtitle: 'Storage node',
    x: 470,
    y: 314,
    accent: 'mint',
    details: ['Key type: AccountId', 'Value type: Builder', 'Reads: createEvent()'],
    inputs: ['Builder entity'],
    outputs: ['Action node', 'Runtime trace'],
  },
  {
    id: 'action',
    type: 'action',
    title: 'createEvent(name, startTime)',
    subtitle: 'Action node',
    x: 820,
    y: 184,
    accent: 'purple',
    details: ['Caller: Organizer', 'Reads: builders, nextEventId', 'Emits: EventCreated'],
    inputs: ['Permission node', 'Storage node'],
    outputs: ['Event node', 'Fee inspector'],
    permission: 'Organizer',
    reads: ['builders', 'nextEventId'],
    writes: ['events', 'eventCount'],
    emits: ['EventCreated'],
    feeEstimate: '0.00042 POT',
  },
  {
    id: 'event',
    type: 'event',
    title: 'EventCreated',
    subtitle: 'Event node',
    x: 1136,
    y: 92,
    accent: 'white',
    details: ['Fields: eventId, name, startTime', 'Observed in latest block', 'Linked to action execution'],
    inputs: ['Action node'],
  },
  {
    id: 'permission',
    type: 'permission',
    title: 'Organizer',
    subtitle: 'Permission node',
    x: 1118,
    y: 336,
    accent: 'yellow',
    details: ['Allowed to create events', 'Controls action access', 'Explains who can call'],
    outputs: ['Action node'],
  },
];

const seedEdges: Edge[] = [
  { id: 'contract-entity', source: 'contract', target: 'entity', label: 'models', type: 'custom', data: { label: 'models' } },
  { id: 'contract-storage', source: 'contract', target: 'storage', label: 'owns', type: 'custom', data: { label: 'owns' } },
  { id: 'storage-action', source: 'storage', target: 'action', label: 'read/write', type: 'custom', data: { label: 'read/write' } },
  { id: 'permission-action', source: 'permission', target: 'action', label: 'gates', type: 'custom', data: { label: 'gates' } },
  { id: 'action-event', source: 'action', target: 'event', label: 'emits', type: 'custom', data: { label: 'emits' } },
  { id: 'action-contract', source: 'action', target: 'contract', label: 'belongs to', type: 'custom', data: { label: 'belongs to' } },
];

const initialNodes: Node<CanvasNodeData, WhiteboardNodeType>[] = seedNodes.map((node) => ({
  id: node.id,
  type: 'whiteboard',
  position: { x: node.x, y: node.y },
  data: node,
}));

const nodeTypes: NodeTypes = {
  whiteboard: WhiteboardNode,
};

const edgeTypes: EdgeTypes = {
  custom: CanvasEdge,
};

function CanvasEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<Edge<CanvasEdgeData>>) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.18,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        className="stroke-[#1c293c]"
        style={{ stroke: '#1c293c', strokeWidth: 3.5, strokeDasharray: '10 8', fill: 'none' }}
      />
      <EdgeLabelRenderer>
        <div
          className="pointer-events-none absolute rounded-full border-[3px] border-ink bg-white px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-secondary shadow-[4px_4px_0_#1c293c]"
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
        >
          {data?.label ?? 'link'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

function WhiteboardNode({ data, selected, dragging }: NodeProps<Node<CanvasNodeData, WhiteboardNodeType>>) {
  const accent = data.accent as CanvasNode['accent'];

  return (
    <div
      className={`relative w-[14rem] rounded-[1.35rem] border-[3px] border-ink p-3.5 text-left shadow-brut ${dragging ? 'cursor-grabbing ring-4 ring-[#432dd7]/20' : 'cursor-grab'} ${selected ? 'ring-4 ring-[#432dd7]/15' : ''} ${nodeToneClass[accent]}`}
    >
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !border-2 !border-ink !bg-white" />
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !border-2 !border-ink !bg-primary" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-secondary">{data.subtitle}</div>
          <div className="mt-1.5 text-base font-black leading-tight tracking-[-0.05em] text-ink">{data.title}</div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border-[3px] border-ink bg-white shadow-[4px_4px_0_#1c293c]">
          <Workflow className="h-3.5 w-3.5 text-ink" />
        </div>
      </div>

      <div className="mt-3.5 space-y-1.5">
        {data.details.map((detail: string) => (
          <div key={detail} className="rounded-xl border-2 border-ink bg-white/75 px-2.5 py-1.5 text-[0.8rem] font-bold leading-5 text-ink shadow-[3px_3px_0_#1c293c]">
            {detail}
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3 text-[0.6rem] font-black uppercase tracking-[0.22em] text-secondary">
        <span>{data.type}</span>
        <span className="inline-flex items-center gap-1">
          Drag <Move3D className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

function CanvasViewportSync({ viewportVersion }: { viewportVersion: number }) {
  const { fitView } = useReactFlow();
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    if (!nodesInitialized) {
      return;
    }

    fitView({ padding: 0.35, duration: 250, includeHiddenNodes: false });
  }, [fitView, nodesInitialized, viewportVersion]);

  return null;
}

function CanvasZoomControls() {
  const { zoomIn, zoomOut, fitView, getZoom } = useReactFlow();

  return (
    <div className="pointer-events-auto absolute left-5 bottom-5 z-20 flex items-center gap-2 rounded-[1.1rem] border-[3px] border-ink bg-white p-2 shadow-[5px_5px_0_#1c293c]">
      <button
        type="button"
        onClick={() => zoomOut({ duration: 180 })}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-[3px] border-ink bg-[#fffdf6] text-lg font-black text-ink transition hover:-translate-x-0.5 hover:-translate-y-0.5"
        aria-label="Zoom out"
        title="Zoom out"
      >
        -
      </button>
      <button
        type="button"
        onClick={() => fitView({ padding: 0.35, duration: 250, includeHiddenNodes: false })}
        className="inline-flex h-10 min-w-20 items-center justify-center rounded-xl border-[3px] border-ink bg-primary px-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-x-0.5 hover:-translate-y-0.5"
        aria-label="Fit graph to view"
        title="Fit graph to view"
      >
        {Math.round(getZoom() * 100)}%
      </button>
      <button
        type="button"
        onClick={() => zoomIn({ duration: 180 })}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-[3px] border-ink bg-[#fffdf6] text-lg font-black text-ink transition hover:-translate-x-0.5 hover:-translate-y-0.5"
        aria-label="Zoom in"
        title="Zoom in"
      >
        +
      </button>
    </div>
  );
}

export function ModelingCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(seedEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(seedNodes[0].id);
  const [viewportVersion, setViewportVersion] = useState(0);
  const canvasShellRef = useRef<HTMLDivElement | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((node: Node<CanvasNodeData, WhiteboardNodeType>) => node.id === selectedNodeId)?.data ?? seedNodes[0],
    [nodes, selectedNodeId],
  );

  const handleNodeClick = (_: unknown, node: Node<CanvasNodeData, WhiteboardNodeType>) => {
    setSelectedNodeId(node.id);
  };

  const handleNodeDragStop = (_: unknown, node: Node<CanvasNodeData, WhiteboardNodeType>) => {
    setSelectedNodeId(node.id);
  };

  useEffect(() => {
    const shellElement = canvasShellRef.current;

    if (!shellElement) {
      return;
    }

    const observer = new ResizeObserver(() => {
      setViewportVersion((currentVersion) => currentVersion + 1);
    });

    observer.observe(shellElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="rounded-[2rem] border-[3px] border-ink bg-[#fffdf6] p-3 shadow-brut-lg md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink pb-3">
        <div>
          <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Visual modeling layer</div>
          <div className="mt-1 text-2xl font-black tracking-[-0.06em] text-ink">Contract graph workspace</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-secondary">
          <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-3 py-1.5 shadow-[4px_4px_0_#1c293c]">
            <Plus className="h-3.5 w-3.5" />
            Add nodes next
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-primary px-3 py-1.5 shadow-[4px_4px_0_#1c293c]">
            <Link2 className="h-3.5 w-3.5" />
            6 edges mapped
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 xl:flex-row">
        <div ref={canvasShellRef} className="relative h-[44rem] flex-1 overflow-hidden rounded-[1.8rem] border-[3px] border-ink bg-white xl:h-[50rem]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            onNodeDragStop={handleNodeDragStop}
            fitView
            fitViewOptions={{ padding: 0.35 }}
            minZoom={0.35}
            maxZoom={1.6}
            snapToGrid
            snapGrid={[16, 16]}
            panOnScroll
            zoomOnPinch
            onlyRenderVisibleElements
            proOptions={{ hideAttribution: true }}
            className="h-full"
          >
            <CanvasViewportSync viewportVersion={viewportVersion} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundColor: '#ffffff',
                backgroundImage:
                  'linear-gradient(rgba(28,41,60,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(28,41,60,0.16) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                backgroundPosition: '-1px -1px',
              }}
            />
            <MiniMap
              className="!rounded-[1rem] !border-[3px] !border-ink !bg-white !shadow-[4px_4px_0_#1c293c]"
              nodeColor={(node: Node<CanvasNodeData, WhiteboardNodeType>) => {
                const accent = node.data?.accent as CanvasNode['accent'] | undefined;

                if (accent === 'purple') return '#e9e2ff';
                if (accent === 'mint') return '#daf4e8';
                if (accent === 'yellow') return '#fff1c4';
                return '#ffffff';
              }}
              maskColor="rgba(28,41,60,0.16)"
            />
            <div className="pointer-events-none absolute left-5 top-5 z-[1000] flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.2em] text-secondary shadow-[4px_4px_0_#1c293c]">
              Drag, zoom, pan like a diagram
              <Maximize2 className="h-3.5 w-3.5 text-ink" />
            </div>
            <div className="pointer-events-none absolute right-5 top-5 z-[1000] rounded-full border-[3px] border-ink bg-primary px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.2em] text-ink shadow-[4px_4px_0_#1c293c]">
              Flow-based canvas
            </div>
            <CanvasZoomControls />
          </ReactFlow>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-4 pr-1 xl:w-[36rem] xl:h-[50rem] xl:overflow-y-auto">
          <aside className="rounded-[1.8rem] border-[3px] border-ink bg-white p-4 shadow-brut md:p-5">
          <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink pb-4">
            <div>
              <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Inspection panel</div>
              <div className="mt-1 text-xl font-black tracking-[-0.06em] text-ink">Selected node details</div>
            </div>
            <ChevronRight className="h-5 w-5 text-ink" />
          </div>

          <div className="mt-5 rounded-[1.4rem] border-[3px] border-ink bg-primary-soft p-4 shadow-[5px_5px_0_#1c293c]">
            <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Node type</div>
            <div className="mt-1 text-2xl font-black tracking-[-0.06em] text-ink">{selectedNode.title}</div>
            <p className="mt-3 text-sm leading-7 text-[#485567]">
              {selectedNode.subtitle} focused on Portaldot-native modeling. This node is part of the current MVP graph and can be repositioned on the canvas.
            </p>
          </div>

            {selectedNode.type === 'action' ? (
              <div className="mt-5 grid gap-3 rounded-[1.4rem] border-[3px] border-ink bg-[#fffdf6] p-4 shadow-[5px_5px_0_#1c293c]">
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Action summary</div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border-[3px] border-ink bg-white px-3 py-2 shadow-[4px_4px_0_#1c293c]">
                    <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-secondary">Permission</div>
                    <div className="mt-1 text-sm font-black text-ink">{selectedNode.permission ?? 'Unknown'}</div>
                  </div>
                  <div className="rounded-xl border-[3px] border-ink bg-white px-3 py-2 shadow-[4px_4px_0_#1c293c]">
                    <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-secondary">Fee estimate</div>
                    <div className="mt-1 text-sm font-black text-ink">{selectedNode.feeEstimate ?? 'Pending'}</div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-secondary">Reads</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedNode.reads?.map((item) => (
                        <span key={item} className="rounded-full border-[3px] border-ink bg-white px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#1c293c]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-secondary">Writes</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedNode.writes?.map((item) => (
                        <span key={item} className="rounded-full border-[3px] border-ink bg-white px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#1c293c]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-secondary">Emits</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedNode.emits?.map((item) => (
                        <span key={item} className="rounded-full border-[3px] border-ink bg-[#e9e2ff] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#1c293c]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

          <div className="mt-5 space-y-4">
            <div>
              <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Node facts</div>
              <div className="mt-3 space-y-2">
                {selectedNode.details.map((detail: string) => (
                  <div key={detail} className="rounded-xl border-[3px] border-ink bg-[#fffdf6] px-3 py-2 text-sm font-bold text-ink shadow-[4px_4px_0_#1c293c]">
                    {detail}
                  </div>
                ))}
              </div>
            </div>

            {selectedNode.inputs && selectedNode.inputs.length > 0 ? (
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Inputs</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedNode.inputs.map((input: string) => (
                    <span key={input} className="rounded-full border-[3px] border-ink bg-white px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#1c293c]">
                      {input}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedNode.outputs && selectedNode.outputs.length > 0 ? (
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Outputs</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedNode.outputs.map((output: string) => (
                    <span key={output} className="rounded-full border-[3px] border-ink bg-[#e9e2ff] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#1c293c]">
                      {output}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </aside>

        <RuntimePanel selectedNode={selectedNode} />
        </div>
      </div>
    </section>
  );
}