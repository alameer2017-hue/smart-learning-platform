// src/components/lesson/ActivityScreen.tsx
"use client";

import type { Mode, Activity, WorkbookItem, MediaAsset, InputField } from "@/types";
import MediaViewer from "@/components/media/MediaViewer";

interface Props {
  mode: Mode;
  isTeacher: boolean;
  activity: Activity;
  workbookItem: WorkbookItem;
  mediaAssets: MediaAsset[];
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  openChat: (actId: string) => void;
  simData: Record<string, string>[];
  addSimData: (row: Record<string, string>) => void;
}

export default function ActivityScreen({ isTeacher, activity, workbookItem, mediaAssets, responses, updateResponse, openChat, simData, addSimData }: Props) {
  const video = mediaAssets.find(m => m.kind === "VIDEO");
  const simulation = mediaAssets.find(m => m.kind === "SIMULATION");
  const images = mediaAssets.filter(m => m.kind === "IMAGE");

  return (
    <div style={{ textAlign: "right" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, justifyContent: "flex-end" }}>
        <div>
          <h3 style={{ fontFamily: "Tajawal", fontSize: 18, color: "#1a5276", margin: 0 }}>
            {activity.title}
          </h3>
          <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#888", margin: "4px 0 0" }}>
            ⏱ {activity.durationMin} دقائق — {activity.objectives[0]}
          </p>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fef5e7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {activity.id === "ACT-02" ? "🔍" : activity.id === "ACT-03" ? "⚡" : "🏋️"}
        </div>
      </div>

      {/* ── Video ── */}
      {video && <MediaViewer asset={video} isTeacher={isTeacher} />}

      {/* ── Images (side by side for ACT-04) ── */}
      {images.length >= 2 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {images.map(img => (
            <div key={img.id} style={{ background: "#f0f0f0", borderRadius: 12, padding: 24, textAlign: "center", fontSize: 36, lineHeight: 2 }}>
              {img.id === "MED-I-04" ? "🏋️" : "🧍📦"}
              <br />
              <span style={{ fontSize: 13, fontWeight: "bold" }}>{img.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Input Fields ── */}
      <div style={{ background: "#f0f7ff", borderRadius: 12, padding: 16, marginBottom: 16, border: "1px solid #d4e6f1" }}>
        {workbookItem.inputFields.map(field => (
          <div key={field.key}>
            {renderField(field, responses, updateResponse, simData, addSimData)}
          </div>
        ))}
      </div>

      {/* ── Simulation ── */}
      {simulation && (
        <MediaViewer asset={simulation} onSimData={addSimData} />
      )}

      {/* ── Simulation Data Table ── */}
      {simulation && simData.length > 0 && (
        <div style={{ marginTop: 12, background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #ddd" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Tajawal", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#2980b9", color: "#fff" }}>
                <th style={{ padding: 8 }}>القوة</th>
                <th style={{ padding: 8 }}>الاحتكاك</th>
                <th style={{ padding: 8 }}>المحصلة</th>
                <th style={{ padding: 8 }}>شغل؟</th>
              </tr>
            </thead>
            <tbody>
              {simData.map((d, i) => (
                <tr key={i} style={{ background: i % 2 ? "#f8f9fa" : "#fff" }}>
                  <td style={{ padding: 6, textAlign: "center" }}>{d.force} N</td>
                  <td style={{ padding: 6, textAlign: "center" }}>{d.friction}</td>
                  <td style={{ padding: 6, textAlign: "center" }}>{d.net} N</td>
                  <td style={{ padding: 6, textAlign: "center", color: d.hasWork === "نعم" ? "#27ae60" : "#e74c3c", fontWeight: "bold" }}>{d.hasWork}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Ask Bot ── */}
      <button onClick={() => openChat(activity.id)} style={{ marginTop: 14, width: "100%", padding: 12, background: "linear-gradient(135deg, #1a5276, #2980b9)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "Tajawal", fontSize: 14, fontWeight: "bold", cursor: "pointer" }}>
        🤖 اسأل مساعد العلوم
      </button>

      {/* ── Teacher Answer ── */}
      {isTeacher && (
        <div style={{ marginTop: 16, background: "#d4efdf", borderRadius: 12, padding: 16, border: "1px solid #82e0aa" }}>
          <h4 style={{ fontFamily: "Tajawal", color: "#1e8449", margin: "0 0 8px", fontSize: 14 }}>✅ الإجابة المتوقعة</h4>
          <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#1e8449", margin: 0, lineHeight: 1.8 }}>
            {activity.expectedAnswer}
          </p>
          {activity.expectedExt && Object.entries(activity.expectedExt).map(([k, v]) => (
            <p key={k} style={{ fontFamily: "Tajawal", fontSize: 11, color: "#1e8449", margin: "8px 0 0", fontStyle: "italic" }}>{v}</p>
          ))}
          {isTeacher && activity.teacherProcedure.length > 0 && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #82e0aa" }}>
              <strong style={{ fontSize: 12 }}>📋 إجراءات المعلم:</strong>
              {activity.teacherProcedure.map((p, i) => (
                <p key={i} style={{ fontSize: 11, margin: "4px 0 0", lineHeight: 1.6 }}>{i + 1}. {p}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Field Renderer ──

function renderField(
  field: InputField,
  responses: Record<string, string>,
  updateResponse: (k: string, v: string) => void,
  simData: Record<string, string>[],
  addSimData: (row: Record<string, string>) => void,
) {
  const S = { width: "100%", padding: "8px 12px", borderRadius: 8, border: "2px solid #ddd", fontFamily: "Tajawal", fontSize: 13, direction: "rtl" as const, textAlign: "right" as const, outline: "none", boxSizing: "border-box" as const, marginBottom: 10 };

  switch (field.type) {
    case "text":
      return (
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontFamily: "Tajawal", fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>{field.label}</label>
          <input value={responses[field.key] || ""} onChange={e => updateResponse(field.key, e.target.value)} style={S} />
        </div>
      );

    case "textarea":
      return (
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontFamily: "Tajawal", fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>{field.label}</label>
          <textarea value={responses[field.key] || ""} onChange={e => updateResponse(field.key, e.target.value)} rows={field.rows || 2} style={{ ...S, resize: "vertical" as const, lineHeight: 1.8 }} />
        </div>
      );

    case "observation_table":
      if (!field.columns) return null;
      const rows = field.fixedRows || [];
      return (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: "Tajawal", fontSize: 14, fontWeight: "bold", color: "#1a5276", display: "block", marginBottom: 8 }}>{field.label}</label>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Tajawal", fontSize: 13, border: "1px solid #ddd", borderRadius: 10 }}>
              <thead>
                <tr style={{ background: "#2980b9", color: "#fff" }}>
                  {field.columns.map(col => <th key={col.key} style={{ padding: 10 }}>{col.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 ? "#f8f9fa" : "#fff" }}>
                    {field.columns!.map(col => (
                      <td key={col.key} style={{ padding: 6 }}>
                        {col.input === "label" ? (
                          <span style={{ fontWeight: "bold" }}>{row[col.key]}</span>
                        ) : col.input === "select" ? (
                          <select
                            value={responses[`${field.key}_${row.rowKey}_${col.key}`] || ""}
                            onChange={e => updateResponse(`${field.key}_${row.rowKey}_${col.key}`, e.target.value)}
                            style={{ width: "100%", padding: 6, borderRadius: 6, border: "1px solid #ddd", fontFamily: "Tajawal", fontSize: 12, direction: "rtl", outline: "none" }}
                          >
                            <option value="">اختر</option>
                            {col.options?.map(o => <option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input
                            value={responses[`${field.key}_${row.rowKey}_${col.key}`] || ""}
                            onChange={e => updateResponse(`${field.key}_${row.rowKey}_${col.key}`, e.target.value)}
                            style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontFamily: "Tajawal", fontSize: 12, direction: "rtl", textAlign: "center", outline: "none", boxSizing: "border-box" }}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "comparison_table":
      if (!field.columns || !field.fixedRows) return null;
      return (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: "Tajawal", fontSize: 14, fontWeight: "bold", color: "#1a5276", display: "block", marginBottom: 8 }}>{field.label}</label>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Tajawal", fontSize: 13, border: "1px solid #ddd" }}>
              <thead>
                <tr style={{ background: "#2980b9", color: "#fff" }}>
                  {field.columns.map(col => <th key={col.key} style={{ padding: 10 }}>{col.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {field.fixedRows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 ? "#f8f9fa" : "#fff" }}>
                    {field.columns!.map(col => (
                      <td key={col.key} style={{ padding: 6 }}>
                        {col.input === "label" ? (
                          <span style={{ fontWeight: "bold" }}>{row[col.key]}</span>
                        ) : col.input === "select" ? (
                          <select
                            value={responses[`${field.key}_${row.rowKey}_${col.key}`] || ""}
                            onChange={e => updateResponse(`${field.key}_${row.rowKey}_${col.key}`, e.target.value)}
                            style={{ width: "100%", padding: 6, borderRadius: 6, border: "1px solid #ddd", fontFamily: "Tajawal", fontSize: 12, direction: "rtl", outline: "none" }}
                          >
                            <option value="">اختر</option>
                            {col.options?.map(o => <option key={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input
                            value={responses[`${field.key}_${row.rowKey}_${col.key}`] || ""}
                            onChange={e => updateResponse(`${field.key}_${row.rowKey}_${col.key}`, e.target.value)}
                            style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontFamily: "Tajawal", fontSize: 12, direction: "rtl", outline: "none", boxSizing: "border-box" }}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    default:
      return null;
  }
}
