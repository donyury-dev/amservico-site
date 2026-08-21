export type SiteContent = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ThemeConfig = {
  mode: "auto" | "manual";
  manualTheme: string | null;
  default: ThemeDefinition;
  themes: ThemeDefinition[];
};

export type ThemeEffect =
  | "snow"
  | "fireworks"
  | "hearts"
  | "easter"
  | "bats"
  | "confetti"
  | "crosses"
  | "balloons";

export type ThemeDefinition = {
  id?: string;
  name: string;
  icon?: string;
  date?: string;
  movable?: "easter" | "second-sunday-may";
  autoRange?: { before: number; after: number };
  colors: Record<string, string>;
  fonts: { heading: string; body: string };
  effect?: ThemeEffect;
};

function parseDate(dateStr: string, year: number): Date {
  const [month, day] = dateStr.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function getSecondSundayMay(year: number): Date {
  const may1 = new Date(year, 4, 1);
  const firstSunday = 1 + ((7 - may1.getDay()) % 7);
  return new Date(year, 4, firstSunday + 7);
}

function getThemeBaseDate(theme: ThemeDefinition, year: number): Date | null {
  if (theme.movable === "easter") return getEasterDate(year);
  if (theme.movable === "second-sunday-may") return getSecondSundayMay(year);
  if (theme.date) return parseDate(theme.date, year);
  return null;
}

function isInRange(baseDate: Date, date: Date, before: number, after: number): boolean {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - before);
  start.setHours(0, 0, 0, 0);

  const end = new Date(baseDate);
  end.setDate(end.getDate() + after);
  end.setHours(23, 59, 59, 999);

  const check = new Date(date);
  check.setHours(12, 0, 0, 0);

  return check >= start && check <= end;
}

export function getActiveTheme(themes: ThemeConfig, date = new Date()): ThemeDefinition {
  if (themes.mode === "manual" && themes.manualTheme) {
    const manual = themes.themes.find((t) => t.id === themes.manualTheme);
    if (manual) return manual;
  }

  const year = date.getFullYear();

  for (const theme of themes.themes) {
    const base = getThemeBaseDate(theme, year);
    if (!base) continue;
    const range = theme.autoRange || { before: 5, after: 3 };
    if (isInRange(base, date, range.before, range.after)) {
      return theme;
    }
  }

  return themes.default;
}

export function getCurrentThemeLabel(themes: ThemeConfig, date = new Date()): string {
  const active = getActiveTheme(themes, date);
  if (themes.mode === "manual" && themes.manualTheme) {
    return `${active.name} (manual)`;
  }
  return active.name;
}
