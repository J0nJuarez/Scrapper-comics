import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";


export async function descargarPagina(pageUrl, volumen, page, outputDir) {
  const res = await fetch(pageUrl);
  const html = await res.text();
  const dom = new JSDOM(html);
  const images = dom.window.document.querySelectorAll("#ppp img");

  const volumenDir = path.join(outputDir, `volumen_${volumen}`);
  
  // Crear carpeta del volumen si no existe
  if (!fs.existsSync(volumenDir)) {
    fs.mkdirSync(volumenDir, { recursive: true });
  }

  let index = 1;

  for (const img of images) {
    if (!img.src) continue;

    const imgUrl = new URL(img.src, pageUrl).href;
    const imgRes = await fetch(imgUrl);
    const buffer = await imgRes.arrayBuffer();

    const ext = path.extname(imgUrl).split("?")[0] || ".jpg";
    const filename = `v${volumen}_p${page}_${index}${ext}`;

    fs.writeFileSync(
      path.join(volumenDir, filename),
      Buffer.from(buffer)
    );

    index++;
  }
}
