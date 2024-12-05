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

  // Fetch games on mount
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games");
      if (res.ok) {
        const data = await res.json();
        setGames(data);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
      });
      if (res.ok) {
        fetchGames();
        setNewGame({ name: "", price: 0, imageUrl: "" });
      }
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  const handleEdit = async () => {
    if (!editingGame) return;
    try {
      const res = await fetch("/api/games", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGame),
      });
      if (res.ok) {
        fetchGames();
        setEditingGame(null);
      }
    } catch (error) {
      console.error("Error editing game:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/games?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchGames();
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    }
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
        <button onClick={handleAdd}>Add Game</button>
      </div>

      {/* Edit Game */}
      {editingGame && (
        <div>
          <h2>Edit Game</h2>
          <input
            type="text"
            placeholder="Game Name"
            value={editingGame.name}
            onChange={(e) =>
              setEditingGame({ ...editingGame, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={editingGame.price}
            onChange={(e) =>
              setEditingGame({ ...editingGame, price: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editingGame.imageUrl}
            onChange={(e) =>
              setEditingGame({ ...editingGame, imageUrl: e.target.value })
            }
          />
          <button onClick={handleEdit}>Save Changes</button>
          <button onClick={() => setEditingGame(null)}>Cancel</button>
        </div>
      )}

      {/* Games List */}
      <div>
        <h2>Games List</h2>
        {games.map((game) => (
          <div key={game.id}>
            <p>Name: {game.name}</p>
            <p>Price: {game.price}</p>
            <img src={game.imageUrl} alt={game.name} width={100} />
            <button onClick={() => setEditingGame(game)}>Edit</button>
            <button onClick={() => handleDelete(game.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
