import { CanvasData } from "../store/types/canvas";
import { ConvertCanvasResponseJSON } from "./canvasAPI_utils";

export async function GetCanvasData(
  canvasId: string,
): Promise<CanvasData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/canvas?canvasId=${canvasId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Error: canvas_id may be invalid!");
    }
    const data = await res.json();
    const canvas_data = ConvertCanvasResponseJSON(data);

    return canvas_data;
  } catch (err) {
    console.error("Error in GetCanvasData api call: ", err);
    return null;
  }
}
