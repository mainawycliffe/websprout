"use client";

import { useCallback, useEffect, useState } from "react";
import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "html-css-playground";
const DB_VERSION = 3;
const STORE_NAME = "progress";
const PLAYGROUND_STORE = "playground";
const PRACTICE_STORE = "practice";
const GAMIFICATION_STORE = "gamification";

interface ProgressData {
  lessonId: string;
  moduleId: string;
  completedSteps: number[];
  savedCode: string;
  lastAccessedAt: number;
}

export interface PracticeRecord {
  questionId: string;
  status: "attempted" | "solved";
  attempts: number;
  /** Per-question, unlike the lesson store's single savedCode per lesson. */
  lastCode: string;
  /** Feeds the first-try XP bonus. */
  usedHint: boolean;
  solvedAt: number | null;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      // Each store is guarded individually, so this upgrade is purely additive
      // and existing lesson progress survives the version bump untouched.
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "lessonId",
          });
          store.createIndex("moduleId", "moduleId");
        }
        if (!db.objectStoreNames.contains(PLAYGROUND_STORE)) {
          db.createObjectStore(PLAYGROUND_STORE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(PRACTICE_STORE)) {
          db.createObjectStore(PRACTICE_STORE, { keyPath: "questionId" });
        }
        if (!db.objectStoreNames.contains(GAMIFICATION_STORE)) {
          db.createObjectStore(GAMIFICATION_STORE, { keyPath: "id" });
        }
      },
    }).catch((error) => {
      // Do not memoise a rejected promise — one transient failure (private
      // mode, quota, storage eviction) would otherwise disable persistence for
      // the whole session with no way back.
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}

export async function readPlayerRecord<T>(): Promise<T | undefined> {
  const db = await getDB();
  return db.get(GAMIFICATION_STORE, "player");
}

export async function writePlayerRecord<T extends { id: string }>(record: T): Promise<void> {
  const db = await getDB();
  await db.put(GAMIFICATION_STORE, record);
}

export function useIndexedDB() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getDB().then(() => setIsReady(true));
  }, []);

  const saveProgress = useCallback(async (data: ProgressData) => {
    const db = await getDB();
    await db.put(STORE_NAME, data);
  }, []);

  const getProgress = useCallback(
    async (lessonId: string): Promise<ProgressData | undefined> => {
      const db = await getDB();
      return db.get(STORE_NAME, lessonId);
    },
    []
  );

  const getModuleProgress = useCallback(
    async (moduleId: string): Promise<ProgressData[]> => {
      const db = await getDB();
      return db.getAllFromIndex(STORE_NAME, "moduleId", moduleId);
    },
    []
  );

  // Wipes lessons, practice AND the game layer together. Clearing progress but
  // leaving a Redwood rank in the header would just look broken.
  const clearProgress = useCallback(async () => {
    const db = await getDB();
    await Promise.all([
      db.clear(STORE_NAME),
      db.clear(PRACTICE_STORE),
      db.clear(GAMIFICATION_STORE),
    ]);
  }, []);

  const savePracticeResult = useCallback(async (record: PracticeRecord) => {
    const db = await getDB();
    await db.put(PRACTICE_STORE, record);
  }, []);

  const getPracticeResult = useCallback(
    async (questionId: string): Promise<PracticeRecord | undefined> => {
      const db = await getDB();
      return db.get(PRACTICE_STORE, questionId);
    },
    []
  );

  const getAllPracticeResults = useCallback(async (): Promise<PracticeRecord[]> => {
    const db = await getDB();
    return db.getAll(PRACTICE_STORE);
  }, []);

  const savePlaygroundState = useCallback(
    async (data: { id: string; code: string; language: string; lastSaved: number }) => {
      const db = await getDB();
      await db.put(PLAYGROUND_STORE, data);
    },
    []
  );

  const getPlaygroundState = useCallback(
    async (id: string): Promise<{ id: string; code: string; language: string; lastSaved: number } | undefined> => {
      const db = await getDB();
      return db.get(PLAYGROUND_STORE, id);
    },
    []
  );

  return {
    isReady,
    saveProgress,
    getProgress,
    getModuleProgress,
    clearProgress,
    savePlaygroundState,
    getPlaygroundState,
    savePracticeResult,
    getPracticeResult,
    getAllPracticeResults,
  };
}
