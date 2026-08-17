"use client";

import Image from "next/image";

interface Case {
  title: string;
  description: string;
  image: string;
}

interface CasesProps {
  title: string;
  headline: string;
  description: string;
  items: Case[];
}

export function CasesSection({ title, headline, description, items }: CasesProps) {
  return (
    <section id="cases" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[var(--color-primary,#1E88E5)] text-sm font-bold uppercase tracking-wider mb-3">{title}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-heading, inherit)" }}>
            {headline}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
