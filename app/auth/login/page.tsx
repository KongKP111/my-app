"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // Save user details in localStorage for later use
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        if (data.role === "admin") {
          window.location.href = "/develop";
        } else {
          window.location.href = "/store";
        }
        
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-800 to-black p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-green-900/80 to-green-950/80 rounded-xl shadow-2xl border border-green-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6 text-center">
          <h1 className="text-3xl font-extrabold text-green-200">Login</h1>
        </div>
        
        <div className="p-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
          >
            Login
          </button>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-green-200">
            Don't have an account? 
            <a 
              href="/auth/register" 
              className="ml-2 text-green-100 hover:text-white underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}