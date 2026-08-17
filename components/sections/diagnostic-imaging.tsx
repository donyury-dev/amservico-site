"use client";

import Image from "next/image";

interface DiagnosticImagingProps {
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  modalities: Array<{ name: string; description: string }>;
}

export function DiagnosticImagingSection({
  title,
  headline,
  description,
  image,
  imageAlt,
  modalities,
}: DiagnosticImagingProps) {
  return (
    <section id="diagnostico-imagem" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[var(--color-primary,#1E88E5)] text-sm font-bold uppercase tracking-wider mb-3">{title}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-heading, inherit)" }}>
            {headline}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {modalities.map((m) => (
              <div key={m.name} className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-[var(--color-primary,#1E88E5)]/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.name}</h3>
                <p className="text-sm text-slate-600">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
