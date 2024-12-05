"use client";

import { useState } from "react";

export default function AddPost() {
  const [newPost, setNewPost] = useState({ name: "", price: "", imageUrl: "" });

  const handleAddPost = async () => {
    const res = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      alert("เพิ่มโพสต์สำเร็จ");
      setNewPost({ name: "", price: "", imageUrl: "" });
    } else {
      alert("เกิดข้อผิดพลาดในการเพิ่มโพสต์");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ชื่อเกม"
        value={newPost.name}
        onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="ราคา"
        value={newPost.price}
        onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL รูปภาพ"
        value={newPost.imageUrl}
        onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
      />
      <button onClick={handleAddPost}>เพิ่มโพสต์</button>
    </div>
  );
}
