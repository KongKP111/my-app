"use client";

interface DeleteProps {
  id: number;
}

export default function DeletePost({ id }: DeleteProps) {
  const handleDeletePost = async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?")) {
      const res = await fetch(`/api/posts/delete?id=${id}`, { method: "DELETE" });

      if (res.ok) {
        alert("ลบโพสต์สำเร็จ");
      } else {
        alert("เกิดข้อผิดพลาดในการลบโพสต์");
      }
    }
  };

  return <button onClick={handleDeletePost}>ลบ</button>;
}
