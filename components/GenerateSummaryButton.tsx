"use client";

import { useState } from "react";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  [key: string]: any;
};

type Props = {
  character: Character;
};

export default function GenerateSummaryButton({ character }: Props) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error ?? "Error generando el resumen.");
      }
      const data = await res.json();
      setSummary(data.text);
    } catch (err: any) {
      setError(err.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-green-500 text-black px-6 py-2 rounded-full hover:bg-green-400 disabled:opacity-50 shadow-lg border-2 border-black transition-all duration-200"
      >
        {loading ? "Generando resumen..." : "Generar resumen con IA"}
      </button>

      {error && <p className="text-red-600 mb-4 font-bold">Error: {error}</p>}

      {summary && (
        <div className="mt-6 bg-gradient-to-br from-purple-800 to-green-600 text-lime-200 p-6 rounded-lg shadow-xl border-4 border-yellow-300">
          <h2 className="text-2xl font-extrabold mb-3 text-yellow-300 drop-shadow-md">
            📜 Resumen generado:
          </h2>
          <p className="text-lg leading-relaxed tracking-wide">{summary}</p>
        </div>
      )}
    </div>
  );
}
