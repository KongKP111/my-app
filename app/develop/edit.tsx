"use client";

import { useState } from "react";

interface EditProps {
  id: number;
  currentData: { name: string; price: number; imageUrl: string };
}

export default function EditPost({ id, currentData }: EditProps) {
  const [updatedPost, setUpdatedPost] = useState(currentData);

  const handleEditPost = async () => {
    const res = await fetch("/api/posts/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedPost }),
    });

    if (res.ok) {
      alert("แก้ไขโพสต์สำเร็จ");
    } else {
      alert("เกิดข้อผิดพลาดในการแก้ไขโพสต์");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={updatedPost.name}
        onChange={(e) => setUpdatedPost({ ...updatedPost, name: e.target.value })}
      />
      <input
        type="text"
        value={updatedPost.price}
        onChange={(e) => setUpdatedPost({ ...updatedPost, price: parseFloat(e.target.value) })}
      />
      <input
        type="text"
        value={updatedPost.imageUrl}
        onChange={(e) => setUpdatedPost({ ...updatedPost, imageUrl: e.target.value })}
      />
      <button onClick={handleEditPost}>บันทึก</button>
    </div>
  );
}
