import { exec } from "child_process";
import path from "path";
import fs from "fs";

export function crearCBR(volumenDir, outputDir, volumen) {
  return new Promise((resolve, reject) => {
    console.log(`Iniciando creación de CBR volumen ${volumen}`);
    
    // Convertir a rutas absolutas
    const absVolumenDir = path.resolve(volumenDir);
    const absOutputDir = path.resolve(outputDir);
    const cbrPath = path.join(absOutputDir, `volumen_${volumen}.cbr`);

    console.log(`   Origen: ${absVolumenDir}`);
    console.log(`   CBR: ${cbrPath}`);

    if (!fs.existsSync(absVolumenDir)) {
      return reject(new Error(`Directorio no existe: ${absVolumenDir}`));
    }

    const files = fs.readdirSync(absVolumenDir);

    // Usar tar en lugar de zip (más compatible en Linux)
    const command = `cd "${absVolumenDir}" && tar -czf "${cbrPath}" . && echo "CBR creado"`;

    console.log(`   Ejecutando compresión...`);

    exec(command, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        if (stderr) console.error(`${stderr}`);
        return reject(error);
      }

      setTimeout(() => {
        if (fs.existsSync(cbrPath)) {
          const stats = fs.statSync(cbrPath);
          console.log(`CBR creado: ${cbrPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          resolve(cbrPath);
        } else {
          reject(new Error("No se creó el archivo CBR"));
        }
      }, 1000);
    });
  });
}
