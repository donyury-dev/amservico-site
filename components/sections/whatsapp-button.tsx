"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ link, phone }: { link: string; phone: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp ${phone}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition-colors"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm">WhatsApp</span>
    </a>
  );
}

