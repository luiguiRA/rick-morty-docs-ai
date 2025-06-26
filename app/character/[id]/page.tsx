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
    <main className="p-6 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-center">{character.name}</h1>

      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className="rounded-lg mb-6 mx-auto border-4 border-green-400 shadow-xl"
      />

      <ul className="text-lg space-y-2 mb-6">
        <li>
          <strong>Estado:</strong> {character.status}
        </li>
        <li>
          <strong>Especie:</strong> {character.species}
        </li>
        <li>
          <strong>Género:</strong> {character.gender}
        </li>
      </ul>

      <div className="mt-8">
        <GenerateSummaryButton character={character} />
      </div>
    </main>
  );
}
