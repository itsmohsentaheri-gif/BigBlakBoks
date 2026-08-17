"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { navItems } from "@/lib/nav";

export default function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label="Primary" className="flex flex-col gap-6">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className="group flex items-baseline gap-3"
          >
            <span
              className={`font-mono text-[11px] tracking-[0.1em] transition-colors ${
                isActive ? "text-accent" : "text-fg-faint group-hover:text-fg-dim"
              }`}
            >
              {item.index}
            </span>
            <span
              className={`font-display transition-all duration-300 ${
                isActive
                  ? "text-2xl md:text-3xl font-semibold text-fg"
                  : "text-lg md:text-xl font-medium text-fg-dim group-hover:text-fg/70"
              }`}
            >
              {t(item.key)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
