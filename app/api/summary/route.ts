export const runtime = "nodejs";

const MODEL = "models/gemini-2.0-flash";

interface Character {
  id: number;
  name: string;
}

function buildGeminiUrl(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("la clave GEMINI no esta definida");
  return `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${apiKey}`;
}

function createPrompt(character: Character): string {
  return `Comportate como un fan experto de Rick and Morty. A partir de los siguientes datos JSON, escribe un resumen 
  creativo en tono entusiasta de máximo 3 líneas sobre este personaje:\n\n${JSON.stringify(
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error interno:", error.message);
    } else {
      console.error("Error interno desconocido:", error);
    }
    return jsonResponse({ error: "Error interno del servidor." }, 500);
  }
}
