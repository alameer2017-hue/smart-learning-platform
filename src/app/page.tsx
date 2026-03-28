"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f6f8, #e8f4f8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Tajawal, sans-serif",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 700, width: "100%" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔬</div>
        <h1 style={{ fontSize: 28, color: "#1a5276", marginBottom: 8, fontWeight: 800 }}>
          منصة التعلم الذكية
        </h1>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          وحدة الشغل والطاقة — الصف الخامس الابتدائي
        </p>

        <Link
          href="/lesson/L1-1"
          style={{
            display: "block",
            padding: "16px 32px",
            background: "linear-gradient(135deg, #1a5276, #2980b9)",
            color: "#fff",
            borderRadius: 14,
            textDecoration: "none",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Tajawal",
            marginBottom: 24,
          }}
        >
          📖 الدرس الأول: متى يحدث الشغل؟
        </Link>


        <p style={{ fontSize: 12, color: "#aaa", marginTop: 24 }}>
          الإصدار 1.0 — MVP
        </p>
      </div>
    </div>
  );
}