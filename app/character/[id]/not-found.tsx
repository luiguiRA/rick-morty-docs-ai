import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8 text-center text-light-100 font-mono">
      <h1 className="text-3xl font-bold mb-4">❌ Personaje no encontrado</h1>
      <p className="text-lg mb-6">
        El personaje que estás buscando no existe o el ID es incorrecto.
      </p>
      <Link
        href="/"
        className="inline-block bg-lime-400 text-black px-5 py-2 rounded-md hover:bg-lime-300 transition-colors"
      >
        ← Volver al catálogo
      </Link>
    </main>
  );
}
