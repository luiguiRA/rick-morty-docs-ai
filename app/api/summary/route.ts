export const runtime = "nodejs";
process.env;

const MODEL = "models/gemini-2.0-flash";

function buildGeminiUrl(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("la clave GEMINI no esta definida");
  return `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${apiKey}`;
}

function createPrompt(character: any): string {
  return `Basado en los siguientes datos JSON de los personaje de la serie Rick and Morty, compórtate como el mismo personaje que se esta solicitando y crea un resumen acerca del mismo personaje. 
  El resumen de 3 líneas debe capturar la esencia del personaje, sus aventuras y su impacto en el universo de Rick and Morty. Aquí están los datos del personaje:\n\n${JSON.stringify(
    character
  )}`;
}

function jsonResponse(data: object, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { character } = await req.json();

    if (!character) {
      return jsonResponse(
        { error: "No se recibieron datos del personaje" },
        400
      );
    }
    const prompt = createPrompt(character);
    const url = buildGeminiUrl();

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return jsonResponse(
        { error: "Error desde Gemini: " + errorText },
        geminiRes.status
      );
    }
    const data = await geminiRes.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo generar resumen.";

    return jsonResponse({ text: responseText });
  } catch (error: any) {
    console.error("Error interno:", error);
    return jsonResponse({ error: "Error interno del servidor." }, 500);
  }
}
