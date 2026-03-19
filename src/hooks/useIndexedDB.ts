"use client";

import { useCallback, useEffect, useState } from "react";
import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "html-css-playground";
const DB_VERSION = 1;
const STORE_NAME = "progress";

interface ProgressData {
  lessonId: string;
  moduleId: string;
  completedSteps: number[];
  savedCode: string;
  lastAccessedAt: number;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "lessonId",
          });
          store.createIndex("moduleId", "moduleId");
        }
      },
    });
  }
  return dbPromise;
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

  const clearProgress = useCallback(async () => {
    const db = await getDB();
    await db.clear(STORE_NAME);
  }, []);

  return { isReady, saveProgress, getProgress, getModuleProgress, clearProgress };
}
