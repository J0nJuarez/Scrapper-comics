import express from "express";
import fs from "fs";
import { crawlVolumenes } from "./src/crawler/crawlerVolumenes.js";

const app = express();
app.use(express.json());

app.post("/scrape", async (req, res) => {
  const { baseUrl, outputDir = "./output" } = req.body;

  if (!baseUrl) {
    return res.status(400).json({ error: "baseUrl requerida" });
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  crawlVolumenes(baseUrl, outputDir);

  res.json({
    status: "Scraping iniciado",
    baseUrl,
    outputDir
  });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
