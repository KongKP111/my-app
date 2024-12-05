"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // เก็บข้อมูลลงใน localStorage
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        // พาผู้ใช้ไปยังหน้าที่กำหนดตาม role
        if (data.email === "Admin1234@gmail.com") {
          router.push("/admin");
        } else {
          router.push("/store");
        }
      } else {
        alert("เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบข้อมูลของคุณ");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}
