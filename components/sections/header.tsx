"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  nav: NavItem[];
  whatsapp: string;
  whatsappLink: string;
}

export function Header({ nav, whatsapp, whatsappLink }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-dark)] flex items-center justify-center text-white font-bold text-lg">
              AM
            </div>
            <div className="leading-tight">
              <div className="font-bold text-slate-900 text-sm sm:text-base">AM Serviço e Manutenção</div>
              <div className="text-[10px] sm:text-xs text-slate-500">Engenharia Hospitalar e Infraestrutura</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              {whatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

