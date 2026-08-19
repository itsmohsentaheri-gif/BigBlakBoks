import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import InfoBlocks from "@/components/InfoBlocks";
import Reveal from "@/components/Reveal";

type ProcessStep = { step: string; title: string; description: string };

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("about");
  const blocks = t.raw("blocks") as { label: string; value: string }[];
  const process = t.raw("process") as ProcessStep[];
  return <div className="mx-auto max-w-[1200px]">
    <section className="grid gap-10 py-12 md:grid-cols-[.4fr_1fr] md:py-20"><Reveal><PageHeader eyebrow={t("eyebrow")} kicker={t("kicker")} /></Reveal><div><Reveal delay={.08}><h1 className="display-title font-display font-semibold text-fg">{t("headline")}</h1></Reveal><Reveal delay={.14}><p className="mt-8 max-w-2xl text-base leading-relaxed text-fg-dim md:text-lg">{t("lead")}</p></Reveal></div></section>
    <section className="border-t border-line py-16 md:py-24"><InfoBlocks blocks={blocks} /></section>
    <section className="border-t border-line py-16 md:py-24"><div className="mb-10 flex items-center justify-between"><span className="section-label">/ {t("processTitle")}</span><span className="font-mono text-[10px] text-fg-faint">01—04</span></div><ol className="grid gap-3 md:grid-cols-2">{process.map((item, i) => <Reveal key={item.step} delay={.08 + i * .05}><li className="metal-panel min-h-56 border border-line p-6 md:p-8"><div className="flex items-start justify-between"><span className="font-mono text-xs text-accent">{item.step}</span><span className="font-mono text-[10px] text-fg-faint">BB / 0{i + 1}</span></div><h2 className="mt-12 font-display text-3xl font-semibold tracking-[-.04em]">{item.title}</h2><p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-dim">{item.description}</p></li></Reveal>)}</ol></section>
    <Reveal><p className="max-w-4xl border-t border-line py-16 font-display text-4xl font-semibold leading-[.95] tracking-[-.05em] md:py-24 md:text-7xl">{t("statement")}</p></Reveal>
  </div>;
}
