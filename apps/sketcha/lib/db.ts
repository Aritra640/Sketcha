import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Shapes } from "../store/types/shapes/shapeProps";

export interface CanvasPreviewRecord {
  canvasId: string;
  blob: Blob;
  mimeType: "image/jpeg";
  quality: number;
  pixelRatio: number;
  byteSize: number;
  createdAt: number;
  updatedAt: number;
}

export interface CanvasRecord {
  canvasId: string;
  shapes: Shapes[];
  updatedAt: number;
}

export interface SketchaDB extends DBSchema {
  canvases: {
    key: string;
    value: CanvasRecord;
    indexes: {
      "by-updated-at": number;
    };
  };
  previews: {
    key: string;
    value: CanvasPreviewRecord;
    indexes: {
      "by-updated-at": number;
    };
  };
}

const DB_NAME = "sketcha-db";
const DB_VERSION = 2;

let dbPromise: Promise<IDBPDatabase<SketchaDB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB<SketchaDB>(DB_NAME, DB_VERSION, {
      upgrade(db, _oldVersion, _newVersion, transaction) {
        if (!db.objectStoreNames.contains("canvases")) {
          const canvasStore = db.createObjectStore("canvases", {
            keyPath: "canvasId",
          });

          canvasStore.createIndex("by-updated-at", "updatedAt");
        } else {
          const canvasStore = transaction.objectStore("canvases");

          if (!canvasStore.indexNames.contains("by-updated-at")) {
            canvasStore.createIndex("by-updated-at", "updatedAt");
          }
        }

        if (!db.objectStoreNames.contains("previews")) {
          const previewStore = db.createObjectStore("previews", {
            keyPath: "canvasId",
          });

          previewStore.createIndex("by-updated-at", "updatedAt");
        } else {
          const previewStore = transaction.objectStore("previews");

          if (!previewStore.indexNames.contains("by-updated-at")) {
            previewStore.createIndex("by-updated-at", "updatedAt");
          }
        }
      },
    });
  }

  return dbPromise;
}
