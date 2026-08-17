import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import InfoBlocks from "@/components/InfoBlocks";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const blocks = t.raw("blocks") as { label: string; value: string }[];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <Reveal>
        <PageHeader eyebrow={t("eyebrow")} kicker={t("kicker")} />
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-6xl">
          <span className="block text-fg-dim">{t("headlineLine1")}</span>
          <span className="block text-fg-dim">{t("headlineLine2")}</span>
          <span className="block text-fg">{t("headlineLine3")}</span>
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="max-w-xl text-base leading-relaxed text-fg-dim md:text-lg">
          {t("lead")}
        </p>
      </Reveal>

      <Reveal delay={0.22}>
        <InfoBlocks blocks={blocks} />
      </Reveal>

      <Reveal delay={0.28}>
        <p className="max-w-xl border-t border-line pt-6 font-display text-lg font-medium leading-snug text-fg/85">
          {t("statement")}
        </p>
      </Reveal>

      <Reveal delay={0.34}>
        <Link
          href="/products"
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
