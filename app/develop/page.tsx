"use client";

import { useState } from "react";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function DevelopPage() {
  const [games, setGames] = useState<Game[]>([]); // รายการเกม
  const [newGame, setNewGame] = useState({ name: "", price: "", imageUrl: "" }); // เพิ่มเกมใหม่
  const [editingGame, setEditingGame] = useState<Game | null>(null); // เกมที่แก้ไข

  // ฟังก์ชันเพิ่มเกมใหม่
  const handleAddGame = () => {
    if (!newGame.name || !newGame.price || !newGame.imageUrl) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const id = games.length ? games[games.length - 1].id + 1 : 1; // สร้าง ID ใหม่
    const game: Game = {
      id,
      name: newGame.name,
      price: parseFloat(newGame.price),
      imageUrl: newGame.imageUrl,
    };

    setGames([...games, game]); // เพิ่มเกมใหม่ลงในรายการ
    setNewGame({ name: "", price: "", imageUrl: "" }); // รีเซ็ตฟอร์ม
    alert("เพิ่มเกมสำเร็จ");
  };

  // ฟังก์ชันแก้ไขเกม
  const handleEditGame = () => {
    if (!editingGame) return;

    setGames(
      games.map((game) =>
        game.id === editingGame.id ? editingGame : game
      )
    );

    setEditingGame(null); // ยกเลิกการแก้ไข
    alert("แก้ไขเกมสำเร็จ");
  };

  // ฟังก์ชันลบเกม
  const handleDeleteGame = (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเกมนี้?")) {
      setGames(games.filter((game) => game.id !== id));
      alert("ลบเกมสำเร็จ");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">จัดการเกม</h1>

      {/* ฟอร์มเพิ่มเกม */}
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
          onChange={(e) => setNewGame({ ...newGame, imageUrl: e.target.value })}
          className="block mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddGame}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          เพิ่มเกม
        </button>
      </section>

      {/* ฟอร์มแก้ไขเกม */}
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
            value={editingGame.price.toString()}
            onChange={(e) =>
              setEditingGame({
                ...editingGame,
                price: parseFloat(e.target.value),
              })
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

      {/* รายการเกม */}
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
