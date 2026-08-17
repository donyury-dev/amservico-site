import { promises as fs } from "fs";
import path from "path";

export type SiteContent = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export async function loadContent(): Promise<SiteContent> {
  const filePath = path.join(process.cwd(), "data", "site-content.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}
