import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

type PortfolioItem = { 
  id: string;
  index: string; 
  title: string; 
  shortDescription: string;
  category: string;
  image?: string;
};

export default async function PortfolioPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; 
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const items = t.raw("items") as PortfolioItem[];
  
  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header Section */}
      <section className="grid gap-10 py-12 md:grid-cols-[.4fr_1fr] md:py-20">
        <Reveal>
          <PageHeader eyebrow={t("eyebrow")} kicker={t("kicker")} />
        </Reveal>
        <div>
          <Reveal delay={0.08}>
            <h1 className="display-title font-display font-semibold text-fg">{t("headline")}</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-dim md:text-lg">{t("lead")}</p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="border-t border-line">
        <div className="grid gap-12 py-12 md:grid-cols-2 md:gap-10 md:py-20">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={0.1 + i * 0.05}>
              <Link href={`/portfolio/${item.id}`} className="group block">
                <article className="group relative overflow-hidden rounded-lg bg-bg-alt p-6 transition-all hover:shadow-lg metal-panel">
                  {/* Project Image Placeholder */}
                  <div className="mb-6 aspect-video w-full overflow-hidden rounded-md bg-fg-dim/10">
                    <div className="flex h-full w-full items-center justify-center text-fg-faint">
                      <span className="font-mono text-xs uppercase tracking-widest">Project Preview</span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs text-accent">{item.index}</span>
                      <h2 className="mt-2 font-display text-2xl font-semibold leading-none tracking-[-.04em] text-fg transition-colors group-hover:text-accent md:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-fg-dim">{item.shortDescription}</p>
                      <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-widest text-fg-faint">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-mono text-xl text-fg-faint transition-colors group-hover:text-accent">↗</span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <Reveal delay={0.3}>
        <div className="my-16 flex flex-col items-center justify-center gap-6 text-center">
          <p className="max-w-2xl text-base text-fg-dim">{t("ctaText")}</p>
          <Link 
            href="/about" 
            className="bracket-link inline-flex border-b border-line-strong pb-2 font-mono text-[11px] uppercase tracking-[.15em] text-fg hover:border-accent hover:text-accent"
          >
            {t("ctaLabel")} <span className="ms-3">→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
