import { CanvasPreviewRecord, getDB } from "./db";

export const PREVIEW_MIME_TYPE = "image/jpeg" as const;
export const PREVIEW_QUALITY = 0.7;
export const PREVIEW_PIXEL_RATIO = 0.35;

export async function savePreview(canvasId: string, blob: Blob): Promise<void> {
  const db = await getDB();
  const previousPreview = await db.get("previews", canvasId);
  const now = Date.now();

  await db.put("previews", {
    canvasId,
    blob,
    mimeType: PREVIEW_MIME_TYPE,
    quality: PREVIEW_QUALITY,
    pixelRatio: PREVIEW_PIXEL_RATIO,
    byteSize: blob.size,
    createdAt: previousPreview?.createdAt ?? now,
    updatedAt: now,
  });
}

export async function loadPreview(
  canvasId: string,
): Promise<CanvasPreviewRecord | undefined> {
  const db = await getDB();

  return db.get("previews", canvasId);
}

export async function deletePreview(canvasId: string): Promise<void> {
  const db = await getDB();

  await db.delete("previews", canvasId);
}
