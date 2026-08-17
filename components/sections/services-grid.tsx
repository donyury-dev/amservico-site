"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  href: string;
}

const iconMap: Record<string, React.ReactNode> = {};

import {
  Stethoscope,
  HeartPulse,
  Scan,
  Building2,
  Zap,
  ClipboardCheck,
  Briefcase,
  Award,
} from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  HeartPulse,
  Scan,
  Building2,
  Zap,
  ClipboardCheck,
  Briefcase,
  Award,
};

interface ServicesGridProps {
  title: string;
  subtitle: string;
  description: string;
  items: Service[];
}

export function ServicesGrid({ title, subtitle, description, items }: ServicesGridProps) {
  return (
    <section id="servicos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[var(--color-primary,#1E88E5)] text-sm font-bold uppercase tracking-wider mb-3">{title}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-heading, inherit)" }}>
            {subtitle}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service) => {
            const Icon = icons[service.icon] || Award;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-[var(--color-primary,#1E88E5)]/20 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary,#1E88E5)]/10 text-[var(--color-primary,#1E88E5)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary,#1E88E5)] group-hover:text-white transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{service.shortDescription}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary,#1E88E5)]"
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
