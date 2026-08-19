import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

type ProductItem = { index: string; title: string; description: string };

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("products");
  const items = t.raw("items") as ProductItem[];
  return <div className="mx-auto max-w-[1200px]">
    <section className="grid gap-10 py-12 md:grid-cols-[.4fr_1fr] md:py-20"><Reveal><PageHeader eyebrow={t("eyebrow")} kicker={t("kicker")} /></Reveal><div><Reveal delay={.08}><h1 className="display-title font-display font-semibold text-fg">{t("headline")}</h1></Reveal><Reveal delay={.14}><p className="mt-8 max-w-xl text-base leading-relaxed text-fg-dim md:text-lg">{t("lead")}</p></Reveal></div></section>
    <section className="border-t border-line"><ul>{items.map((item, i) => <Reveal key={item.index} delay={.12 + i * .04}><li className="service-row group grid gap-5 py-9 md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-10"><span className="font-mono text-xs text-accent">{item.index}</span><div><h2 className="font-display text-3xl font-semibold leading-none tracking-[-.04em] text-fg transition-colors group-hover:text-accent md:text-5xl">{item.title}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-dim">{item.description}</p></div><span className="font-mono text-xl text-fg-faint transition-colors group-hover:text-accent">↗</span></li></Reveal>)}</ul></section>
    <Reveal delay={.3}><Link href="/about" className="bracket-link my-16 inline-flex border-b border-line-strong pb-2 font-mono text-[11px] uppercase tracking-[.15em] text-fg hover:border-accent hover:text-accent">{t("ctaLabel")} <span className="ms-3">↗</span></Link></Reveal>
  </div>;
}
