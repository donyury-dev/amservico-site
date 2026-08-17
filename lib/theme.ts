export type SiteContent = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ThemeConfig = {
  default: {
    name: string;
    colors: Record<string, string>;
    fonts: { heading: string; body: string };
  };
  themes: Array<{
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    colors: Record<string, string>;
    fonts: { heading: string; body: string };
  }>;
};

export function getActiveTheme(themes: ThemeConfig, date = new Date()): ThemeConfig["default"] {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const wrap = (d: string) => {
    const [m, day] = d.split("-").map(Number);
    return { m: m ?? 1, day: day ?? 1 };
  };

  const inRange = (start: string, end: string) => {
    const s = wrap(start);
    const e = wrap(end);
    const now = wrap(mmdd);

    const nowVal = now.m * 100 + now.day;
    const startVal = s.m * 100 + s.day;
    const endVal = e.m * 100 + e.day;

    if (startVal <= endVal) {
      return nowVal >= startVal && nowVal <= endVal;
    }
    return nowVal >= startVal || nowVal <= endVal;
  };

  const active = themes.themes.find((t) => inRange(t.startDate, t.endDate));
  if (active) return active;
  return themes.default;
}
