"use client";

import { useState, useEffect } from "react";

export default function DevelopPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ gamename: "", price: "", imageUrl: "" });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleAdd = async () => {
    const res = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (res.ok) {
      fetchPosts();
      setNewPost({ gamename: "", price: "", imageUrl: "" });
    }
  };

  const handleEdit = async () => {
    if (!editingPost) return;

    const res = await fetch("/api/posts/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPost),
    });
    if (res.ok) {
      fetchPosts();
      setEditingPost(null);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/posts/delete?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchPosts();
  };

  return (
    <div className="p-4">
      <h1>Develop Page</h1>

      <div>
        <h2>Add New Post</h2>
        <input
          type="text"
          placeholder="Gamename"
          value={newPost.gamename}
          onChange={(e) => setNewPost({ ...newPost, gamename: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newPost.price}
          onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPost.imageUrl}
          onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div>
        <h2>Posts</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.gamename}</h3>
            <p>{post.price}</p>
            <img src={post.imageUrl} alt={post.gamename} />
            <button onClick={() => setEditingPost(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>

      {editingPost && (
        <div>
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editingPost.gamename}
            onChange={(e) => setEditingPost({ ...editingPost, gamename: e.target.value })}
          />
          <input
            type="text"
            value={editingPost.price}
            onChange={(e) => setEditingPost({ ...editingPost, price: e.target.value })}
          />
          <input
            type="text"
            value={editingPost.imageUrl}
            onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      )}
    </div>
  );
}
