// src/app/lesson/[id]/page.tsx
"use client";

import { useState, useCallback } from "react";
import { lessonData } from "@/data/seed";
import { loadScreenData } from "@/lib/lesson-loader";
import LessonShell from "@/components/lesson/LessonShell";
import type { Mode } from "@/types";

export default function LessonPage() {
  // ── State ──
  const [mode, setMode] = useState<Mode>("STUDENT");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [completedScreens, setCompletedScreens] = useState<Set<number>>(new Set());
  const [chatOpen, setChatOpen] = useState(false);
  const [chatActivityId, setChatActivityId] = useState("ACT-01");
  const [chatInteractions, setChatInteractions] = useState(0);
  const [simData, setSimData] = useState<Record<string, string>[]>([]);
  const [teacherPaused, setTeacherPaused] = useState(false);

  const { screens } = lessonData;
  const screen = screens[currentScreen];
  const totalScreens = screens.length;
  const progress = ((currentScreen + 1) / totalScreens) * 100;

  // ── Callbacks ──
  const updateResponse = useCallback((key: string, value: string) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  }, []);

  const nextScreen = useCallback(() => {
    setCompletedScreens(prev => new Set([...prev, currentScreen]));
    if (currentScreen < totalScreens - 1) setCurrentScreen(prev => prev + 1);
  }, [currentScreen, totalScreens]);

  const prevScreen = useCallback(() => {
    if (currentScreen > 0) setCurrentScreen(prev => prev - 1);
  }, [currentScreen]);

  const goToScreen = useCallback((idx: number) => {
    if (idx >= 0 && idx < totalScreens) setCurrentScreen(idx);
  }, [totalScreens]);

  const openChat = useCallback((activityId: string) => {
    setChatActivityId(activityId);
    setChatOpen(true);
  }, []);

  const addSimData = useCallback((row: Record<string, string>) => {
    setSimData(prev => [...prev, row]);
  }, []);

  // ── Resolve screen data ──
  const screenData = loadScreenData(screen, lessonData);

  return (
    <LessonShell
      data={lessonData}
      screenData={screenData}
      screen={screen}
      currentScreen={currentScreen}
      totalScreens={totalScreens}
      progress={progress}
      mode={mode}
      setMode={setMode}
      responses={responses}
      updateResponse={updateResponse}
      completedScreens={completedScreens}
      nextScreen={nextScreen}
      prevScreen={prevScreen}
      goToScreen={goToScreen}
      chatOpen={chatOpen}
      setChatOpen={setChatOpen}
      chatActivityId={chatActivityId}
      openChat={openChat}
      chatInteractions={chatInteractions}
      setChatInteractions={setChatInteractions}
      simData={simData}
      addSimData={addSimData}
      teacherPaused={teacherPaused}
      setTeacherPaused={setTeacherPaused}
    />
  );
}
