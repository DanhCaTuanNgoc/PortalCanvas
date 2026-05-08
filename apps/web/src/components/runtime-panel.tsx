'use client';

import { useEffect, useMemo, useState } from 'react';

import { Activity, ArrowUpRight, Blocks, Hash, Link2, Plug, PlugZap, Wallet } from 'lucide-react';

type RuntimeNodeFocus = {
  title: string;
  subtitle: string;
  permission?: string;
  reads?: string[];
  writes?: string[];
  emits?: string[];
  feeEstimate?: string;
};

type RuntimeStatus = 'connecting' | 'connected' | 'mock';

type RuntimeSnapshot = {
  endpoint: string;
  network: string;
  account: string;
  balance: string;
  nonce: string;
  latestBlock: string;
  latestBlockHash: string;
  extrinsicHash: string;
  eventLog: string[];
};

const runtimeTemplate: RuntimeSnapshot = {
  endpoint: 'ws://127.0.0.1:9944',
  network: 'Portaldot local',
  account: '5GrwvaEF5zXb26Fz9rcQpDWS57Ct...' ,
  balance: '18.4692 POT',
  nonce: '07',
  latestBlock: '#128430',
  latestBlockHash: '0x9c4f7f2a...8b71',
  extrinsicHash: '0x7fe2aa91...d4c0',
  eventLog: [
    'Mock feed loaded while the local node is offline.',
    'Runtime status keeps account, block, and hashes visible.',
    'Selected action stays aligned with the inspection panel.',
  ],
};

function StatusPill({ status }: { status: RuntimeStatus }) {
  const label = {
    connecting: 'Connecting',
    connected: 'Connected',
    mock: 'Mock feed',
  }[status];

  const toneClass = {
    connecting: 'bg-[#fff1c4]',
    connected: 'bg-[#daf4e8]',
    mock: 'bg-white',
  }[status];

  const Icon = {
    connecting: Plug,
    connected: PlugZap,
    mock: Activity,
  }[status];

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border-[3px] border-ink px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-ink shadow-[4px_4px_0_#1c293c] ${toneClass}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

function RuntimeMetric({ icon: Icon, label, value }: { icon: typeof Wallet; label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border-[3px] border-ink bg-white p-3 shadow-[4px_4px_0_#1c293c]">
      <div className="flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-secondary">
        <Icon className="h-3.5 w-3.5 text-ink" />
        {label}
      </div>
      <div className="mt-1 break-all text-sm font-black leading-6 text-ink">{value}</div>
    </div>
  );
}

function RuntimeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b-[2px] border-dashed border-ink/20 py-2 last:border-b-0 last:pb-0">
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-secondary">{label}</span>
      <span className="max-w-[62%] text-right text-sm font-black text-ink">{value}</span>
    </div>
  );
}

export function RuntimePanel({ selectedNode }: { selectedNode: RuntimeNodeFocus }) {
  const [status, setStatus] = useState<RuntimeStatus>('connecting');
  const [feed, setFeed] = useState<RuntimeSnapshot>(runtimeTemplate);

  const selectedActionTitle = useMemo(() => selectedNode.title, [selectedNode.title]);

  useEffect(() => {
    let active = true;
    let socket: WebSocket | null = null;
    const fallbackTimer = window.setTimeout(() => {
      if (!active) {
        return;
      }

      setStatus('mock');
    }, 1200);

    try {
      socket = new WebSocket(runtimeTemplate.endpoint);

      socket.onopen = () => {
        if (!active) {
          return;
        }

        window.clearTimeout(fallbackTimer);
        setStatus('connected');
        setFeed((currentFeed) => ({
          ...currentFeed,
          eventLog: [`Connected to ${runtimeTemplate.endpoint}`, ...currentFeed.eventLog],
        }));
      };

      socket.onmessage = (event) => {
        if (!active) {
          return;
        }

        const payload = typeof event.data === 'string' ? event.data.trim() : '';

        if (!payload) {
          return;
        }

        setFeed((currentFeed) => ({
          ...currentFeed,
          eventLog: [payload, ...currentFeed.eventLog].slice(0, 4),
        }));
      };

      socket.onerror = () => {
        if (!active) {
          return;
        }

        window.clearTimeout(fallbackTimer);
        setStatus('mock');
      };

      socket.onclose = () => {
        if (!active) {
          return;
        }

        window.clearTimeout(fallbackTimer);
        setStatus((currentStatus) => (currentStatus === 'connected' ? 'connected' : 'mock'));
      };
    } catch {
      window.clearTimeout(fallbackTimer);
      setStatus('mock');
    }

    return () => {
      active = false;
      window.clearTimeout(fallbackTimer);

      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    setFeed((currentFeed) => ({
      ...currentFeed,
      eventLog: [
        `Selected node: ${selectedActionTitle}`,
        `Permission: ${selectedNode.permission ?? 'n/a'}`,
        `Fee estimate: ${selectedNode.feeEstimate ?? 'pending'}`,
        ...currentFeed.eventLog.slice(0, 1),
      ].slice(0, 4),
    }));
  }, [selectedActionTitle, selectedNode.feeEstimate, selectedNode.permission]);

  return (
    <section className="rounded-[1.8rem] border-[3px] border-ink bg-white p-5 shadow-brut">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink pb-4">
        <div>
          <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Runtime layer</div>
          <div className="mt-1 text-xl font-black tracking-[-0.06em] text-ink">Local node status and chain evidence</div>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="rounded-[1.4rem] border-[3px] border-ink bg-[#fffdf6] p-4 shadow-[5px_5px_0_#1c293c]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Selected action</div>
                <div className="mt-1 text-lg font-black tracking-[-0.05em] text-ink">{selectedNode.title}</div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-ink" />
            </div>
            <div className="mt-3 text-sm leading-7 text-[#485567]">{selectedNode.subtitle} is the current focus for runtime evidence.</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <RuntimeMetric icon={Wallet} label="Account" value={feed.account} />
            <RuntimeMetric icon={Blocks} label="Endpoint" value={feed.endpoint} />
            <RuntimeMetric icon={Hash} label="Latest block" value={feed.latestBlock} />
            <RuntimeMetric icon={Link2} label="Network" value={feed.network} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.4rem] border-[3px] border-ink bg-[#e9e2ff] p-4 shadow-[5px_5px_0_#1c293c]">
            <div className="grid gap-3 sm:grid-cols-2">
              <RuntimeLine label="Balance" value={feed.balance} />
              <RuntimeLine label="Nonce" value={feed.nonce} />
              <RuntimeLine label="Extrinsic hash" value={feed.extrinsicHash} />
              <RuntimeLine label="Block hash" value={feed.latestBlockHash} />
            </div>
          </div>

          <div className="rounded-[1.4rem] border-[3px] border-ink bg-white p-4 shadow-[5px_5px_0_#1c293c]">
            <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Event log</div>
            <div className="mt-3 space-y-3">
              {feed.eventLog.map((entry) => (
                <div key={entry} className="rounded-xl border-[3px] border-ink bg-[#fffdf6] px-3 py-2 text-sm font-bold leading-6 text-ink shadow-[4px_4px_0_#1c293c]">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
