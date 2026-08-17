"use client";

import Image from "next/image";
import { Users, Headset, HardHat, BarChart3, Clock, Building, Quote } from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Headset,
  HardHat,
  BarChart3,
  Clock,
  Building,
};

interface Differential {
  icon: string;
  title: string;
  text: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface DifferentialsProps {
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  items: Differential[];
  testimonials: Testimonial[];
}

export function DifferentialsSection({
  title,
  headline,
  description,
  image,
  imageAlt,
  items,
  testimonials,
}: DifferentialsProps) {
  return (
    <section id="diferenciais" className="py-20 lg:py-28 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[var(--color-secondary)] text-sm font-bold uppercase tracking-wider mb-3">{title}</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading, inherit)" }}>
            {headline}
          </h2>
          <p className="text-slate-300">{description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const Icon = icons[item.icon] || Building;
              return (
                <div key={item.title} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center mb-4"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <Quote className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <p className="text-slate-200 mb-4 leading-relaxed">"{t.quote}"</p>
              <div className="font-bold">{t.author}</div>
              <div className="text-sm text-slate-400">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

