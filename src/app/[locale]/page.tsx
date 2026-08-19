import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import InfoBlocks from "@/components/InfoBlocks";
import Reveal from "@/components/Reveal";
import AnimatedText from "@/components/AnimatedText";
import { Link } from "@/i18n/navigation";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const blocks = t.raw("blocks") as { label: string; value: string }[];

  return (
    <div className="mx-auto max-w-[1440px]">
      <section className="grid min-h-[calc(100vh-7rem)] items-center gap-12 py-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-9">
          <Reveal><PageHeader eyebrow={t("eyebrow")} kicker={t("kicker")} /></Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-title max-w-4xl font-display font-semibold text-fg">
              <span className="block text-fg-dim"><AnimatedText text={t("headlineLine1")} /></span>
              <span className="block text-fg"><AnimatedText text={t("headlineLine2")} delay={0.1} /></span>
              <span className="block text-accent"><AnimatedText text={t("headlineLine3")} delay={0.2} /></span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}><p className="max-w-xl text-base leading-relaxed text-fg-dim md:text-lg fade-in">{t("lead")}</p></Reveal>
          <Reveal delay={0.22}>
            <Link href="/products" className="bracket-link inline-flex w-fit items-center gap-3 border-b border-line-strong pb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent ripple">
              {t("ctaLabel")} <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="hero-frame metal-panel glow-border">
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
            <div className="flex items-center gap-1 float">
              <span className="wordmark font-display text-5xl font-semibold md:text-7xl gradient-text">BIGBLAK<span className="text-accent">BOKS</span></span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[.22em] text-fg-faint">systems engineering lab</span>
          </div>
          <div className="absolute inset-x-6 bottom-7 z-10 flex items-end justify-between gap-5">
            <div><span className="section-label">the black box / 001</span><p className="mt-3 max-w-sm font-display text-3xl font-semibold leading-[.95] text-fg md:text-5xl">complexity inside.<br /><span className="text-fg-dim">clarity outside.</span></p></div>
            <span className="font-mono text-[10px] text-fg-faint animate-pulse">SCROLL ↓</span>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-5"><div><span className="section-label">/ the studio</span><h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-none tracking-[-.05em] md:text-6xl">{t("statement")}</h2></div><span className="hidden font-mono text-[10px] text-fg-faint md:block">BB / 2026</span></div>
        <InfoBlocks blocks={blocks} />
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-[.35fr_1fr]"><span className="section-label">/ what we build</span><div><h2 className="max-w-3xl font-display text-5xl font-semibold leading-[.92] tracking-[-.06em] md:text-8xl gradient-text">{t("headlineLine3")}</h2><Link href="/products" className="bracket-link mt-10 inline-flex border-b border-line-strong pb-2 font-mono text-[11px] uppercase tracking-[.15em] text-fg hover:border-accent hover:text-accent ripple">{t("ctaLabel")} <span className="ms-3">→</span></Link></div></div>
      </section>
    </div>
  );
}