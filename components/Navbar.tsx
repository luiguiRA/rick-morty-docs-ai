"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [id, setId] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) {
      router.push(`/character/${id}`);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Rick & Morty Docs</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="number"
          placeholder="Buscar por ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          Buscar
        </button>
      </form>
    </nav>
  );
}
