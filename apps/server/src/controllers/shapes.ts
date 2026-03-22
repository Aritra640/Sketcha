import { WSres, WSmsg } from "@repo/types";
import { WSmsgSchema } from "@repo/types/schema";

function parseMSG(msg: string): WSmsg {
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

export function ShapeController(canvasId: string, msg: string): WSres {
  let parsedMsg: WSmsg;
  try {
    parsedMsg = parseMSG(msg);
  } catch (err) {
    console.error("Error in ShapeController: ", err);
    throw err;
  }

  return {
    iserr: false,
    command: parsedMsg.command,
    shape: parsedMsg.shape,
  };
}
