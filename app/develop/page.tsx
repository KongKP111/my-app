"use client";

import { useState, useEffect } from "react";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function DevelopPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({ name: "", price: 0, imageUrl: "" });
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
  };

  const handleAdd = async () => {
    const res = await fetch("/api/games/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    });

    if (res.ok) {
      fetchGames();
      setNewGame({ name: "", price: 0, imageUrl: "" });
    }
  };

  const handleEdit = async () => {
    if (!editingGame) return;

    const res = await fetch("/api/games/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingGame),
    });

    if (res.ok) {
      fetchGames();
      setEditingGame(null);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/games/delete?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) fetchGames();
  };

  return (
    <div className="p-4">
      <h1>Develop Page</h1>

      {/* Add New Game */}
      <div>
        <h2>Add New Game</h2>
        <input
          type="text"
          placeholder="Game Name"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newGame.price}
          onChange={(e) => setNewGame({ ...newGame, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newGame.imageUrl}
          onChange={(e) => setNewGame({ ...newGame, imageUrl: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Game List */}
      <div>
        <h2>Games</h2>
        {games.map((game) => (
          <div key={game.id}>
            <h3>{game.name}</h3>
            <p>{game.price}</p>
            <img src={game.imageUrl} alt={game.name} />
            <button onClick={() => setEditingGame(game)}>Edit</button>
            <button onClick={() => handleDelete(game.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Edit Game */}
      {editingGame && (
        <div>
          <h2>Edit Game</h2>
          <input
            type="text"
            value={editingGame.name}
            onChange={(e) => setEditingGame({ ...editingGame, name: e.target.value })}
          />
          <input
            type="number"
            value={editingGame.price}
            onChange={(e) => setEditingGame({ ...editingGame, price: Number(e.target.value) })}
          />
          <input
            type="text"
            value={editingGame.imageUrl}
            onChange={(e) => setEditingGame({ ...editingGame, imageUrl: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      )}
    </div>
  );
}
