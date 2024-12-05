"use client";

import { useState } from "react";

interface AddProps {
  onAdd: (game: { name: string; price: number; imageUrl: string }) => void;
}

export default function AddGame({ onAdd }: AddProps) {
  const [newGame, setNewGame] = useState({ name: "", price: "", imageUrl: "" });

  const handleAdd = () => {
    if (!newGame.name || !newGame.price || !newGame.imageUrl) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const game = {
      name: newGame.name,
      price: parseFloat(newGame.price),
      imageUrl: newGame.imageUrl,
    };

    onAdd(game);
    setNewGame({ name: "", price: "", imageUrl: "" }); // รีเซ็ตฟอร์ม
  };

  return (
    <section>
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
        onClick={handleAdd}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        เพิ่มเกม
      </button>
    </section>
  );
}
