// src/components/chatbot/ChatbotPanel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import type { BotConfig, ChatMsg } from "@/types";
import { ChatEngine } from "@/lib/chatbot-engine";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activityId: string;
  botConfig: BotConfig;
  onInteraction: () => void;
}

export default function ChatbotPanel({ isOpen, onClose, activityId, botConfig, onInteraction }: Props) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const engineRef = useRef<ChatEngine | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const prevActivityRef = useRef<string>("");

  // Initialize engine when panel opens or activity changes
  useEffect(() => {
    if (isOpen && activityId !== prevActivityRef.current) {
      const engine = new ChatEngine(botConfig, activityId);
      engineRef.current = engine;
      prevActivityRef.current = activityId;

      const opening = engine.getOpening();
      setMessages(opening
        ? [{ role: "bot", text: `مرحبًا! 🤖\n\n${opening}` }]
        : [{ role: "bot", text: "مرحبًا! أنا مساعد العلوم. كيف أساعدك؟ 🤖" }]
      );
    }
  }, [isOpen, activityId, botConfig]);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || !engineRef.current) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    onInteraction();

    // Simulate typing delay
    setTimeout(() => {
      const reply = engineRef.current!.respond(text);
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", left: 16, bottom: 16, width: 340, height: 460,
      background: "#fff", borderRadius: 20,
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      zIndex: 1000, border: "2px solid #e8d5b7",
      fontFamily: "Tajawal, sans-serif",
    }}>
      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #1a5276, #2980b9)",
        padding: "14px 18px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
          borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14,
        }}>✕</button>
        <div style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: "bold", fontSize: 15 }}>🤖 {botConfig.botName}</span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: "auto", padding: 14,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "82%", padding: "10px 14px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "#2980b9" : "#f0f4f8",
              color: msg.role === "user" ? "#fff" : "#333",
              fontSize: 13, lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              textAlign: "right", direction: "rtl",
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* ── Input ── */}
      <div style={{
        padding: 12, borderTop: "1px solid #eee",
        display: "flex", gap: 8,
      }}>
        <button onClick={sendMessage} style={{
          background: "#2980b9", border: "none", borderRadius: "50%",
          width: 38, height: 38, color: "#fff", cursor: "pointer",
          fontSize: 18, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>↩</button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب سؤالك هنا..."
          style={{
            flex: 1, padding: "8px 14px", borderRadius: 20,
            border: "2px solid #ddd", fontSize: 13,
            fontFamily: "Tajawal", textAlign: "right", direction: "rtl",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
