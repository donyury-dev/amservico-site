"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

interface CtaBannerProps {
  title: string;
  description: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
}

export function CtaBanner({
  title,
  description,
  primaryCta,
  primaryCtaHref,
  secondaryCta,
  secondaryCtaHref,
}: CtaBannerProps) {
  return (
    <section className="py-16 bg-[var(--color-primary,#1E88E5)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading, inherit)" }}>
          {title}
        </h2>
        <p className="text-white/90 mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={primaryCtaHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-[var(--color-primary,#1E88E5)] font-semibold hover:bg-slate-100 transition-colors"
          >
            {primaryCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={secondaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
