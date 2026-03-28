// src/components/lesson/ConceptScreen.tsx
"use client";

import type { Mode, ScreenDef, ContentBlock } from "@/types";

interface Props {
  mode: Mode;
  isTeacher: boolean;
  screen: ScreenDef;
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  openChat: (actId: string) => void;
}

export default function ConceptScreen({ isTeacher, screen }: Props) {
  const blocks = screen.contentBlocks || [];

  return (
    <div style={{ textAlign: "right" }}>
      <h3 style={{ fontFamily: "Tajawal", fontSize: 18, color: "#1a5276", marginBottom: 16 }}>
        {screen.title}
      </h3>

      {blocks.map((block, idx) => (
        <div key={idx} style={{ marginBottom: 16 }}>
          {renderBlock(block)}
        </div>
      ))}

      {isTeacher && (
        <div style={{ marginTop: 12, background: "#fff3cd", borderRadius: 12, padding: 14, border: "1px solid #ffc107" }}>
          <h4 style={{ fontFamily: "Tajawal", color: "#856404", margin: "0 0 8px", fontSize: 13 }}>📋 ملاحظات المعلم</h4>
          <p style={{ fontFamily: "Tajawal", fontSize: 12, color: "#856404", margin: 0 }}>
            يعرض المحتوى على السبورة الذكية ويوضح شفهيًا مع أمثلة إضافية من بيئة الطلاب.
          </p>
        </div>
      )}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {

    case "formula_hero":
      return (
        <div style={{ background: "linear-gradient(135deg, #1a5276, #2980b9)", borderRadius: 16, padding: 24, textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontFamily: "Tajawal", fontSize: 26, margin: 0 }}>{block.text}</h2>
        </div>
      );

    case "warning":
      return (
        <div style={{ background: "#fff8e1", borderRadius: 14, padding: 18, border: "2px solid #ffca28" }}>
          <p style={{ fontFamily: "Tajawal", fontSize: 14, color: "#f57f17", margin: 0, fontWeight: "bold" }}>
            ⚠️ {block.text}
          </p>
        </div>
      );

    case "conditions":
      return (
        <div style={{ background: "#f8f9fa", borderRadius: 12, padding: 16 }}>
          <p style={{ fontFamily: "Tajawal", fontSize: 14, color: "#333", margin: "0 0 8px" }}>الشغل يحدث فقط إذا:</p>
          <ol style={{ margin: 0, paddingRight: 20, fontFamily: "Tajawal", fontSize: 14, lineHeight: 2.2, color: "#333" }}>
            {block.items?.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      );

    case "comparison_cards":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {block.cards?.map((card, i) => (
            <div key={i} style={{
              background: card.positive ? "#eafaf1" : "#fdedec",
              border: `2px solid ${card.positive ? "#82e0aa" : "#f1948a"}`,
              borderRadius: 12, padding: 16, textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{card.positive ? "📦⬆️" : "📦🧍"}</div>
              <p style={{ fontFamily: "Tajawal", fontSize: 14, fontWeight: "bold", color: card.positive ? "#1e8449" : "#922b21", margin: "0 0 4px" }}>
                {card.label}
              </p>
              <p style={{ fontFamily: "Tajawal", fontSize: 12, color: card.positive ? "#27ae60" : "#e74c3c", margin: 0 }}>
                {card.result}
              </p>
            </div>
          ))}
        </div>
      );

    case "concept_note":
      return (
        <div style={{ background: "#f3e5f5", borderRadius: 12, padding: 16, border: "1px solid #ce93d8" }}>
          <h4 style={{ fontFamily: "Tajawal", color: "#7b1fa2", margin: "0 0 8px", fontSize: 14 }}>💡 ملاحظة مفاهيمية</h4>
          <p style={{ fontFamily: "Tajawal", fontSize: 13, color: "#4a148c", margin: 0, lineHeight: 1.8 }}>
            {block.text}
          </p>
        </div>
      );

    case "rule_cards":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {block.rules?.map((rule, i) => {
            const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
              green:  { bg: "#eafaf1", border: "#82e0aa", text: "#1e8449", icon: "✓" },
              orange: { bg: "#fef5e7", border: "#f9e79f", text: "#e67e22", icon: "±" },
              red:    { bg: "#fdedec", border: "#f1948a", text: "#e74c3c", icon: "✗" },
            };
            const c = colorMap[rule.color] || colorMap.green;
            return (
              <div key={i} style={{ background: c.bg, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", border: `1px solid ${c.border}` }}>
                <span style={{ fontFamily: "Tajawal", fontSize: 14, color: "#333", lineHeight: 1.6 }}>
                  {rule.condition} ← {rule.result}
                </span>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: c.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 16, flexShrink: 0 }}>
                  {c.icon}
                </span>
              </div>
            );
          })}
        </div>
      );

    case "energy_flow":
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap", margin: "20px 0" }}>
          {block.steps?.map((step, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ fontSize: 22, color: "#999" }}>⬅</span>}
              <span style={{ background: ["#2980b9", "#e67e22", "#27ae60"][i % 3], color: "#fff", padding: "10px 18px", borderRadius: 10, fontFamily: "Tajawal", fontSize: 15, fontWeight: "bold" }}>
                {step}
              </span>
            </span>
          ))}
        </div>
      );

    case "fact_cards":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {block.facts?.map((fact, i) => (
            <div key={i} style={{ background: "#f8f9fa", borderRadius: 12, padding: "12px 16px", fontFamily: "Tajawal", fontSize: 14, lineHeight: 1.6, display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
              <span>{fact}</span>
              <span style={{ fontSize: 24 }}>{["💪", "🔥", "🔄"][i % 3]}</span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
