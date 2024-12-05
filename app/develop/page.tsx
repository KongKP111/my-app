"use client";

import { useState } from "react";
import AddGame from "./add";
import EditGame from "./edit";
import DeleteGame from "./delete";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function DevelopPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleAdd = (game: { name: string; price: number; imageUrl: string }) => {
    const id = games.length ? games[games.length - 1].id + 1 : 1;
    setGames([...games, { id, ...game }]);
  };

  const handleEdit = (updatedGame: Game) => {
    setGames(games.map((game) => (game.id === updatedGame.id ? updatedGame : game)));
    setEditingGame(null);
  };

  const handleDelete = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">จัดการเกม</h1>

      {!editingGame && <AddGame onAdd={handleAdd} />}
      {editingGame && (
        <EditGame
          game={editingGame}
          onEdit={handleEdit}
          onCancel={() => setEditingGame(null)}
        />
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">เกมทั้งหมด</h2>
        <ul>
    {games.map((game) => (
    <li key={game.id} className="mb-4 p-4 border rounded shadow">
      <h3 className="text-xl font-bold">{game.name}</h3>
      <p>ราคา: {game.price}</p>
      <img src={game.imageUrl} alt={game.name} className="w-32 h-32 object-cover my-2" />
      <button
        onClick={() => setEditingGame(game)}
        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
      >
        แก้ไข
      </button>
      <DeleteGame onDelete={handleDelete} id={game.id} /> {/* ส่ง id ของเกม */}
    </li>
  ))}
</ul>

      </section>
    </main>
  );
}
