// src/components/lesson/SummaryScreen.tsx
"use client";

import type { Mode, Lesson } from "@/types";

interface Props {
  mode: Mode;
  isTeacher: boolean;
  lesson: Lesson;
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  openChat: (actId: string) => void;
  chatInteractions: number;
  simDataCount: number;
}

export default function SummaryScreen({ isTeacher, lesson, responses, chatInteractions, simDataCount }: Props) {
  const responseCount = Object.keys(responses).length;

  return (
    <div style={{ textAlign: "center" }}>
      {/* ── Summary Points ── */}
      <div style={{ background: "linear-gradient(135deg, #1a5276, #2980b9, #3498db)", borderRadius: 20, padding: 24, color: "#fff", marginBottom: 24, textAlign: "right" }}>
        <h3 style={{ fontFamily: "Tajawal", fontSize: 20, margin: "0 0 16px", textAlign: "center" }}>
          📋 الملخص الختامي للدرس
        </h3>
        {lesson.summaryPoints.map((point, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, justifyContent: "flex-end" }}>
            <span style={{ fontFamily: "Tajawal", fontSize: 14, lineHeight: 1.8 }}>{point}</span>
            <span style={{
              width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, flexShrink: 0,
            }}>{i + 1}</span>
          </div>
        ))}
      </div>

      {/* ── Celebration ── */}
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontFamily: "Tajawal", fontSize: 22, color: "#1a5276", marginBottom: 8 }}>
        أحسنت! أكملت الدرس الأول
      </h3>
      <p style={{ fontFamily: "Tajawal", fontSize: 14, color: "#888" }}>
        الدرس التالي: رحلة الطاقة داخل النظام الفيزيائي
      </p>

      {/* ── Teacher Stats ── */}
      {isTeacher && (
        <div style={{
          marginTop: 20, background: "#fff3cd", borderRadius: 14, padding: 18,
          textAlign: "right", fontFamily: "Tajawal",
        }}>
          <h4 style={{ color: "#856404", margin: "0 0 10px", fontSize: 15 }}>📊 ملخص بيانات الدرس</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#2980b9" }}>{responseCount}</div>
              <div style={{ fontSize: 12, color: "#856404" }}>إجابات مسجلة</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#8e44ad" }}>{chatInteractions}</div>
              <div style={{ fontSize: 12, color: "#856404" }}>تفاعلات الروبوت</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#27ae60" }}>{simDataCount}</div>
              <div style={{ fontSize: 12, color: "#856404" }}>تجارب محاكاة</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
