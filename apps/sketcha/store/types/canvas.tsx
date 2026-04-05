import { UserDataType } from "./user";

export type CanvasData = {
  id? : string;
  name?: string;
}

export type CanvasUserCombinedData = {
  canvasid?: string;
  userdata?: UserDataType;
}
