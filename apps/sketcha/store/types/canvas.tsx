import { CanvasResponse } from "../../utils/canvasAPI_utils";
import { UserDataType } from "./user";

export type CanvasData = CanvasResponse

export type CanvasUserCombinedData = {
  canvasid?: string;
  userdata?: UserDataType;
}

export type CanvasExportData =  {
  id?: string;
  title?: string;
  userid?: string;
  createdAt?: any;
  exportURL?: string;
}
