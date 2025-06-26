import Link from "next/link";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  image: string;
};

export default async function HomePage() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  if (!res.ok) {
    throw new Error("Error al cargar personajes");
  }

  const data = await res.json();
  const characters: Character[] = data.results;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Personajes de Rick and Morty</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <Link
            href={`/character/${char.id}`}
            key={char.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition block text-center"
          >
            <Image
              src={char.image}
              alt={char.name}
              width={200}
              height={200}
              className="rounded mx-auto mb-2"
            />
            <h2 className="text-lg font-medium">{char.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
