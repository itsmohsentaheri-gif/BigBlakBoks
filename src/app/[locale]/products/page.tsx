import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

type ProductItem = {
  index: string;
  title: string;
  description: string;
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  const items = t.raw("items") as ProductItem[];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <Reveal>
        <PageHeader eyebrow={t("eyebrow")} kicker={t("kicker")} />
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl">
          {t("headline")}
        </h1>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="max-w-xl text-base leading-relaxed text-fg-dim md:text-lg">
          {t("lead")}
        </p>
      </Reveal>

      <ul className="flex flex-col border-t border-line">
        {items.map((item, i) => (
          <Reveal key={item.index} delay={0.18 + i * 0.05}>
            <li className="group flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="font-mono text-[11px] text-fg-faint">
                {item.index}
              </span>
              <div className="flex flex-1 flex-col gap-2">
                <h2 className="font-display text-xl font-semibold text-fg transition-colors group-hover:text-accent sm:text-2xl">
                  {item.title}
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-fg-dim">
                  {item.description}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.18 + items.length * 0.05 + 0.06}>
        <Link
          href="/about"
          className="group inline-flex w-fit items-center gap-3 border-b border-line-strong pb-1 font-mono text-[12px] uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent"
        >
          {t("ctaLabel")}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
