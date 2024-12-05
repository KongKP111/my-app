"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      router.push("/");
    }
  }, []);

  return (
    <main>
      <h1>Admin Page</h1>
      <p>คุณเข้าสู่ระบบในฐานะ Admin</p>
    </main>
  );
}
