"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  // PPPPPPPP???S

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("คุณไม่ได้รับอนุญาตให้เข้าหน้านี้");
      router.push("/");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Page</h1>
      <p>ยินดีต้อนรับ Admin คุณสามารถจัดการโพสต์ได้ที่นี่</p>
      {/* เพิ่มฟังก์ชันสำหรับแก้ไข เพิ่ม และลบโพสต์ */}
    </main>
  );
}
