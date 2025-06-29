import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import GenerateSummaryButton from "@/components/GenerateSummaryButton";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  [key: string]: any;
};

async function getCharacter(id: string): Promise<Character | null> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function CharacterPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const character = await getCharacter(id);

  if (!character) notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto font-mono">
      <Link
        href="/"
        className="inline-block mb-6 text-lime-400 hover:text-lime-300 transition-colors duration-200"
      >
        ← Volver al catálogo
      </Link>

      <h1 className="text-4xl font-extrabold text-center text-lime-400 mb-6 drop-shadow-md">
        {character.name}
      </h1>

      <Image
        src={character.image}
        alt={character.name}
        width={240}
        height={240}
        className="mx-auto rounded-full border-4 border-lime-400 shadow-[0_0_25px_#84cc16] hover:scale-105 transition-transform duration-300"
      />

      <ul className="bg-black text-white mt-8 p-6 rounded-lg shadow-inner border border-lime-400 space-y-3 text-lg">
        <li>
          <span className="text-lime-300 font-semibold">🧬 Estado:</span>{" "}
          {character.status}
        </li>
        <li>
          <span className="text-lime-300 font-semibold">👽 Especie:</span>{" "}
          {character.species}
        </li>
        <li>
          <span className="text-lime-300 font-semibold">⚧️ Género:</span>{" "}
          {character.gender}
        </li>
      </ul>

      <pre className="bg-gray-900 text-green-300 mt-6 p-4 rounded-lg text-sm overflow-x-auto shadow-inner border border-green-700">
        {JSON.stringify(character, null, 2)}
      </pre>

      <div className="mt-10 text-center">
        <GenerateSummaryButton character={character} />
      </div>
    </main>
  );
}
