"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SideNav from "./SideNav";
import LangSwitch from "./LangSwitch";
import ContactDrawer from "./ContactDrawer";
import { socialLinks } from "@/lib/nav";
import { IconInstagram, IconLinkedin, IconGithub, IconTelegram, IconPlus, IconMenu, IconClose } from "./icons";
import ScrollFrames from "./ScrollFrames";
import FloatingParticles from "./FloatingParticles";

const socialIcons = { instagram: IconInstagram, linkedin: IconLinkedin, github: IconGithub, telegram: IconTelegram };

export default function SiteChrome({ children }: { children: ReactNode }) {
  const t = useTranslations("nav");
  const social = useTranslations("social");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="architectural-shell relative flex min-h-screen flex-col overflow-hidden">
    <div className="fixed inset-0 z-0 opacity-[0.25] pointer-events-none"><ScrollFrames /></div>
    <FloatingParticles />
    <header className={`sticky top-0 z-40 border-b px-6 py-5 transition-colors md:px-12 ${scrolled ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8">
        <div className="flex items-center gap-3"><Image src="/media/logo-icon-512.png" alt="bigblakboks" width={34} height={34} className="opacity-90" /><div><div className="wordmark font-display text-sm font-semibold">BIGBLAK<span className="text-accent">BOKS</span></div><div className="font-mono text-[9px] uppercase tracking-[.22em] text-fg-faint">engineering lab</div></div></div>
        <div className="hidden items-center gap-10 md:flex"><SideNav /></div>
        <div className="hidden items-center gap-5 sm:flex"><LangSwitch /><button onClick={() => setContactOpen(true)} className="border border-accent px-4 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-accent transition-colors hover:bg-accent hover:text-bg">{t("contact")}</button></div>
        <button onClick={() => setMobileNavOpen(v => !v)} aria-expanded={mobileNavOpen} aria-label={mobileNavOpen ? t("close") : t("menu")} className="flex h-10 w-10 items-center justify-center border border-line text-fg md:hidden">{mobileNavOpen ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}</button>
      </div>
    </header>
    {mobileNavOpen && <div className="fixed inset-0 z-30 flex flex-col justify-center bg-bg px-8 md:hidden"><SideNav onNavigate={() => setMobileNavOpen(false)} /><div className="mt-10 flex items-center justify-between"><LangSwitch /><button onClick={() => { setContactOpen(true); setMobileNavOpen(false); }} className="border border-accent px-4 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-accent">{t("contact")}</button></div></div>}
    <main className="relative z-10 mx-auto w-full max-w-[1440px] flex-1 px-6 pb-24 md:px-12">{children}</main>
    <footer className="relative z-10 border-t border-line"><div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-10 md:grid-cols-[1fr_auto_auto] md:px-12 md:py-14"><div><div className="wordmark font-display text-lg font-semibold">BIGBLAK<span className="text-accent">BOKS</span></div><p className="mt-3 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[.14em] text-fg-faint">systems engineering lab / complexity inside, clarity outside.</p></div><SideNav /><div className="flex items-start gap-4">{socialLinks.map(({ key, href }) => { const Icon = socialIcons[key]; return <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={social(key)} className="text-fg-faint transition-colors hover:text-accent"><Icon className="h-4 w-4" /></a>; })}</div></div></footer>
    <button onClick={() => setContactOpen(true)} aria-label={t("contact")} className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center border border-accent bg-accent text-bg transition-transform hover:scale-105 md:hidden"><IconPlus className="h-5 w-5" /></button>
    <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
  </div>;
}
