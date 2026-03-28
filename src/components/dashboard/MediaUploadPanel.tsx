"use client";

import { useState } from "react";

export default function MediaUploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("images");
  const [uploading, setUploading] = useState(false);
  const [resultUrl, setResultUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("اختر ملفًا أولًا");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    setUploading(true);
    setResultUrl("");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setUploading(false);

    if (!res.ok) {
      alert(json.error || "حدث خطأ في الرفع");
      return;
    }

    setResultUrl(json.url);
  };

  return (
    <div
      dir="rtl"
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 14,
        border: "1px solid #ddd",
        maxWidth: 500,
        fontFamily: "Tajawal, sans-serif",
        margin: "20px auto",
      }}
    >
      <h3 style={{ marginTop: 0 }}>رفع صورة أو فيديو</h3>

      <div style={{ marginBottom: 12 }}>
        <label>نوع الملف:</label>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
        >
          <option value="images">صور</option>
          <option value="videos">فيديوهات</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="file"
          accept={folder === "images" ? "image/*" : "video/*"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "10px 16px",
          background: "#2980b9",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        {uploading ? "جارٍ الرفع..." : "رفع الملف"}
      </button>

      {resultUrl && (
        <div style={{ marginTop: 16 }}>
          <strong>تم الرفع بنجاح:</strong>
          <div style={{ marginTop: 8, wordBreak: "break-all" }}>{resultUrl}</div>
        </div>
      )}
    </div>
  );
}