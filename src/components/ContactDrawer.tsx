"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { IconClose } from "./icons";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-sm px-6"
    >
      <button
        onClick={onClose}
        aria-label={t("close")}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:border-line-strong hover:text-fg"
      >
        <IconClose className="h-4 w-4" />
      </button>

      <div className="w-full max-w-md border-t border-line pt-10">
        <h2 id="contact-title" className="font-display text-3xl font-semibold text-fg">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-fg-dim">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
              {t("nameLabel")}
            </span>
            <input
              required
              name="name"
              type="text"
              placeholder={t("namePlaceholder")}
              className="border-b border-line bg-transparent pb-2 text-fg outline-none placeholder:text-fg-faint focus-visible:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
              {t("emailLabel")}
            </span>
            <input
              required
              name="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              className="border-b border-line bg-transparent pb-2 text-fg outline-none placeholder:text-fg-faint focus-visible:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
              {t("messageLabel")}
            </span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder={t("messagePlaceholder")}
              className="resize-none border-b border-line bg-transparent pb-2 text-fg outline-none placeholder:text-fg-faint focus-visible:border-accent"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex items-center justify-center border border-line-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
          >
            {status === "sending" ? t("sending") : t("submit")}
          </button>

          {status === "success" && (
            <p role="status" className="text-sm text-accent">
              {t("success")}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">
              {t("error")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
