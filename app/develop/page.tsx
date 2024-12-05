'use client';

import { useState, useEffect } from 'react';

// Define the type for a game
interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function DeveloperPage() {
  const [formData, setFormData] = useState({ id: '', name: '', price: '', imageUrl: '' });
  const [games, setGames] = useState<Game[]>([]); // Define the type for `games`

  useEffect(() => {
    fetchGames();
  }, []);

  // Fetch all games
  const fetchGames = async () => {
    try {
      const res = await fetch('/api/games');
      const data: Game[] = await res.json();
      setGames(data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  // Add a new game
  const handleAdd = async () => {
    try {
      const response = await fetch('/api/games/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Add Game Error: ${response.status} - ${errorText}`);
        alert('Failed to add game. Check console for details.');
        return;
      }
  
      const newGame = await response.json();
      setGames((prev) => [...prev, newGame]);
      setFormData({ id: '', name: '', price: '', imageUrl: '' });
    } catch (error) {
      console.error('Unexpected Add Game Error:', error);
      alert('An unexpected error occurred while adding the game.');
    }
  };
  
  
  

  // Edit an existing game
  const handleEdit = async () => {
    try {
      const response = await fetch('/api/games/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: parseInt(formData.id),
          name: formData.name,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Edit Game Error: ${response.status} - ${errorText}`);
        alert('Failed to edit game. Check console for details.');
        return;
      }
  
      const updatedGame = await response.json();
      setGames((prev) =>
        prev.map((game) => (game.id === updatedGame.id ? updatedGame : game))
      );
      setFormData({ id: '', name: '', price: '', imageUrl: '' });
    } catch (error) {
      console.error('Unexpected Edit Game Error:', error);
      alert('An unexpected error occurred while editing the game.');
    }
  };
  
  

  // Delete a game
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/games/delete', { // ตรวจสอบ URL ว่าตรงกับ API
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), // ส่ง ID ไปยัง API
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Delete Game Error: ${response.status} - ${errorText}`);
        alert('Failed to delete game. Check console for details.');
        return;
      }
  
      setGames((prev) => prev.filter((game) => game.id !== id));
    } catch (error) {
      console.error('Unexpected Delete Game Error:', error);
      alert('An unexpected error occurred while deleting the game.');
    }
  };
  
  
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Page</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Game Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={formData.id ? handleEdit : handleAdd}
          className={`p-2 text-white ${
            formData.id ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {formData.id ? 'Edit Game' : 'Add Game'}
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td className="border border-gray-300 p-2">{game.id}</td>
              <td className="border border-gray-300 p-2">{game.name}</td>
              <td className="border border-gray-300 p-2">${game.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() =>
                    setFormData({
                      id: game.id.toString(),
                      name: game.name,
                      price: game.price.toString(),
                      imageUrl: game.imageUrl,
                    })
                  }
                  className="bg-yellow-500 text-white p-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-500 text-white p-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
