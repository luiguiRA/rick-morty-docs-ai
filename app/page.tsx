import Link from "next/link";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  image: string;
};

export default async function HomePage() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Error al cargar personajes");
  }

  const data = await res.json();
  const characters: Character[] = data.results;

  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-8 text-center border-b-4 pb-4">
        Personajes de Rick and Morty
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {characters.map((char) => (
          <Link
            href={`/character/${char.id}`}
            key={char.id}
            className="border-2 border-green-600 rounded-lg p-4 shadow-md hover:shadow-green-400 transition block text-center"
          >
            <Image
              src={char.image}
              alt={char.name}
              width={200}
              height={200}
              className="rounded-lg mx-auto mb-3 border-2 border-green-400"
              priority
            />
            <h2 className="text-lg font-semibold">{char.name}</h2>
          </Link>
        ))}
      </div>
      <footer className="text-center py-6 text-sm text-green-800 mt-10 border-t border-green-700">
        Hecho con 💚 usando Next.js y la API de Rick & Morty — por @LuiguiRa
      </footer>
    </main>
  );
}
