"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SideNav from "./SideNav";
import ScrollFrames from "./ScrollFrames";
import LangSwitch from "./LangSwitch";
import ContactDrawer from "./ContactDrawer";
import { socialLinks } from "@/lib/nav";
import {
  IconInstagram,
  IconLinkedin,
  IconGithub,
  IconTelegram,
  IconPlus,
  IconMenu,
  IconClose,
} from "./icons";

const socialIcons = {
  instagram: IconInstagram,
  linkedin: IconLinkedin,
  github: IconGithub,
  telegram: IconTelegram,
};

export default function SiteChrome({ children }: { children: ReactNode }) {
  const t = useTranslations("nav");
  const social = useTranslations("social");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg">
      <div className="pointer-events-none fixed inset-0 z-0">
                <ScrollFrames />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg/50" />
      </div>

      <header className="relative z-20 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
        <div className="flex items-center gap-2">
          <Image
            src="/media/logo-icon-512.png"
            alt="bigblakboks"
            width={28}
            height={28}
            className="opacity-90"
          />
          <span className="font-display text-sm font-semibold tracking-[0.08em] uppercase">
            bigblakboks
          </span>
        </div>

        <button
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-expanded={mobileNavOpen}
          aria-label={mobileNavOpen ? t("close") : t("menu")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:border-line-strong hover:text-fg md:hidden"
        >
          {mobileNavOpen ? (
            <IconClose className="h-4 w-4" />
          ) : (
            <IconMenu className="h-4 w-4" />
          )}
        </button>
      </header>

      <div className="relative z-10 flex flex-1">
        <aside className="hidden w-[280px] shrink-0 flex-col justify-between px-10 py-10 md:flex">
          <div className="mt-16">
            <SideNav />
          </div>
          <div className="flex flex-col gap-6">
            <LangSwitch />
          </div>
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-30 flex flex-col justify-center bg-bg/95 px-8 md:hidden">
            <SideNav onNavigate={() => setMobileNavOpen(false)} />
            <div className="mt-10">
              <LangSwitch />
            </div>
          </div>
        )}

        <main className="relative z-10 flex-1 px-6 pb-24 pt-8 md:px-12 md:pb-16 md:pt-16">
          {children}
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-4 md:bottom-10 md:right-10">
        {socialLinks.map(({ key, href }) => {
          const Icon = socialIcons[key];
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={social(key)}
              className="text-fg-faint transition-colors hover:text-fg"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>

      <button
        onClick={() => setContactOpen(true)}
        aria-label={t("contact")}
        className="fixed bottom-6 left-6 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-bg text-fg transition-all hover:border-accent hover:text-accent md:bottom-10 md:left-10"
      >
        <IconPlus className="h-5 w-5" />
      </button>

      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
