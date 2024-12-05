"use client";

import { useState } from "react";

interface EditProps {
  game: { id: number; name: string; price: number; imageUrl: string };
  onEdit: (updatedGame: { id: number; name: string; price: number; imageUrl: string }) => void;
  onCancel: () => void;
}

export default function EditGame({ game, onEdit, onCancel }: EditProps) {
  const [editingGame, setEditingGame] = useState(game);

  const handleSave = () => {
    if (!editingGame.name || !editingGame.price || !editingGame.imageUrl) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    onEdit(editingGame);
  };

  return (
    <section>
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
        onClick={handleSave}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        บันทึก
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
      >
        ยกเลิก
      </button>
    </section>
  );
}
