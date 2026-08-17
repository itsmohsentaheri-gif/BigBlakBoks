"use client";

import { usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

export default function LangSwitch() {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("langSwitch");
  const activeLocale = params.locale as string;

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-2">
          {i > 0 && <span className="text-fg-faint">/</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === activeLocale ? "true" : undefined}
            className={
              locale === activeLocale
                ? "text-fg"
                : "text-fg-dim transition-colors hover:text-fg"
            }
          >
            {t(locale)}
          </Link>
        </span>
      ))}
    </div>
  );
}
