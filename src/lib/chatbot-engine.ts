// src/lib/chatbot-engine.ts
// Scripted Chatbot Engine (MVP)
// Phase 3: Replace with Claude API integration via /api/chatbot/message

import type { BotConfig, BotScript } from "@/types";

/**
 * ChatEngine — processes student messages using scripted responses
 *
 * Algorithm:
 * 1. Check if message is out-of-scope → refuse politely
 * 2. Match keywords from knowledge chunks → determine correctness ratio
 * 3. ratio >= 0.5 → pick from correct[] variants (with usage tracking)
 * 4. ratio >= 0.25 → pick from partial[] variants
 * 5. ratio < 0.25 → deliver next hint from hintLadder (sequential)
 * 6. All hints exhausted → pick from wrong[] variants
 *
 * Repetition avoidance:
 * - Tracks which variant indices have been used per category
 * - Resets when all variants are exhausted
 * - Never delivers the same hint level twice
 */
export class ChatEngine {
  private config: BotConfig;
  private script: BotScript | undefined;
  private hintIdx = 0;
  private usedCorrect = new Set<number>();
  private usedWrong = new Set<number>();
  private usedPartial = new Set<number>();

  constructor(config: BotConfig, activityId: string) {
    this.config = config;
    this.script = config.scripts.find(s => s.activityId === activityId);
    this.hintIdx = 0;
    this.usedCorrect.clear();
    this.usedWrong.clear();
    this.usedPartial.clear();
  }

  /** Returns the opening question for the current activity, or null */
  getOpening(): string | null {
    return this.script?.opening ?? null;
  }

  /** Process a student message and return a response */
  respond(userMsg: string): string {
    // 1. Out-of-scope check
    if (this.isOutOfScope(userMsg)) {
      return this.pickRandom(this.config.outOfScope);
    }

    // 2. No script found for this activity
    if (!this.script) {
      return this.pickRandom(this.config.outOfScope);
    }

    // 3. Keyword matching
    const keywords = this.getRelevantKeywords();
    const hits = keywords.filter(kw => userMsg.includes(kw)).length;
    const ratio = keywords.length > 0 ? hits / keywords.length : 0;

    // 4. Correct answer (≥50% keyword match)
    if (ratio >= 0.5 && this.script.correct?.length) {
      return this.pickUnused(this.script.correct, this.usedCorrect);
    }

    // 5. Partial answer (≥25% keyword match)
    if (ratio >= 0.25 && this.script.partial?.length) {
      return this.pickUnused(this.script.partial, this.usedPartial);
    }

    // 6. Wrong/incomplete → deliver next hint
    if (this.hintIdx < this.script.hintLadder.length) {
      const hint = this.script.hintLadder[this.hintIdx].text;
      this.hintIdx++;
      return hint;
    }

    // 7. All hints exhausted → wrong variants
    if (this.script.wrong?.length) {
      return this.pickUnused(this.script.wrong, this.usedWrong);
    }

    // 8. Ultimate fallback
    return "فكّر مرة أخرى... 🤔";
  }

  /** Reset hint counter and usage tracking */
  reset(): void {
    this.hintIdx = 0;
    this.usedCorrect.clear();
    this.usedWrong.clear();
    this.usedPartial.clear();
  }

  /** Get current hint level (0 = none used yet) */
  getHintLevel(): number {
    return this.hintIdx;
  }

  // ────────────────────────────────────────
  //  Private Helpers
  // ────────────────────────────────────────

  private isOutOfScope(msg: string): boolean {
    const outKeywords = [
      "رياضيات", "تاريخ", "جغرافيا", "عربي", "انجليزي",
      "لعب", "لعبة", "كرة", "أغنية", "فيلم", "حيوان",
      "طعام", "أكل", "مدرسة", "صديق", "بيت",
    ];
    const lower = msg.trim();
    // If message is very short and matches an out-of-scope keyword
    return outKeywords.some(kw => lower.includes(kw));
  }

  private getRelevantKeywords(): string[] {
    if (!this.script) return [];

    // Find knowledge chunks related to this activity
    const relevantChunks = this.config.chunks.filter(
      chunk => chunk.activityIds.includes(this.script!.activityId)
    );
    const allContent = relevantChunks.map(c => c.content).join(" ");

    // Core science keywords that indicate understanding
    const candidateKeywords = [
      "قوة", "إزاحة", "اتجاه", "حركة", "رفع", "دفع",
      "احتكاك", "طاقة", "حرارة", "شغل", "سطح", "خشن", "أملس",
      "تحول", "تختفي", "عضلات", "تعب",
    ];

    // Only return keywords that appear in the relevant chunks
    return candidateKeywords.filter(kw => allContent.includes(kw));
  }

  private pickRandom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private pickUnused(arr: string[], used: Set<number>): string {
    const available = arr.map((_, i) => i).filter(i => !used.has(i));

    if (available.length === 0) {
      // All variants used → reset and pick any
      used.clear();
      return this.pickRandom(arr);
    }

    const idx = available[Math.floor(Math.random() * available.length)];
    used.add(idx);
    return arr[idx];
  }
}
