import { openDB } from "idb";

let dbPromise: ReturnType<typeof openDB> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB("sketcha-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("canvases")) {
          db.createObjectStore("canvases", {
            keyPath: "canvasId",
          });
        }
      },
    });
  }

  return dbPromise;
}
