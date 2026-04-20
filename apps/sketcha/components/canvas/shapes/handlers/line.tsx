import { Vector2d } from "konva/lib/types";
import { LineProp, Shapes } from "../../../../store/types/shapes/shapeProps";

export function startLine(pointer: Vector2d): LineProp {
  return {
    type: "Line",
    id: crypto.randomUUID(),

    // anchor position
    x: pointer.x,
    y: pointer.y,

    // IMPORTANT: relative points
    points: [0, 0, 0, 0],

    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 5,
    lineCap: "round",
  };
}

export function updateLine(shape: Shapes, pointer: Vector2d): Shapes {
  if (shape.type !== "Line") return shape;

  return {
    ...shape,
    points: [
      0,
      0,
      pointer.x - shape.x,
      pointer.y - shape.y,
    ],
  };
}
