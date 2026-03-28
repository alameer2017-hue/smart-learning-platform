// src/components/lesson/WarmupScreen.tsx
"use client";

import type { Mode, Activity, WorkbookItem, MediaAsset, PerfExp } from "@/types";
import MediaViewer from "@/components/media/MediaViewer";

interface Props {
  mode: Mode;
  isTeacher: boolean;
  activity: Activity;
  workbookItem: WorkbookItem;
  mediaAssets: MediaAsset[];
  expectations: PerfExp[];
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  openChat: (actId: string) => void;
}

export default function WarmupScreen({ mode, isTeacher, activity, workbookItem, mediaAssets, expectations, responses, updateResponse, openChat }: Props) {
  const video = mediaAssets.find(m => m.kind === "VIDEO");
  const fields = workbookItem.inputFields;

  return (
    <div style={{ textAlign: "right" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, justifyContent: "flex-end" }}>
        <div>
          <h3 style={{ fontFamily: "Tajawal", fontSize: 18, color: "#1a5276", margin: 0 }}>
            نشاط (١): {activity.title}
          </h3>
          <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#888", margin: "4px 0 0" }}>
            ⏱ {activity.durationMin} دقائق
          </p>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e8f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          ❓
        </div>
      </div>

      {/* ── Objectives ── */}
      <div style={{ background: "#f0f7ff", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px dashed #aed6f1" }}>
        <p style={{ fontFamily: "Tajawal", fontSize: 13, color: "#2c3e50", margin: 0, lineHeight: 1.8 }}>
          <strong>الهدف:</strong> {activity.objectives.join(" • ")}
        </p>
      </div>

      {/* ── Video ── */}
      {video && <MediaViewer asset={video} isTeacher={isTeacher} />}

      {/* ── Chatbot Question ── */}
      <div style={{ background: "#eaf2f8", borderRadius: 12, padding: 16, marginTop: 16, marginBottom: 12, border: "1px solid #d4e6f1" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, justifyContent: "flex-end" }}>
          <span style={{ fontFamily: "Tajawal", fontSize: 14, fontWeight: "bold", color: "#1a5276" }}>سؤال الروبوت التعليمي</span>
          <span>🤖</span>
        </div>
        <p style={{ fontFamily: "Tajawal", fontSize: 14, color: "#2c3e50", margin: "0 0 12px", fontWeight: "bold", lineHeight: 1.8 }}>
          {activity.botQuestion}
        </p>

        {/* Main Answer */}
        <textarea
          value={responses[fields[0].key] || ""}
          onChange={e => updateResponse(fields[0].key, e.target.value)}
          placeholder="أجيب عن السؤال هنا..."
          rows={fields[0].rows || 3}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "2px solid #d4e6f1", fontFamily: "Tajawal", fontSize: 13, resize: "vertical", direction: "rtl", textAlign: "right", outline: "none", boxSizing: "border-box", lineHeight: 1.8 }}
        />
      </div>

      {/* ── Conclusion Fields ── */}
      <div style={{ background: "#f9f9f9", borderRadius: 12, padding: 16, border: "1px solid #eee" }}>
        <h4 style={{ fontFamily: "Tajawal", fontSize: 14, color: "#1a5276", margin: "0 0 12px" }}>أستنتج:</h4>
        {fields.slice(1).map(f => (
          <div key={f.key} style={{ marginBottom: 10 }}>
            <label style={{ fontFamily: "Tajawal", fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>
              {f.label}
            </label>
            <input
              value={responses[f.key] || ""}
              onChange={e => updateResponse(f.key, e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "2px solid #ddd", fontFamily: "Tajawal", fontSize: 13, direction: "rtl", textAlign: "right", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>

      {/* ── Ask Chatbot Button ── */}
      <button
        onClick={() => openChat(activity.id)}
        style={{ marginTop: 14, width: "100%", padding: "12px", background: "linear-gradient(135deg, #1a5276, #2980b9)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "Tajawal", fontSize: 14, fontWeight: "bold", cursor: "pointer" }}
      >
        🤖 اسأل مساعد العلوم
      </button>

      {/* ── Teacher: Expected Answer ── */}
      {isTeacher && (
        <div style={{ marginTop: 16, background: "#d4efdf", borderRadius: 12, padding: 16, border: "1px solid #82e0aa" }}>
          <h4 style={{ fontFamily: "Tajawal", color: "#1e8449", margin: "0 0 8px", fontSize: 14 }}>✅ الإجابة المتوقعة (للمعلم فقط)</h4>
          <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#1e8449", margin: 0, lineHeight: 1.8 }}>
            {activity.expectedAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
