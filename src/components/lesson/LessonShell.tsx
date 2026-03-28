"use client";

import type { ReactNode } from "react";
import type { Mode, ScreenDef, LessonData } from "@/types";
import type { ResolvedScreen } from "@/lib/lesson-loader";
import WarmupScreen from "@/components/lesson/WarmupScreen";
import ConceptScreen from "@/components/lesson/ConceptScreen";
import ActivityScreen from "@/components/lesson/ActivityScreen";
import AssessmentScreen from "@/components/lesson/AssessmentScreen";
import ClosureScreen from "@/components/lesson/ClosureScreen";
import SummaryScreen from "@/components/lesson/SummaryScreen";
import TeacherControlBar from "@/components/dashboard/TeacherControlBar";

export interface LessonShellProps {
  data: LessonData;
  screenData: ResolvedScreen;
  screen: ScreenDef;
  currentScreen: number;
  totalScreens: number;
  progress: number;
  mode: Mode;
  setMode: (m: Mode) => void;
  responses: Record<string, string>;
  updateResponse: (key: string, value: string) => void;
  completedScreens: Set<number>;
  nextScreen: () => void;
  prevScreen: () => void;
  goToScreen: (idx: number) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatActivityId: string;
  openChat: (actId: string) => void;
  chatInteractions: number;
  setChatInteractions: React.Dispatch<React.SetStateAction<number>>;
  simData: Record<string, string>[];
  addSimData: (row: Record<string, string>) => void;
  teacherPaused: boolean;
  setTeacherPaused: (p: boolean) => void;
}

export default function LessonShell(props: LessonShellProps) {
  const {
    data,
    screen,
    screenData,
    currentScreen,
    totalScreens,
    progress,
    mode,
    setMode,
    responses,
    updateResponse,
    completedScreens,
    nextScreen,
    prevScreen,
    goToScreen,
    setChatOpen,
    openChat,
    chatInteractions,
    simData,
    addSimData,
    teacherPaused,
    setTeacherPaused,
  } = props;

  const isTeacher = mode === "TEACHER";

  const commonProps = {
    mode,
    responses,
    updateResponse,
    openChat,
    isTeacher,
  };

  const renderScreen = (): ReactNode => {
    switch (screen.type) {
      case "warmup":
        return (
          <WarmupScreen
            {...commonProps}
            activity={screenData.activity!}
            workbookItem={screenData.workbookItem!}
            mediaAssets={screenData.media}
            expectations={data.expectations}
          />
        );

      case "concept":
        return <ConceptScreen {...commonProps} screen={screen} />;

      case "activity":
        return (
          <ActivityScreen
            {...commonProps}
            activity={screenData.activity!}
            workbookItem={screenData.workbookItem!}
            mediaAssets={screenData.media}
            simData={simData}
            addSimData={addSimData}
          />
        );

      case "assessment":
        return <AssessmentScreen {...commonProps} assessment={data.assessment} />;

      case "closure":
        return <ClosureScreen {...commonProps} closure={screenData.closure!} />;

      case "summary":
        return (
          <SummaryScreen
            {...commonProps}
            lesson={data.lesson}
            chatInteractions={chatInteractions}
            simDataCount={simData.length}
          />
        );

      default:
        return (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
            شاشة غير معروفة
          </div>
        );
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Tajawal', sans-serif",
        minHeight: "100vh",
        background: "#f4f6f8",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e0e0e0",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setChatOpen(false)}
            style={{
              background: "#eaf2f8",
              border: "none",
              borderRadius: 10,
              padding: "6px 12px",
              cursor: "pointer",
              fontFamily: "Tajawal",
              fontSize: 12,
              fontWeight: "bold",
              color: "#2980b9",
            }}
          >
            🤖 الروبوت
          </button>

          <div
            style={{
              display: "flex",
              background: "#f0f0f0",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setMode("STUDENT")}
              style={{
                padding: "6px 14px",
                border: "none",
                fontFamily: "Tajawal",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: "bold",
                background: mode === "STUDENT" ? "#2980b9" : "transparent",
                color: mode === "STUDENT" ? "#fff" : "#666",
              }}
            >
              طالب
            </button>
            <button
              onClick={() => setMode("TEACHER")}
              style={{
                padding: "6px 14px",
                border: "none",
                fontFamily: "Tajawal",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: "bold",
                background: mode === "TEACHER" ? "#e67e22" : "transparent",
                color: mode === "TEACHER" ? "#fff" : "#666",
              }}
            >
              معلم
            </button>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "Tajawal",
              fontSize: 14,
              fontWeight: "bold",
              color: "#1a5276",
            }}
          >
            الدرس ١-١: {data.lesson.title}
          </div>
          <div style={{ fontFamily: "Tajawal", fontSize: 11, color: "#888" }}>
            {screen.phaseLabel}
          </div>
        </div>
      </header>

      <div style={{ background: "#e0e0e0", height: 4 }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #2980b9, #27ae60)",
            transition: "width 0.4s ease",
            borderRadius: "0 4px 4px 0",
          }}
        />
      </div>

      {isTeacher && (
        <TeacherControlBar
          currentScreen={currentScreen}
          totalScreens={totalScreens}
          isPaused={teacherPaused}
          onTogglePause={() => setTeacherPaused(!teacherPaused)}
        />
      )}

      <nav
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "center",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {data.screens.map((_, i) => (
          <button
            key={i}
            onClick={() => goToScreen(i)}
            style={{
              width: i === currentScreen ? 24 : 10,
              height: 10,
              borderRadius: i === currentScreen ? 5 : "50%",
              border: "none",
              cursor: "pointer",
              background:
                i === currentScreen
                  ? "#2980b9"
                  : completedScreens.has(i)
                  ? "#27ae60"
                  : "#ddd",
            }}
          />
        ))}
      </nav>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "8px 16px 120px" }}>
        {renderScreen()}
      </main>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #e0e0e0",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <button
          onClick={prevScreen}
          disabled={currentScreen === 0}
          style={{
            padding: "10px 24px",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontFamily: "Tajawal",
            fontSize: 14,
            fontWeight: "bold",
            cursor: currentScreen === 0 ? "not-allowed" : "pointer",
            background: currentScreen === 0 ? "#ccc" : "#7f8c8d",
          }}
        >
          السابق
        </button>

        <div style={{ fontFamily: "Tajawal", fontSize: 13, color: "#666" }}>
          {currentScreen + 1} / {totalScreens}
        </div>

        <button
          onClick={nextScreen}
          disabled={currentScreen === totalScreens - 1}
          style={{
            padding: "10px 24px",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontFamily: "Tajawal",
            fontSize: 14,
            fontWeight: "bold",
            cursor: currentScreen === totalScreens - 1 ? "not-allowed" : "pointer",
            background: currentScreen === totalScreens - 1 ? "#ccc" : "#2980b9",
          }}
        >
          التالي
        </button>
      </div>
    </div>
  );
}