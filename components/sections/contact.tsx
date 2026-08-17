"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href: string;
}

interface ContactProps {
  title: string;
  headline: string;
  description: string;
  formTitle: string;
  formFields: FormField[];
  submitLabel: string;
  successMessage: string;
  contactInfo: {
    title: string;
    items: ContactInfoItem[];
  };
  commercial: {
    title: string;
    text: string;
  };
}

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Mail,
  MapPin,
};

export function ContactSection({
  title,
  headline,
  description,
  formTitle,
  formFields,
  submitLabel,
  successMessage,
  contactInfo,
  commercial,
}: ContactProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contato" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider mb-3">{title}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-heading, inherit)" }}>
            {headline}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{contactInfo.title}</h3>
              <div className="space-y-4">
                {contactInfo.items.map((item) => {
                  const Icon = icons[item.icon] || Phone;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">{item.label}</div>
                        <div className="font-semibold text-slate-900">{item.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-primary-dark)] text-white">
              <h3 className="text-xl font-bold mb-3">{commercial.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{commercial.text}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">{formTitle}</h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-12 h-12 text-[var(--color-secondary)] mb-4" />
                <p className="text-slate-700 font-medium">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {formFields.map((field) => (
                    <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          required={field.required}
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

