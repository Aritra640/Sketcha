import { Vector2d } from "konva/lib/types";
import { Shapes } from "../../store/types/shapes/shapeProps";

export function DrawLine(pointer: Vector2d): Shapes {

  const newLine: Shapes = {
    type: "Line",
    id: crypto.randomUUID(),
    points: [pointer.x, pointer.y, pointer.x+10],
    stroke: "white",
    strokeWidth: 5,
    LineCap: "round",
    y: 0,
    shadowBlur: 7,
  }

  return newLine;
}
