import { Shapes } from "../store/types/shapes/shapeProps";
import { getDB } from "./db";

export async function saveCanvas(
  canvasId: string,
  shapes: Shapes[]
) {
  const db = await getDB();

  await db.put("canvases", {
    canvasId,
    shapes,
    updatedAt: Date.now(),
  });
}

export async function loadCanvas(
  canvasId: string
): Promise<Shapes[]> {
  const db = await getDB();

  const data = await db.get("canvases", canvasId);

  return data?.shapes || [];
}

export async function clearCanvas(canvasId: string) {
  const db = await getDB();

  await db.put("canvases", {
    canvasId,
    shapes: [],
    updatedAt: Date.now(),
  });
}

export async function deleteCanvas(canvasId: string) {
  const db = await getDB();

  await db.delete("canvases", canvasId);
}
