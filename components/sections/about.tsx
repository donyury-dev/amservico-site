"use client";

import Image from "next/image";

interface AboutProps {
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: Array<{ value: string; label: string }>;
  bullets: string[];
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  values: { title: string; text: string };
}

export function AboutSection({
  title,
  headline,
  description,
  image,
  imageAlt,
  highlights,
  bullets,
  mission,
  vision,
  values,
}: AboutProps) {
  return (
    <section id="quem-somos" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[var(--color-primary,#1E88E5)] text-sm font-bold uppercase tracking-wider mb-3">{title}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-heading, inherit)" }}>
            {headline}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate-700"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-primary,#1E88E5)] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {highlights.map((h) => (
                <div key={h.label} className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="text-2xl font-bold text-[var(--color-primary,#1E88E5)]">{h.value}</div>
                  <div className="text-xs text-slate-500">{h.label}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {[mission, vision, values].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-[var(--color-primary-dark,#0A2540)] text-white"
                >
                  <div className="text-sm font-bold text-[var(--color-secondary,#10B981)] mb-2">{item.title}</div>
                  <div className="text-sm text-slate-300 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
