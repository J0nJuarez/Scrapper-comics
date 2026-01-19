import fs from "fs";
import { crawlVolumenes } from "./src/crawler/crawlerVolumenes.js";

const BASE = process.argv[2];
const OUTPUT = process.argv[3];

if (!BASE || !OUTPUT) {
  console.error("Uso:");
  console.error("npm run scrape <URL_BASE> <CARPETA>");
  process.exit(1);
}

if (!fs.existsSync(OUTPUT)) {
  fs.mkdirSync(OUTPUT, { recursive: true });
}

await crawlVolumenes(BASE, OUTPUT);
