export async function existe(url) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    clearTimeout(id);
    console.log("Analizando si existe:", url, res.status);

    return res.status !== 404 && res.status !== 500;
  } catch (e) {
    console.log("No existe:", url);
    return false;
  }
}
