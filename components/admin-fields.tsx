"use client";

import { Calendar, TreePine, Heart, Rabbit, Ghost, Cake, HardHat, HeartPulse, Sparkles } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  TreePine,
  Heart,
  Rabbit,
  Ghost,
  Cake,
  HardHat,
  HeartPulse,
  Sparkles,
};

export function ThemeSelector({
  mode,
  manualTheme,
  options,
  currentLabel,
  onModeChange,
  onThemeChange,
}: {
  mode: "auto" | "manual";
  manualTheme: string | null;
  options: Array<{ id?: string; name: string; icon?: string }>;
  currentLabel: string;
  onModeChange: (mode: "auto" | "manual") => void;
  onThemeChange: (themeId: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        No modo Automático, o site muda sozinho 5 dias antes das datas comemorativas e volta ao padrão 3 dias depois.
        <strong> Atualmente: {currentLabel}.</strong>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => {
            onModeChange("auto");
            onThemeChange(null);
          }}
          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
            mode === "auto"
              ? "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Automático</span>
        </button>
        {options.map((opt, idx) => {
          const Icon = ICONS[opt.icon || "Calendar"] || Calendar;
          const selected = mode === "manual" && manualTheme === opt.id;
          return (
            <button
              key={opt.id || idx}
              type="button"
              onClick={() => {
                onModeChange("manual");
                onThemeChange(opt.id || null);
              }}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                selected
                  ? "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{opt.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "url" | "password";
  placeholder?: string;
  rows?: number;
}

export function TextField({ label, value, onChange, type = "text", placeholder, rows }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {rows ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#1E88E5)]"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#1E88E5)]"
        />
      )}
    </div>
  );
}

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="url"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary,#1E88E5)]"
      />
      {value && (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
          <img src={value} alt={label} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value || "#1E88E5"}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 p-1 rounded border border-slate-300"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono text-sm"
        />
      </div>
    </div>
  );
}

interface ListFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function ListField({ label, values, onChange, placeholder }: ListFieldProps) {
  const list = values || [];
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {list.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...list];
              next[idx] = e.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900"
          />
          <button
            type="button"
            onClick={() => onChange(list.filter((_, i) => i !== idx))}
            className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium"
          >
            Remover
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...list, ""])}
        className="text-sm font-medium text-[var(--color-primary,#1E88E5)] hover:underline"
      >
        + Adicionar item
      </button>
    </div>
  );
}
