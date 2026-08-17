"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

interface FooterProps {
  companyName: string;
  tagline: string;
  columns: FooterColumn[];
  bottom: {
    copyright: string;
    legal: string;
  };
  whatsappLink: string;
  email: string;
  address: string;
}

export function Footer({
  companyName,
  tagline,
  columns,
  bottom,
  whatsappLink,
  email,
  address,
}: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                AM
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white">{companyName}</div>
                <div className="text-xs text-slate-400">Engenharia Hospitalar e Infraestrutura</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">{tagline}</p>
            <div className="space-y-2 text-sm">
              <a href={whatsappLink} className="flex items-center gap-2 hover:text-[var(--color-primary)]">
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[var(--color-primary)]">
                <Mail className="w-4 h-4" /> {email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {address}
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[var(--color-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>{bottom.copyright}</div>
          <div>{bottom.legal}</div>
        </div>
      </div>
    </footer>
  );
}

