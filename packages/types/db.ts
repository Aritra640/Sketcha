import { Shapes } from ".";

type ShapeReturn = {
  shapeId: string;
  isErr: Error | null;
  shape: Shapes;
};

export type { ShapeReturn };
