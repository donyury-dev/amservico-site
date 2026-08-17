"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

interface HeroProps {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  highlights: Array<{ value: string; label: string }>;
  images: HeroImage[];
}

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryCta,
  primaryCtaHref,
  secondaryCta,
  secondaryCtaHref,
  highlights,
  images,
}: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-slate-900" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-secondary)] text-xs font-bold tracking-wider uppercase border border-white/10">
              {badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1]"
                style={{ fontFamily: "var(--font-heading, inherit)" }}>
              {title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                {primaryCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {secondaryCta}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {highlights.map((h) => (
                <div key={h.label} className="border-l-2 border-[var(--color-primary)] pl-4">
                  <div className="text-2xl font-bold text-white">{h.value}</div>
                  <div className="text-sm text-slate-400">{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[var(--color-secondary)] text-sm font-bold uppercase tracking-wider">
                      {img.label}
                    </div>
                    <div className="text-white text-lg font-semibold">{img.caption}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === current ? "bg-[var(--color-primary)] w-6" : "bg-white/40"}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

