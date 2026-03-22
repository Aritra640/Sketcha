import {Shapes} from "@repo/types";
 
type CanvasState = {
  shapes: Map<string, Shapes>;
  dirty: boolean;
  lastModified: Date;
}

export type {CanvasState};
