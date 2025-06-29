"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [id, setId] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) {
      router.push(`/character/${id}`);
    }
  };
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setId("");
    }
  }, [pathname]);

  return (
    <nav className="bg-[#20232a] text-[#61dafb] p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold font-[‘Comic Sans MS’, cursive, sans-serif] drop-shadow-md">
        Rick & Morty Docs
      </h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="number"
          min="0"
          placeholder="Buscar por ID"
          value={id}
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) >= 0 || value === "") {
              setId(value);
            }
          }}
          className="p-2 rounded border-2 border-[#61dafb] bg-[#282c34] text-white placeholder-[#61dafb] focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
        />
        <button
          type="submit"
          disabled={!id.trim()}
          className="bg-[#61dafb] hover:bg-[#21a1f1] text-black px-4 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Buscar
        </button>
      </form>
    </nav>
  );
}
