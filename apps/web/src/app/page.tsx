import type { ComponentType, ReactNode } from 'react';

import { ArrowRight, ArrowUpRight, Bot, Boxes, Clock3, Code2, FileText, Layers3, MonitorSmartphone, Sparkles, SquareTerminal, Target, TriangleAlert, Workflow } from 'lucide-react';

import { LazySection } from '../components/lazy-section';

const statCards = [
  { label: 'Contract nodes', value: '12+', detail: 'Model contracts, entities, storage, actions, and events as one graph.' },
  { label: 'Runtime views', value: '03', detail: 'Local node, mainnet, and replay modes keep inspection grounded.' },
  { label: 'POT aware', value: '14', detail: 'Fee inspection keeps balance, block, and extrinsic data visible.' },
];

const featureCards = [
  {
    icon: Workflow,
    title: 'Whiteboard graph modeling',
    body: 'PortalCanvas gives every contract a structure-first canvas: nodes, connectors, labels, and live metadata stay visible instead of hidden in docs.',
  },
  {
    icon: SquareTerminal,
    title: 'Inspection layer',
    body: 'Show storage reads, permissions, events, and fee estimates in the same view so builders can explain a contract without switching tools.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Runtime layer',
    body: 'Mirror Portaldot execution data from the local node or mainnet so the canvas reflects real balances, hashes, and block inclusion.',
  },
  {
    icon: Code2,
    title: 'Native Portaldot model',
    body: 'Keep the product grounded in native Substrate concepts: extrinsics, contract calls, storage queries, events, and permission nodes.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Model the contract',
    detail: 'Start with a contract node, wire entities and storage, then define the actions and permissions that shape behavior.',
  },
  {
    step: '02',
    title: 'Inspect the runtime',
    detail: 'Attach fee, event, and account nodes to see what the selected action consumes, emits, and changes onchain.',
  },
  {
    step: '03',
    title: 'Demo and ship',
    detail: 'Use the canvas to explain the product clearly in a hackathon review, then extend it with live Portaldot data.',
  },
];

const proofCards = [
  {
    icon: Sparkles,
    title: 'Local-first by default',
    detail: 'Designed around ws://127.0.0.1:9944 so the MVP stays simple to run, inspect, and demo.',
  },
  {
    icon: Target,
    title: 'No EVM assumptions',
    detail: 'Every label, node, and panel reflects native Portaldot concepts instead of generic blockchain abstractions.',
  },
  {
    icon: Boxes,
    title: 'Readable under pressure',
    detail: 'Thick borders, bold blocks, and offset shadows keep the interface legible in a crowded hackathon setting.',
  },
  {
    icon: TriangleAlert,
    title: 'Safety stays visible',
    detail: 'Permissions, fee data, and state changes are surfaced as first-class UI objects instead of hidden details.',
  },
];

const communityTestimonials = [
  {
    name: 'Mina Tran',
    role: 'Smart contract designer',
    quote: 'The graph view made Portaldot concepts understandable in one scan. It feels like a real builder tool, not a slide.',
  },
  {
    name: 'Jordan Lee',
    role: 'Hackathon judge',
    quote: 'The runtime proof and fee inspector give the demo actual credibility. It is easy to see what changed and why.',
  },
  {
    name: 'Linh Nguyen',
    role: 'Frontend engineer',
    quote: 'The local-first layout and bold visuals made the product easy to explain to teammates who are new to Portaldot.',
  },
  {
    name: 'Arif Santos',
    role: 'Protocol builder',
    quote: 'The community strip adds social proof without feeling generic. The horizontal motion keeps the section alive.',
  },
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] shadow-brut">
        {eyebrow}
      </div>
      <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.06em] text-ink md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#485567] md:text-lg">
        {description}
      </p>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border-[3px] border-ink bg-white px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] shadow-brut">
      {children}
    </div>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-[1.5rem] border-[3px] border-ink bg-white p-4 shadow-brut">
      <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">{label}</div>
      <div className="mt-2 text-3xl font-black tracking-[-0.06em] text-ink">{value}</div>
      <p className="mt-3 text-sm leading-6 text-[#556171]">{detail}</p>
    </article>
  );
}

function FeatureCard({ icon: Icon, title, body }: { icon: ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <article className="rounded-[1.8rem] border-[3px] border-ink bg-[#fffdf6] p-5 shadow-brut transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brut-lg">
      <div className="inline-flex rounded-2xl border-[3px] border-ink bg-primary-soft p-3 shadow-[5px_5px_0_#1c293c]">
        <Icon className="h-5 w-5 text-ink" />
      </div>
      <h3 className="mt-5 text-xl font-black tracking-[-0.05em] text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#485567]">{body}</p>
    </article>
  );
}

