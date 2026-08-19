import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

type PortfolioItem = { 
  id: string;
  index: string; 
  title: string; 
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  category: string;
};

export default async function PortfolioDetailPage({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params; 
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const allItems = t.raw("items") as PortfolioItem[];
  
  const item = allItems.find(p => p.id === id);
  
  if (!item) {
    notFound();
  }
  
  return (
    <div className="mx-auto max-w-[900px]">
      {/* Back Button */}
      <Reveal>
        <Link 
          href="/portfolio" 
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-faint hover:text-accent"
        >
          ← {locale === 'fa' ? 'بازگشت به نمونه‌کارها' : 'Back to Portfolio'}
        </Link>
      </Reveal>
      
      {/* Header Section */}
      <section className="grid gap-10 py-12 md:py-16">
        <Reveal delay={0.05}>
          <span className="font-mono text-xs text-accent">{item.index}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-title font-display text-4xl font-semibold leading-tight text-fg md:text-5xl">
            {item.title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-lg leading-relaxed text-fg-dim md:text-xl">
            {item.fullDescription}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-fg/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-fg-faint">
              {item.category}
            </span>
            {item.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full bg-fg/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-fg-faint">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Project Image Placeholder */}
      <Reveal delay={0.25}>
        <div className="my-12 aspect-video w-full overflow-hidden rounded-lg bg-fg-dim/10">
          <div className="flex h-full w-full items-center justify-center text-fg-faint">
            <div className="text-center">
              <span className="block font-mono text-sm uppercase tracking-widest">Project Preview</span>
              <span className="mt-2 block font-mono text-xs text-fg-faint">Add your project screenshot here</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Challenge Section */}
      <section className="border-t border-line py-12 md:py-16">
        <Reveal delay={0.3}>
          <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
            {locale === 'fa' ? 'چالش' : 'The Challenge'}
          </h2>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-6 text-base leading-relaxed text-fg-dim md:text-lg">
            {item.challenge}
          </p>
        </Reveal>
      </section>

      {/* Solution Section */}
      <section className="border-t border-line py-12 md:py-16">
        <Reveal delay={0.4}>
          <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
            {locale === 'fa' ? 'راهکار ما' : 'Our Solution'}
          </h2>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="mt-6 text-base leading-relaxed text-fg-dim md:text-lg">
            {item.solution}
          </p>
        </Reveal>
      </section>

      {/* Results Section */}
      <section className="border-t border-line py-12 md:py-16">
        <Reveal delay={0.5}>
          <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
            {locale === 'fa' ? 'نتایج' : 'Results'}
          </h2>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {item.results.map((result, i) => (
              <Reveal key={i} delay={0.55 + i * 0.05}>
                <div className="flex items-start gap-4 rounded-lg bg-bg-alt p-5">
                  <span className="font-mono text-xl text-accent">✓</span>
                  <p className="text-sm leading-relaxed text-fg md:text-base">{result}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Technologies Section */}
      <section className="border-t border-line py-12 md:py-16">
        <Reveal delay={0.65}>
          <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
            {locale === 'fa' ? 'تکنولوژی‌ها' : 'Technologies'}
          </h2>
        </Reveal>
        <Reveal delay={0.7}>
          <div className="mt-6 flex flex-wrap gap-3">
            {item.technologies.map((tech) => (
              <span key={tech} className="rounded-md bg-accent/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-accent">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA Section */}
      <Reveal delay={0.8}>
        <div className="my-16 flex flex-col items-center justify-center gap-6 text-center">
          <p className="max-w-2xl text-base text-fg-dim">{t("ctaText")}</p>
          <Link 
            href="/contact" 
            className="bracket-link inline-flex border-b border-line-strong pb-2 font-mono text-[11px] uppercase tracking-[.15em] text-fg hover:border-accent hover:text-accent"
          >
            {t("ctaLabel")} <span className="ms-3">→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
