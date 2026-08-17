import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import PageHeader from "@/components/PageHeader";
import InfoBlocks from "@/components/InfoBlocks";
import Reveal from "@/components/Reveal";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const blocks = t.raw("blocks") as { label: string; value: string }[];
  const process = t.raw("process") as ProcessStep[];

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

      <Reveal delay={0.2}>
        <InfoBlocks blocks={blocks} />
      </Reveal>

      <Reveal delay={0.26}>
        <div className="flex flex-col gap-1 border-t border-line pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
            {t("processTitle")}
          </span>
        </div>
      </Reveal>

      <ul className="flex flex-col gap-6">
        {process.map((item, i) => (
          <Reveal key={item.step} delay={0.3 + i * 0.05}>
            <li className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] text-accent-dim">
                {item.step}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-lg font-semibold text-fg">
                  {item.title}
                </h3>
                <p className="max-w-lg text-sm leading-relaxed text-fg-dim">
                  {item.description}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.3 + process.length * 0.05 + 0.06}>
        <p className="max-w-xl border-t border-line pt-6 font-display text-lg font-medium leading-snug text-fg/85">
          {t("statement")}
        </p>
      </Reveal>
    </div>
  );
}
