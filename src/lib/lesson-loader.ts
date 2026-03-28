// src/lib/lesson-loader.ts
// Resolves a ScreenDef into all the data needed to render that screen

import type { ScreenDef, Activity, WorkbookItem, MediaAsset, Closure, LessonData } from "@/types";

export interface ResolvedScreen {
  screen: ScreenDef;
  activity: Activity | null;
  workbookItem: WorkbookItem | null;
  media: MediaAsset[];
  closure: Closure | null;
}

/**
 * Given a screen definition and the full lesson data,
 * resolve all related entities that the screen needs to render.
 *
 * This is the single function that connects seed data to UI components.
 */
export function loadScreenData(screen: ScreenDef, data: LessonData): ResolvedScreen {
  // Find the activity linked to this screen (if any)
  const activity = screen.activityId
    ? data.activities.find(a => a.id === screen.activityId) ?? null
    : null;

  // Find the workbook item for this activity (if any)
  const workbookItem = activity
    ? data.workbook.find(w => w.activityId === activity.id) ?? null
    : null;

  // Find all media assets for this screen
  const media = data.media.filter(m => m.screenId === screen.id);

  // Find the closure phase for this screen (if any)
  const closure = screen.closureIdx !== undefined
    ? data.closures[screen.closureIdx] ?? null
    : null;

  return { screen, activity, workbookItem, media, closure };
}

/**
 * Get media assets for a specific activity by its mediaIds array
 */
export function getMediaForActivity(activity: Activity, allMedia: MediaAsset[]): MediaAsset[] {
  return activity.mediaIds
    .map(id => allMedia.find(m => m.id === id))
    .filter((m): m is MediaAsset => m !== null);
}

/**
 * Resolve NGSS tag IDs to their Arabic labels
 */
export function resolveNgssLabels(tagIds: string[], allNgss: LessonData["ngss"]): { id: string; dimension: string; labelAr: string }[] {
  return tagIds
    .map(id => allNgss.find(t => t.id === id))
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .map(t => ({ id: t.id, dimension: t.dimension, labelAr: t.labelAr }));
}

/**
 * Calculate lesson completion percentage from completed screen indices
 */
export function calcProgress(completedScreens: Set<number>, totalScreens: number): number {
  return Math.round((completedScreens.size / totalScreens) * 100);
}

/**
 * Get the next screen that has student input fields (skip pure content screens)
 */
export function nextInteractiveScreen(currentIdx: number, screens: ScreenDef[]): number | null {
  for (let i = currentIdx + 1; i < screens.length; i++) {
    if (screens[i].type !== "concept") return i;
  }
  return null;
}

/**
 * Build a flat list of all field keys that a student needs to fill across the lesson
 * (used for progress tracking and auto-save)
 */
export function getAllFieldKeys(data: LessonData): string[] {
  const keys: string[] = [];

  // From workbook items
  for (const wb of data.workbook) {
    for (const field of wb.inputFields) {
      if (field.type === "observation_table" || field.type === "comparison_table") {
        // Table fields generate composite keys: fieldKey_rowKey_colKey
        if (field.fixedRows && field.columns) {
          for (const row of field.fixedRows) {
            for (const col of field.columns) {
              if (col.input !== "label") {
                keys.push(`${field.key}_${row.rowKey}_${col.key}`);
              }
            }
          }
        }
      } else {
        keys.push(field.key);
      }
    }
  }

  // From assessment questions
  for (const q of data.assessment.questions) {
    if (q.inputFields) {
      for (const f of q.inputFields) keys.push(`q_${q.id}_${f.key}`);
    } else {
      keys.push(`q_${q.id}`);
    }
  }

  // From closures
  for (const c of data.closures) {
    for (const f of c.inputFields) keys.push(f.key);
  }

  return keys;
}
