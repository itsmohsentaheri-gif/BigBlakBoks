import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Familjen_Grotesk,
  Manrope,
  Vazirmatn,
  JetBrains_Mono,
} from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import SiteChrome from "@/components/SiteChrome";
import "../globals.css";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("titleSuffix"),
      template: `%s — ${t("siteName")}`,
    },
    description: t("description"),
    metadataBase: new URL("https://bigblakboks.com"),
    alternates: {
      languages: { fa: "/fa", en: "/en" },
    },
    openGraph: {
      title: t("titleSuffix"),
      description: t("description"),
      images: ["/media/bigblakboks-logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${familjen.variable} ${manrope.variable} ${vazirmatn.variable} ${jetbrains.variable} h-full`}
    >
      <body className="h-full bg-bg text-fg antialiased selection:bg-accent selection:text-bg">
        <NextIntlClientProvider>
          <SiteChrome>{children}</SiteChrome>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
