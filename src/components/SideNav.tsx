"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { navItems } from "@/lib/nav";

export default function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  return <nav aria-label="Primary" className="flex items-center gap-6 md:gap-8">
    {navItems.map(item => {
      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
      return <Link key={item.key} href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${active ? "text-accent" : "text-fg-faint hover:text-fg"}`}>
        <span className={`h-1.5 w-1.5 rounded-full transition-colors ${active ? "bg-accent" : "bg-transparent group-hover:bg-fg-faint"}`} /><span>{t(item.key)}</span>
      </Link>;
    })}
  </nav>;
}
