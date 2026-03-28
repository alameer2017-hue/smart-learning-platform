// src/types/index.ts

export type Mode = "STUDENT" | "TEACHER";
export type Phase = "WARMUP" | "CONTENT" | "ACTIVITY" | "ASSESSMENT" | "CLOSURE" | "SUMMARY";
export type MediaKind = "VIDEO" | "IMAGE" | "GIF" | "SIMULATION";
export type Trigger = "AUTO_AFTER_VIDEO" | "AUTO_AFTER_TABLE" | "ON_DEMAND" | "NONE";
export type QType = "OPEN_ENDED" | "EXPERIMENT_DESIGN" | "MCQ";

// ── Lesson ──

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  durationMin: number;
  strategies: string[];
  summaryPoints: string[];
}

export interface PerfExp {
  id: string;
  lessonId: string;
  orderIdx: number;
  text: string;
  ngssTagIds: string[];
}

export interface Section {
  id: string;
  lessonId: string;
  orderIdx: number;
  phase: Phase;
  title: string;
  durationMin: number;
  screenIds: string[];
}

// ── Activity ──

export interface Activity {
  id: string;
  lessonId: string;
  sectionId: string;
  screenId: string;
  orderIdx: number;
  title: string;
  durationMin: number;
  objectives: string[];
  teacherProcedure: string[];
  expectedAnswer: string;
  expectedExt?: Record<string, string>;
  mediaIds: string[];
  ngssTagIds: string[];
  botTrigger: Trigger;
  botQuestion?: string;
}

// ── Workbook ──

export interface InputField {
  key: string;
  type: "text" | "textarea" | "select" | "label" | "observation_table" | "comparison_table";
  label: string;
  required?: boolean;
  rows?: number;
  options?: string[];
  columns?: { key: string; label: string; input: string; options?: string[] }[];
  fixedRows?: Record<string, string>[];
  rowsSource?: string;
  minRows?: number;
}

export interface WorkbookItem {
  id: string;
  activityId: string;
  lessonId: string;
  itemNumber: number;
  sectionLabel: string;
  interactionType: string;
  inputFields: InputField[];
  grading: {
    method: string;
    autoGradeable: boolean;
    teacherReviewRequired: boolean;
    keywords?: string[];
    autoGradeRules?: Record<string, string>;
  };
  feedbackMode: string;
  needsBot: boolean;
  needsMedia: boolean;
}

// ── Assessment ──

export interface MCQOption { key: string; text: string; correct: boolean }
export interface RubricItem { criterion: string; marks: number }

export interface AssessQuestion {
  id: string;
  orderIdx: number;
  qtype: QType;
  marks: number;
  text: string;
  inputType: string;
  inputFields?: InputField[];
  autoGraded: boolean;
  options?: MCQOption[];
  correctKey?: string;
  modelAnswer?: string;
  modelData?: Record<string, string | string[]>;
  rubric?: RubricItem[];
  feedback?: Record<string, string>;
  ngssTagIds: string[];
}

export interface Assessment {
  id: string;
  lessonId: string;
  screenId: string;
  durationMin: number;
  totalMarks: number;
  questions: AssessQuestion[];
}

// ── Closure ──

export interface Closure {
  id: string;
  lessonId: string;
  screenId: string;
  orderIdx: number;
  title: string;
  durationMin: number;
  scenario?: string;
  promptType: string;
  promptText: string;
  expectedAnswer: string;
  inputFields: InputField[];
  options?: MCQOption[];
  correctKey?: string;
  autoGraded: boolean;
  visualAfter?: string;
}

// ── Media ──

export interface SimControl {
  key: string;
  type: "slider";
  min: number;
  max: number;
  step: number;
  unit: string;
  label: string;
}

export interface MediaAsset {
  id: string;
  lessonId: string;
  kind: MediaKind;
  title: string;
  description?: string;
  purpose?: string;
  durationRange?: string;
  screenId: string;
  position: string;
  autoPlay: boolean;
  trackDone: boolean;
  fileUrl: string | null;
  componentName?: string;
  controls?: SimControl[];
  outputs?: string[];
  logRuns: boolean;
}

// ── Chatbot ──

export interface HintLevel { level: number; text: string }

export interface BotScript {
  activityId: string;
  trigger: Trigger;
  opening: string;
  hintLadder: HintLevel[];
  correct?: string[];
  wrong?: string[];
  partial?: string[];
}

export interface BotChunk {
  id: string;
  content: string;
  activityIds: string[];
}

export interface BotConfig {
  id: string;
  lessonId: string;
  botName: string;
  botAvatar: string;
  systemPrompt: string;
  outOfScope: string[];
  rules: { maxSentences: number; maxChars: number; neverDirectAnswer: boolean; maxHintReuse: number; variations: string[]; langLevel: string };
  chunks: BotChunk[];
  scripts: BotScript[];
}

// ── NGSS ──

export interface NgssTags {
  id: string;
  dimension: "SEP" | "CCC" | "DCI";
  code: string;
  labelEn: string;
  labelAr: string;
}

// ── Screen Definition ──

export interface ScreenDef {
  id: string;
  orderIdx: number;
  phase: Phase;
  title: string;
  phaseLabel: string;
  type: "warmup" | "concept" | "activity" | "assessment" | "closure" | "summary";
  activityId?: string;
  closureIdx?: number;
  contentBlocks?: ContentBlock[];
  ngssTagIds: string[];
}

export interface ContentBlock {
  type: "formula_hero" | "warning" | "conditions" | "comparison_cards" | "concept_note" | "rule_cards" | "energy_flow" | "fact_cards";
  text?: string;
  items?: string[];
  cards?: { label: string; result: string; positive?: boolean }[];
  rules?: { condition: string; result: string; color: string }[];
  steps?: string[];
  facts?: string[];
  icon?: string;
}

// ── Runtime ──

export interface ChatMsg {
  role: "user" | "bot";
  text: string;
}

export interface LessonData {
  lesson: Lesson;
  expectations: PerfExp[];
  sections: Section[];
  activities: Activity[];
  workbook: WorkbookItem[];
  assessment: Assessment;
  closures: Closure[];
  media: MediaAsset[];
  botConfig: BotConfig;
  screens: ScreenDef[];
  ngss: NgssTags[];
}