function NodePill({ title, detail, tone }: { title: string; detail: string; tone: 'white' | 'yellow' | 'purple' | 'mint' }) {
  const toneClass = {
    white: 'bg-white',
    yellow: 'bg-primary-soft',
    purple: 'bg-[#e9e2ff]',
    mint: 'bg-[#daf4e8]',
  }[tone];

  return (
    <div className={`rounded-[1.1rem] border-[3px] border-ink ${toneClass} px-4 py-3 shadow-[5px_5px_0_#1c293c]`}>
      <div className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-secondary">{title}</div>
      <div className="mt-1 text-sm font-bold text-ink">{detail}</div>
    </div>
  );
}

function MetricBar({ label, value, percent, accent = 'bg-secondary' }: { label: string; value: string; percent: number; accent?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-ink">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-4 rounded-full border-[3px] border-ink bg-white shadow-[4px_4px_0_#1c293c]">
        <div className={`h-full rounded-full ${accent}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink selection:bg-primary/35 selection:text-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5rem] top-[-4rem] h-[16rem] w-[16rem] rounded-full border-[3px] border-ink bg-primary opacity-90 shadow-brut-lg" />
        <div className="absolute right-[-6rem] top-[16rem] h-[14rem] w-[14rem] rounded-full border-[3px] border-ink bg-secondary opacity-15 shadow-brut-lg" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(28,41,60,0.26) 2px, transparent 2px), linear-gradient(90deg, rgba(28,41,60,0.26) 2px, transparent 2px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-4 md:px-6 md:pb-28 md:pt-6">
        <header className="sticky top-4 z-30 rounded-[1.9rem] border-[3px] border-ink bg-surface px-4 py-3 shadow-brut md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-[3px] border-ink bg-primary shadow-[4px_4px_0_#1c293c]">
                <span className="font-black text-ink">PC</span>
              </div>
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-secondary">PortalCanvas</div>
                <div className="text-lg font-black uppercase tracking-[-0.06em] text-ink">Portaldot canvas</div>
              </div>
            </a>

            <nav className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <a href="#features" className="rounded-full border-2 border-transparent px-4 py-2 transition hover:border-ink hover:bg-white hover:shadow-[4px_4px_0_#1c293c]">Features</a>
              <a href="#workflow" className="rounded-full border-2 border-transparent px-4 py-2 transition hover:border-ink hover:bg-white hover:shadow-[4px_4px_0_#1c293c]">Workflow</a>
              <a href="#proof" className="rounded-full border-2 border-transparent px-4 py-2 transition hover:border-ink hover:bg-white hover:shadow-[4px_4px_0_#1c293c]">Proof</a>
              <a href="#community" className="rounded-full border-2 border-transparent px-4 py-2 transition hover:border-ink hover:bg-white hover:shadow-[4px_4px_0_#1c293c]">Community</a>
            </nav>

            <a
              href="/canvas"
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-primary px-5 py-2.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        <LazySection id="top" defaultVisible className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <Badge>PortalCanvas design system</Badge>
            <h1 className="mt-6 max-w-5xl text-2xl font-black leading-[0.9] tracking-[-0.09em] text-ink md:text-7xl lg:text-[4.6rem]">
              Model Portaldot contracts as a whiteboard, not a pile of scripts.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#485567] md:text-lg">
              PortalCanvas turns a contract into a connected graph: storage, permissions, events, actions, fees, and runtime results stay visible in one place so the product is easy to understand and easier to demo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/canvas"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-primary px-6 py-3.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg"
              >
                Open the canvas
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-white px-6 py-3.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#f7f1dd] hover:shadow-brut-lg"
              >
                Read the structure
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {statCards.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-[3px] border-ink bg-secondary" />
            <div className="relative rounded-[2rem] border-[3px] border-ink bg-[#fffdf6] p-5 shadow-brut-lg">
              <div className="flex items-center justify-between gap-4 border-b-[3px] border-ink pb-4">
                <div>
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Canvas snapshot</div>
                  <div className="mt-1 text-xl font-black tracking-[-0.05em] text-ink">Contract graph and live metadata</div>
                </div>
                <div className="rounded-full border-[3px] border-ink bg-primary px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] shadow-[4px_4px_0_#1c293c]">
                  Local-first
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="rounded-[1.5rem] border-[3px] border-ink bg-primary-soft p-4 shadow-brut">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-secondary">Contract node</div>
                      <div className="mt-1 text-base font-black text-ink">PortalPassContract</div>
                    </div>
                    <Workflow className="h-5 w-5 text-ink" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                    <NodePill title="Entity" detail="Builder profile" tone="white" />
                    <div className="hidden h-[3px] w-8 bg-ink sm:block" />
                    <NodePill title="Storage" detail="builders: Mapping" tone="mint" />
                    <div className="hidden h-[3px] w-8 bg-ink sm:block" />
                    <NodePill title="Action" detail="createEvent()" tone="yellow" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border-[3px] border-ink bg-white p-4 shadow-brut">
                    <div className="flex items-center justify-between">
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-secondary">Runtime trace</div>
                      <Clock3 className="h-4 w-4 text-ink" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        'Extrinsic submitted to local node',
                        'Storage read mapped to contract state',
                        'Event emitted after block inclusion',
                      ].map((item, index) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-[#485567]">
                          <div className="mt-1 h-3 w-3 shrink-0 rounded-full border-[3px] border-ink bg-white" />
                          <div>
                            <div className="font-bold text-ink">{item}</div>
                            <div className="text-xs uppercase tracking-[0.18em] text-[#7a8594]">step 0{index + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border-[3px] border-ink bg-[#e9e2ff] p-4 shadow-brut">
                    <div className="flex items-center justify-between">
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-secondary">Fee inspector</div>
                      <Sparkles className="h-4 w-4 text-ink" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <MetricBar label="Estimated fee" value="0.82 POT" percent={68} />
                      <MetricBar label="Actual fee" value="0.79 POT" percent={59} accent="bg-primary" />
                      <MetricBar label="Balance after" value="14.21 POT" percent={91} accent="bg-[#16A34A]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LazySection>

        <LazySection id="features" className="py-16 md:py-24" delayMs={60}>
          <SectionTitle
            eyebrow="Core layers"
            title="A lightweight builder that stays useful after the demo ends."
            description="The homepage emphasizes the product layers the spec calls for: a visual modeling surface, an inspection surface, and a runtime surface. Each part is visible enough to explain and simple enough to extend."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </LazySection>

        <LazySection id="workflow" className="py-16 md:py-24" delayMs={120}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionTitle
              eyebrow="Workflow"
              title="Three moves from contract idea to visible runtime."
              description="PortalCanvas is intentionally small: model the contract, inspect the generated structure, then connect it to live Portaldot data for a convincing demo and a stronger mental model."
            />

            <div className="grid gap-5">
              {workflowSteps.map((step) => (
                <article key={step.step} className="rounded-[1.8rem] border-[3px] border-ink bg-white p-5 shadow-brut">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-ink bg-primary text-xl font-black text-ink shadow-[5px_5px_0_#1c293c]">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-[-0.05em] text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#485567]">{step.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </LazySection>

        <LazySection id="proof" className="py-16 md:py-24" delayMs={180}>
          <SectionTitle
            eyebrow="Design proof"
            title="The page stays bold, readable, and Portaldot-native."
            description="Every block is designed to make the product easier to scan, explain, and ship in a hackathon environment where clarity matters more than ornament."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {proofCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className="rounded-[1.7rem] border-[3px] border-ink bg-[#fffdf6] p-5 shadow-brut">
                  <div className="inline-flex rounded-2xl border-[3px] border-ink bg-primary p-3 shadow-[5px_5px_0_#1c293c]">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.05em] text-ink">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#485567]">{card.detail}</p>
                </article>
              );
            })}
          </div>
        </LazySection>

        <LazySection id="community" className="py-16 md:py-24" delayMs={240}>
          <SectionTitle
            eyebrow="Community"
            title="Users talk about the canvas in motion."
            description="The community strip keeps social proof visible with a horizontal marquee, so the homepage feels active without distracting from the core product story."
          />

          <div className="community-marquee mt-10 rounded-[2rem] border-[3px] border-ink bg-white py-6 shadow-brut overflow-hidden">
            <div className="community-marquee__track">
              <div className="community-marquee__group">
                {communityTestimonials.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className="community-card rounded-[1.6rem] border-[3px] border-ink bg-[#fffdf6] p-5 shadow-[5px_5px_0_#1c293c]"
                  >
                    <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">User review</div>
                    <p className="mt-4 text-sm leading-7 text-[#485567]">{testimonial.quote}</p>
                    <div className="mt-5 border-t-[3px] border-dashed border-ink pt-4">
                      <div className="text-base font-black tracking-[-0.04em] text-ink">{testimonial.name}</div>
                      <div className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-secondary">{testimonial.role}</div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="community-marquee__group" aria-hidden="true">
                {communityTestimonials.map((testimonial) => (
                  <article
                    key={`${testimonial.name}-duplicate`}
                    className="community-card rounded-[1.6rem] border-[3px] border-ink bg-[#fffdf6] p-5 shadow-[5px_5px_0_#1c293c]"
                  >
                    <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">User review</div>
                    <p className="mt-4 text-sm leading-7 text-[#485567]">{testimonial.quote}</p>
                    <div className="mt-5 border-t-[3px] border-dashed border-ink pt-4">
                      <div className="text-base font-black tracking-[-0.04em] text-ink">{testimonial.name}</div>
                      <div className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-secondary">{testimonial.role}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </LazySection>

        <LazySection className="py-8 md:py-16">
          <div className="rounded-[2rem] border-[3px] border-ink bg-secondary p-6 text-white shadow-brut-lg md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <Badge>Ready to build</Badge>
                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[0.95] tracking-[-0.08em] md:text-6xl">
                  Start PortalCanvas as a clear, local-first contract builder.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                  This homepage gives the project a strong first screen: it explains what PortalCanvas is, shows how the graph works, and frames the Portaldot runtime without EVM assumptions.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-primary px-6 py-3.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg"
                >
                  Open the workflow
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-white px-6 py-3.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#f7f1dd] hover:shadow-brut-lg"
                >
                  Review the layers
                  <FileText className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </LazySection>
      </div>
    </main>
  );
}
