"use client";

import Image from "next/image";

interface ClinicalEngineeringProps {
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  items: Array<{ title: string; bullets: string[] }>;
}

export function ClinicalEngineeringSection({
  title,
  headline,
  description,
  image,
  imageAlt,
  items,
}: ClinicalEngineeringProps) {
  return (
    <section id="engenharia-clinica" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider">{title}</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading, inherit)" }}>
              {headline}
            </h2>
            <p className="text-slate-600">{description}</p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {items.map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

