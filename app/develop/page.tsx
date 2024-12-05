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
  const [newGame, setNewGame] = useState({ name: "", price: "", imageUrl: "" });
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch("/api/games");
      const data = await res.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  const handleAddGame = async () => {
    // แปลง price เป็น number ก่อนส่ง
    const gameToAdd = {
      ...newGame,
      price: Number(newGame.price),
    };

    const res = await fetch("/api/games/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameToAdd),
    });

    if (res.ok) {
      const createdGame = await res.json();
      setGames([...games, createdGame]);
      setNewGame({ name: "", price: "", imageUrl: "" });
      alert("เพิ่มเกมสำเร็จ");
    } else {
      alert("เกิดข้อผิดพลาดในการเพิ่มเกม");
    }
  };

  const handleEditGame = async () => {
    if (!editingGame) return;

    // แปลง price เป็น number ก่อนส่ง
    const gameToEdit = {
      ...editingGame,
      price: Number(editingGame.price),
    };

    const res = await fetch("/api/games/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameToEdit),
    });

    if (res.ok) {
      const updatedGame = await res.json();
      setGames(
        games.map((game) =>
          game.id === updatedGame.id ? updatedGame : game
        )
      );
      setEditingGame(null);
      alert("แก้ไขเกมสำเร็จ");
    } else {
      alert("เกิดข้อผิดพลาดในการแก้ไขเกม");
    }
  };

  const handleDeleteGame = async (id: number) => {
    const res = await fetch(`/api/games/delete?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setGames(games.filter((game) => game.id !== id));
      alert("ลบเกมสำเร็จ");
    } else {
      alert("เกิดข้อผิดพลาดในการลบเกม");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Admin Page</h1>

      {/* Add Game */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">เพิ่มเกมใหม่</h2>
        <input
          type="text"
          placeholder="ชื่อเกม"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="ราคา"
          value={newGame.price}
          onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL รูปภาพ"
          value={newGame.imageUrl}
          onChange={(e) =>
            setNewGame({ ...newGame, imageUrl: e.target.value })
          }
          className="block mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddGame}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          เพิ่มเกม
        </button>
      </section>

      {/* Edit Game */}
      {editingGame && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">แก้ไขเกม</h2>
          <input
            type="text"
            placeholder="ชื่อเกม"
            value={editingGame.name}
            onChange={(e) =>
              setEditingGame({ ...editingGame, name: e.target.value })
            }
            className="block mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="ราคา"
            value={editingGame.price.toString()} // แปลงกลับเป็น string เพื่อให้ input ใช้งานได้
            onChange={(e) =>
              setEditingGame({ ...editingGame, price: Number(e.target.value) })
            }
            className="block mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="URL รูปภาพ"
            value={editingGame.imageUrl}
            onChange={(e) =>
              setEditingGame({ ...editingGame, imageUrl: e.target.value })
            }
            className="block mb-2 p-2 border rounded"
          />
          <button
            onClick={handleEditGame}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            บันทึก
          </button>
          <button
            onClick={() => setEditingGame(null)}
            className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
          >
            ยกเลิก
          </button>
        </section>
      )}

      {/* Game List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">เกมทั้งหมด</h2>
        <ul>
          {games.map((game) => (
            <li key={game.id} className="mb-4 p-4 border rounded shadow">
              <h3 className="text-xl font-bold">{game.name}</h3>
              <p>ราคา: {game.price}</p>
              <img
                src={game.imageUrl}
                alt={game.name}
                className="w-32 h-32 object-cover my-2"
              />
              <button
                onClick={() => setEditingGame(game)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDeleteGame(game.id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
