import type { Metadata } from 'next';

import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

import { ModelingCanvas } from '../../components/modeling-canvas';

export const metadata: Metadata = {
  title: 'PortalCanvas Canvas',
  description: 'Visual modeling workspace for Portaldot contracts.',
};

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] shadow-brut">
        {eyebrow}
      </div>
      <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.06em] text-ink md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#485567] md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function CanvasPage() {
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

      <div className="relative mx-auto max-w-[100rem] px-2 pb-20 pt-2 md:px-4 md:pb-28 md:pt-4">
        <header className="sticky top-4 z-30 rounded-[1.9rem] border-[3px] border-ink bg-surface px-4 py-3 shadow-brut md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-[3px] border-ink bg-primary shadow-[4px_4px_0_#1c293c]">
                <span className="font-black text-ink">PC</span>
              </div>
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-secondary">PortalCanvas</div>
                <div className="text-lg font-black uppercase tracking-[-0.06em] text-ink">Canvas workspace</div>
              </div>
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-5 py-2.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg"
              >
                <ArrowLeft className="h-4 w-4" />
                Back home
              </a>
              <a
                href="#canvas"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-primary px-5 py-2.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg"
              >
                Open canvas
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <SectionTitle
              eyebrow="Visual modeling layer"
              title="Model Portaldot contracts as a living graph."
              description="This workspace is the dedicated home for the graph model: you can drag nodes, inspect selected context, and see how contract pieces connect before runtime data comes into play."
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#canvas"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-primary px-6 py-3.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg"
              >
                Jump to canvas
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-white px-6 py-3.5 text-sm font-black text-ink shadow-brut transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#f7f1dd] hover:shadow-brut-lg"
              >
                Read the product story
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border-[3px] border-ink bg-[#fffdf6] p-5 shadow-brut-lg">
            <div className="flex items-center justify-between gap-4 border-b-[3px] border-ink pb-4">
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-secondary">Canvas preview</div>
                <div className="mt-1 text-xl font-black tracking-[-0.05em] text-ink">Interactive node graph</div>
              </div>
              <div className="rounded-full border-[3px] border-ink bg-primary px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] shadow-[4px_4px_0_#1c293c]">
                Drag enabled
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#485567]">
              The canvas below is now separated from the homepage so the landing page can stay focused on the pitch while this page becomes the actual modeling workspace.
            </p>
          </div>
        </section>

        <section id="canvas" className="scroll-mt-28 py-8 md:py-16">
          <ModelingCanvas />
        </section>
      </div>
    </main>
  );
}