// src/components/lesson/ClosureScreen.tsx
"use client";

import type { Mode, Closure } from "@/types";

interface Props {
  mode: Mode;
  isTeacher: boolean;
  closure: Closure;
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  openChat: (actId: string) => void;
}

export default function ClosureScreen({ isTeacher, closure: c, responses, updateResponse }: Props) {
  return (
    <div style={{ textAlign: "right" }}>
      <h3 style={{ fontFamily: "Tajawal", fontSize: 18, color: "#1a5276", marginBottom: 6 }}>{c.title}</h3>
      <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#888", marginBottom: 16 }}>⏱ {c.durationMin} دقيقة</p>

      {/* ── Scenario ── */}
      {c.scenario && (
        <div style={{ background: "#f0f7ff", borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 14, fontFamily: "Tajawal", color: "#1a5276", border: "1px dashed #aed6f1" }}>
          {c.scenario}
        </div>
      )}

      {/* ── Completion prompt ── */}
      {c.promptType === "completion" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", marginBottom: 16 }}>
          <span style={{ fontFamily: "Tajawal", fontSize: 16, fontWeight: "bold" }}>
            {c.promptText.replace("___", "")}
          </span>
          <input
            value={responses[c.inputFields[0].key] || ""}
            onChange={e => updateResponse(c.inputFields[0].key, e.target.value)}
            placeholder="أكمل الجملة..."
            style={{ flex: 1, minWidth: 200, padding: 10, borderRadius: 10, border: "2px solid #2980b9", fontFamily: "Tajawal", fontSize: 14, direction: "rtl", outline: "none" }}
          />
        </div>
      )}

      {/* ── Multi-question ── */}
      {c.promptType === "multi_question" && c.inputFields.map(f => (
        <div key={f.key} style={{ marginBottom: 10 }}>
          <label style={{ fontFamily: "Tajawal", fontSize: 13, color: "#555", fontWeight: "bold", display: "block", marginBottom: 4 }}>{f.label}</label>
          <input
            value={responses[f.key] || ""}
            onChange={e => updateResponse(f.key, e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "2px solid #ddd", fontFamily: "Tajawal", fontSize: 13, direction: "rtl", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      ))}

      {/* ── Open reflection ── */}
      {c.promptType === "open_reflection" && (
        <div style={{ background: "linear-gradient(135deg, #f3e5f5, #e1bee7)", borderRadius: 14, padding: 22, border: "2px solid #ce93d8" }}>
          <p style={{ fontFamily: "Tajawal", fontSize: 16, color: "#4a148c", fontWeight: "bold", lineHeight: 1.8, margin: "0 0 14px" }}>
            🤖 {c.promptText}
          </p>
          <textarea
            value={responses[c.inputFields[0].key] || ""}
            onChange={e => updateResponse(c.inputFields[0].key, e.target.value)}
            rows={3} placeholder="أكتب تفسيري..."
            style={{ width: "100%", padding: 12, borderRadius: 10, border: "2px solid #ce93d8", fontFamily: "Tajawal", fontSize: 13, direction: "rtl", resize: "vertical", outline: "none", boxSizing: "border-box", background: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}
          />
        </div>
      )}

      {/* ── MCQ (Exit Ticket) ── */}
      {c.promptType === "mcq" && (
        <>
          <p style={{ fontFamily: "Tajawal", fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>{c.promptText}</p>
          {c.options?.map(o => (
            <button key={o.key} onClick={() => updateResponse(c.inputFields[0].key, o.key)} style={{
              display: "block", width: "100%", padding: 14, marginBottom: 10, borderRadius: 12,
              border: `2px solid ${responses[c.inputFields[0].key] === o.key ? (o.correct ? "#27ae60" : "#e74c3c") : "#ddd"}`,
              background: responses[c.inputFields[0].key] === o.key ? (o.correct ? "#eafaf1" : "#fdedec") : "#fff",
              fontFamily: "Tajawal", fontSize: 15, cursor: "pointer", textAlign: "right", direction: "rtl", color: "#333",
            }}>
              <strong style={{ marginLeft: 8 }}>{o.key})</strong> {o.text}
              {responses[c.inputFields[0].key] === o.key && (
                <span style={{ float: "left", fontSize: 18 }}>{o.correct ? "✅" : "✗"}</span>
              )}
            </button>
          ))}
        </>
      )}

      {/* ── Visual after answer ── */}
      {c.visualAfter && responses[c.inputFields?.[0]?.key] && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {c.visualAfter.split("⬅").map((step, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ fontSize: 22, color: "#999" }}>⬅</span>}
              <span style={{ background: "#2980b9", color: "#fff", padding: "10px 18px", borderRadius: 10, fontFamily: "Tajawal", fontSize: 15, fontWeight: "bold" }}>{step.trim()}</span>
            </span>
          ))}
        </div>
      )}

      {/* ── Teacher expected answer ── */}
      {isTeacher && (
        <div style={{ marginTop: 16, background: "#d4efdf", borderRadius: 12, padding: 14, border: "1px solid #82e0aa" }}>
          <h4 style={{ fontFamily: "Tajawal", color: "#1e8449", margin: "0 0 8px", fontSize: 14 }}>✅ المتوقع</h4>
          <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#1e8449", margin: 0, lineHeight: 1.8 }}>{c.expectedAnswer}</p>
        </div>
      )}
    </div>
  );
}
