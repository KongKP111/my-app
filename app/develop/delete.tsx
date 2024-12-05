"use client";

interface DeleteProps {
  onDelete: (id: number) => void; // ต้องการพารามิเตอร์ `id`
  id: number; // เพิ่ม property id ใน props
}

export default function DeleteGame({ onDelete, id }: DeleteProps) {
  return (
    <button
      onClick={() => {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเกมนี้?")) {
          onDelete(id); // ส่ง id ไปยังฟังก์ชัน onDelete
        }
      }}
      className="bg-red-500 text-white py-1 px-2 rounded"
    >
      ลบ
    </button>
  );
}
