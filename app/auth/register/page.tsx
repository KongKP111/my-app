"use client";

import { useState, FormEvent, ChangeEvent } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
        return;
      }

      const data = await response.json();
      setSuccessMessage(data.message);

      // Redirect to the homepage after successful registration
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-blue-900 to-green-900 p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-green-800/80 to-blue-900/80 rounded-xl shadow-2xl border border-green-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-green-700 to-blue-800 text-white p-6 text-center">
          <h1 className="text-3xl font-extrabold text-green-100">Register</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-600/30 border border-red-500 text-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-600/30 border border-green-500 text-green-200 p-3 rounded-lg">
              {successMessage}
            </div>
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Register
          </button>
        </form>
        
        <div className="p-6 text-center">
          <p className="text-green-200">
            Already have an account? 
            <a 
              href="/auth/login" 
              className="ml-2 text-green-100 hover:text-white underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}