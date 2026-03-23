import { WSres, WSmsg } from "@repo/types";
import { WSmsgSchema } from "@repo/types/schema";

export function parseMSG(msg: string): WSmsg {
  let parsed: unknown;

  try {
    parsed = JSON.parse(msg);
  } catch (err) {
    console.error("Error in parsing WSmessage: ", err);
    throw err;
  }

  const res = WSmsgSchema.safeParse(parsed);
  if (!res.success) {
    console.error("Error in parsing WSmessage, invalid format");
    throw new Error("Invalid message format!");
  }

  return res.data;
}

export function ShapeController(canvasId: string, state: WSmsg ): WSres {
  return {
    iserr: false,
    command: state.command,
    shape: state.shape,
  };
}
