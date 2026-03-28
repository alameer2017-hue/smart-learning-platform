// src/components/lesson/AssessmentScreen.tsx
"use client";

import type { Mode, Assessment, AssessQuestion, InputField } from "@/types";

interface Props {
  mode: Mode;
  isTeacher: boolean;
  assessment: Assessment;
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  openChat: (actId: string) => void;
}

export default function AssessmentScreen({ isTeacher, assessment, responses, updateResponse }: Props) {
  return (
    <div style={{ textAlign: "right" }}>
      <h3 style={{ fontFamily: "Tajawal", fontSize: 18, color: "#1a5276", marginBottom: 16 }}>
        📝 التقويم
        <span style={{ fontSize: 12, color: "#888", fontWeight: "normal", marginRight: 8 }}>
          ⏱ {assessment.durationMin} دقائق — {assessment.totalMarks} درجة
        </span>
      </h3>

      {assessment.questions.map(q => (
        <QuestionBlock key={q.id} question={q} isTeacher={isTeacher} responses={responses} updateResponse={updateResponse} />
      ))}
    </div>
  );
}

function QuestionBlock({ question: q, isTeacher, responses, updateResponse }: {
  question: AssessQuestion; isTeacher: boolean;
  responses: Record<string, string>; updateResponse: (k: string, v: string) => void;
}) {
  const rKey = `q_${q.id}`;
  const borderColor = q.qtype === "MCQ" ? "#27ae60" : q.qtype === "EXPERIMENT_DESIGN" ? "#e67e22" : "#2980b9";
  const typeLabel = q.qtype === "MCQ" ? "اختيار من متعدد" : q.qtype === "EXPERIMENT_DESIGN" ? "تصميم تجربة" : "سؤال مفتوح";

  return (
    <div style={{ background: "#f8f9fa", borderRadius: 14, padding: 18, marginBottom: 16, borderRight: `4px solid ${borderColor}` }}>
      <h4 style={{ fontFamily: "Tajawal", fontSize: 15, margin: "0 0 10px", color: "#1a5276" }}>
        {typeLabel} — {q.marks} {q.marks > 2 ? "درجات" : "درجة"}
      </h4>
      <p style={{ fontFamily: "Tajawal", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px", color: "#333" }}>
        {q.text}
      </p>

      {/* ── MCQ ── */}
      {q.qtype === "MCQ" && q.options?.map(o => (
        <button key={o.key} onClick={() => updateResponse(rKey, o.key)} style={{
          display: "block", width: "100%", padding: "12px 16px", marginBottom: 8, borderRadius: 10,
          border: `2px solid ${responses[rKey] === o.key ? (o.correct ? "#27ae60" : "#e74c3c") : "#ddd"}`,
          background: responses[rKey] === o.key ? (o.correct ? "#eafaf1" : "#fdedec") : "#fff",
          fontFamily: "Tajawal", fontSize: 14, cursor: "pointer", textAlign: "right", direction: "rtl", color: "#333",
        }}>
          <strong style={{ marginLeft: 8 }}>{o.key})</strong> {o.text}
          {responses[rKey] === o.key && (
            <span style={{ float: "left", fontSize: 16 }}>{o.correct ? "✓" : "✗"}</span>
          )}
        </button>
      ))}
      {responses[rKey] && q.feedback?.[responses[rKey]] && (
        <div style={{
          marginTop: 8, padding: 10, borderRadius: 8, fontSize: 13, fontFamily: "Tajawal", lineHeight: 1.8,
          background: responses[rKey] === q.correctKey ? "#d4efdf" : "#fadbd8",
          color: responses[rKey] === q.correctKey ? "#1e8449" : "#922b21",
        }}>
          {q.feedback[responses[rKey]]}
        </div>
      )}

      {/* ── Open-ended ── */}
      {q.qtype === "OPEN_ENDED" && (
        <textarea
          value={responses[rKey] || ""}
          onChange={e => updateResponse(rKey, e.target.value)}
          rows={3}
          placeholder="إجابتي..."
          style={{
            width: "100%", padding: 12, borderRadius: 10, border: "2px solid #ddd",
            fontFamily: "Tajawal", fontSize: 13, direction: "rtl", resize: "vertical",
            outline: "none", boxSizing: "border-box", lineHeight: 1.8,
          }}
        />
      )}

      {/* ── Experiment Design ── */}
      {q.qtype === "EXPERIMENT_DESIGN" && q.inputFields?.map(f => (
        <div key={f.key} style={{ marginBottom: 8 }}>
          <label style={{ fontFamily: "Tajawal", fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea
              value={responses[`${rKey}_${f.key}`] || ""}
              onChange={e => updateResponse(`${rKey}_${f.key}`, e.target.value)}
              rows={f.rows || 2}
              style={{
                width: "100%", padding: 8, borderRadius: 8, border: "2px solid #ddd",
                fontFamily: "Tajawal", fontSize: 13, direction: "rtl", resize: "vertical",
                outline: "none", boxSizing: "border-box",
              }}
            />
          ) : (
            <input
              value={responses[`${rKey}_${f.key}`] || ""}
              onChange={e => updateResponse(`${rKey}_${f.key}`, e.target.value)}
              style={{
                width: "100%", padding: 8, borderRadius: 8, border: "2px solid #ddd",
                fontFamily: "Tajawal", fontSize: 13, direction: "rtl",
                outline: "none", boxSizing: "border-box",
              }}
            />
          )}
        </div>
      ))}

      {/* ── Teacher: Model Answer + Rubric ── */}
      {isTeacher && q.modelAnswer && (
        <div style={{
          marginTop: 10, background: "#d4efdf", borderRadius: 8, padding: 10,
          fontSize: 12, color: "#1e8449", lineHeight: 1.8, fontFamily: "Tajawal",
        }}>
          <strong>✅ النموذجية:</strong> {q.modelAnswer}
          {q.rubric && (
            <div style={{ marginTop: 6, fontStyle: "italic", fontSize: 11, color: "#1e8449" }}>
              {q.rubric.map(r => `${r.criterion} (${r.marks})`).join(" • ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
