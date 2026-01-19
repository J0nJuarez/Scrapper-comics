import path from "path";
import fs from "fs";
import { existe } from "../utils/siExiste.js";
import { descargarPagina } from "../scraper/descargarPagina.js";
import { crearCBR } from "../utils/crearCBR.js";

export async function crawlVolumenes(baseUrl, outputDir) {
  let volumen = 1;

  while (true) {
    const firstPage = `${baseUrl}/${volumen}/1`;
    const volumenExists = await existe(firstPage);

    if (!volumenExists) {
      console.log(`Volumen ${volumen} no existe. Final del proceso.`);
      break;
    }

    console.log(`Volumen ${volumen}`);

    let page = 1;

    while (true) {
      const pageUrl = `${baseUrl}/${volumen}/${page}`;
      const pageExists = await existe(pageUrl);

      if (!pageExists) {
        console.log(`Fin volumen ${volumen}`);
        break;
      }

      await descargarPagina(pageUrl, volumen, page, outputDir);
      page++;
    }

    const volumenDir = path.join(outputDir, `volumen_${volumen}`);

    if (fs.existsSync(volumenDir)) {
      console.log(`Creando CBR volumen ${volumen}...`);
      await crearCBR(volumenDir, outputDir, volumen);

      fs.rmSync(volumenDir, { recursive: true, force: true });
    }

    volumen++;
  }
}
