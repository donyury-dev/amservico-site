"use client";

import Image from "next/image";

interface LifeSupportProps {
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  items: Array<{ title: string; text: string }>;
}

export function LifeSupportSection({
  title,
  headline,
  description,
  image,
  imageAlt,
  items,
}: LifeSupportProps) {
  return (
    <section id="suporte-vida" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider">{title}</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-heading, inherit)" }}>
              {headline}
            </h2>
            <p className="text-slate-600">{description}</p>

            <div className="grid gap-4 pt-4">
              {items.map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

