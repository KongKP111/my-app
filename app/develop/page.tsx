"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newGame, setNewGame] = useState({ name: "", price: 0, imageUrl: "" });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/develop/api/newpost");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();

    const fetchGames = async () => {
      const res = await fetch("/api/games");
      const data = await res.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  const handleNewPost = async () => {
    const res = await fetch("/api/develop/api/newpost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (res.ok) {
      const post = await res.json();
      setPosts([...posts, post]);
    }
  };

  const handleDeletePost = async (id: number) => {
    await fetch(`/api/develop/api/deletepost?id=${id}`, { method: "DELETE" });
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditPost = async (id: number, title: string, content: string) => {
    const res = await fetch("/api/develop/api/editpost", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });
    if (res.ok) {
      const updatedPost = await res.json();
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Manage Posts</h2>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="border p-2 mr-2"
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleNewPost} className="bg-blue-500 text-white px-4 py-2">
            Add Post
          </button>
        </div>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-2 mb-2">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => handleDeletePost(post.id)} className="text-red-500">
                Delete
              </button>
              <button
                onClick={() =>
                  handleEditPost(post.id, prompt("New Title") || "", prompt("New Content") || "")
                }
                className="text-blue-500 ml-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Manage Games</h2>
        <div>
          <input
            type="text"
            placeholder="Game Name"
            value={newGame.name}
            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newGame.price}
            onChange={(e) => setNewGame({ ...newGame, price: parseFloat(e.target.value) })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newGame.imageUrl}
            onChange={(e) => setNewGame({ ...newGame, imageUrl: e.target.value })}
            className="border p-2 mr-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2">Add Game</button>
        </div>
      </section>
    </div>
  );
}
