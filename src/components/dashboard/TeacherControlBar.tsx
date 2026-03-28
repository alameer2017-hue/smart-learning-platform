// src/components/dashboard/TeacherControlBar.tsx
"use client";

import { useState } from "react";

interface Props {
  currentScreen: number;
  totalScreens: number;
  isPaused: boolean;
  onTogglePause: () => void;
}

// Demo student data — TODO: replace with real-time WebSocket data
const DEMO_STUDENTS = [
  { name: "أحمد", screen: 5, status: "active" as const },
  { name: "سارة", screen: 3, status: "active" as const },
  { name: "محمد", screen: 6, status: "active" as const },
  { name: "نورة", screen: 2, status: "idle" as const },
  { name: "خالد", screen: 1, status: "idle" as const },
];

export default function TeacherControlBar({ currentScreen, totalScreens, isPaused, onTogglePause }: Props) {
  const [showStudents, setShowStudents] = useState(false);

  return (
    <>
      <div style={{
        background: "#fff3cd", padding: "8px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid #ffc107",
        fontFamily: "Tajawal, sans-serif",
      }}>
        {/* ── Left: Actions ── */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={onTogglePause}
            style={{
              padding: "4px 12px",
              background: isPaused ? "#e74c3c" : "#27ae60",
              color: "#fff", border: "none", borderRadius: 6,
              fontFamily: "Tajawal", fontSize: 11, cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isPaused ? "⏸ متوقف — اضغط للاستئناف" : "▶ نشط — اضغط للإيقاف"}
          </button>

          <button
            onClick={() => setShowStudents(true)}
            style={{
              padding: "4px 12px",
              background: "#6c757d", color: "#fff",
              border: "none", borderRadius: 6,
              fontFamily: "Tajawal", fontSize: 11, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
            }}
          >
            👨‍🎓 متابعة الطلاب ({DEMO_STUDENTS.length})
          </button>
        </div>

        {/* ── Right: Info ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#856404" }}>
            الشاشة {currentScreen + 1} من {totalScreens}
          </span>
          <span style={{ fontSize: 12, color: "#856404", fontWeight: "bold" }}>
            📋 وضع المعلم
          </span>
        </div>
      </div>

      {/* ── Student List Modal ── */}
      {showStudents && (
        <div
          onClick={() => setShowStudents(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)", zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 16, padding: 24,
              width: 380, maxHeight: "70vh", overflowY: "auto",
              direction: "rtl", fontFamily: "Tajawal",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <button onClick={() => setShowStudents(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
              <h3 style={{ color: "#1a5276", margin: 0, fontSize: 18 }}>👨‍🎓 متابعة الطلاب</h3>
            </div>

            {/* ── Summary Bar ── */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, background: "#eafaf1", borderRadius: 8, padding: 8, textAlign: "center", fontSize: 12 }}>
                <strong style={{ color: "#27ae60", fontSize: 18 }}>{DEMO_STUDENTS.filter(s => s.status === "active").length}</strong>
                <br />نشط
              </div>
              <div style={{ flex: 1, background: "#fef5e7", borderRadius: 8, padding: 8, textAlign: "center", fontSize: 12 }}>
                <strong style={{ color: "#e67e22", fontSize: 18 }}>{DEMO_STUDENTS.filter(s => s.status === "idle").length}</strong>
                <br />خامل
              </div>
              <div style={{ flex: 1, background: "#ebf5fb", borderRadius: 8, padding: 8, textAlign: "center", fontSize: 12 }}>
                <strong style={{ color: "#2980b9", fontSize: 18 }}>{DEMO_STUDENTS.length}</strong>
                <br />إجمالي
              </div>
            </div>

            {/* ── Student List ── */}
            {DEMO_STUDENTS.map((student, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: i < DEMO_STUDENTS.length - 1 ? "1px solid #eee" : "none",
              }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{
                    background: student.status === "active" ? "#27ae60" : "#e67e22",
                    color: "#fff", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: "bold",
                  }}>
                    {student.status === "active" ? "نشط" : "خامل"}
                  </span>
                  <span style={{ fontSize: 12, color: "#888" }}>شاشة {student.screen}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: "bold" }}>{student.name}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "#eaf2f8", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 14,
                  }}>
                    {student.name[0]}
                  </div>
                </div>
              </div>
            ))}

            {/* ── Actions ── */}
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button style={{ flex: 1, padding: 10, background: "#2980b9", color: "#fff", border: "none", borderRadius: 8, fontFamily: "Tajawal", fontSize: 13, cursor: "pointer" }}>
                📢 إرسال رسالة للجميع
              </button>
              <button style={{ flex: 1, padding: 10, background: "#e67e22", color: "#fff", border: "none", borderRadius: 8, fontFamily: "Tajawal", fontSize: 13, cursor: "pointer" }}>
                🔒 قفل الشاشة
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
