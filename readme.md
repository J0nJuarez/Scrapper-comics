# Comic Scraper (Node.js)

Este proyecto es un **scraper de cómics** desarrollado en **Node.js** que permite descargar automáticamente todas las imágenes de los volúmenes de un cómic alojado en **readcomicsonline.ru**.

El proyecto puede ejecutarse de dos formas:
- Desde la terminal (CLI)
- Como servidor HTTP con un endpoint REST

Ambos modos reutilizan exactamente el mismo código de scraping.

---

## Web compatible

Actualmente el scraper está diseñado para funcionar con:

- https://readcomicsonline.ru

### Suposiciones de la web
- Cada volumen está disponible en:
  `<URL_BASE>/<volumen>`
- Las imágenes están dentro del selector:
  `#ppp img`
- Los volúmenes son consecutivos (`/1`, `/2`, `/3`, ...)
- Cuando un volumen devuelve **404**, el scraping termina

Ejemplo de URL base:
```
https://readcomicsonline.ru/comic/doctor-strange-the-punisher-magic-bullets-infinite
```

---

## Instalación

```bash
npm install
```

Requiere **Node.js 18+**

---

## Uso desde la terminal (CLI)

```bash
npm run scrape <URL_BASE> <CARPETA_SALIDA>
```

Ejemplo:
```bash
npm run scrape https://readcomicsonline.ru/comic/XXX ./output
```

Las imágenes se guardan como:
```
v1_1.jpg
v1_2.jpg
v2_1.jpg
...
```

---

## Uso como servidor HTTP

### Arrancar servidor
```bash
npm start
```

Servidor disponible en:
```
http://localhost:3000
```

### Endpoint

**POST /scrape**

Body JSON:
```json
{
  "baseUrl": "https://readcomicsonline.ru/comic/XXX",
  "outputDir": "./output"
}
```

Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/scrape   -H "Content-Type: application/json"   -d '{"baseUrl":"https://readcomicsonline.ru/comic/XXX"}'
```
