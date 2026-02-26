import { Vector2d } from "konva/lib/types";
import { LineProp, Shapes } from "../../../../store/types/shapes/shapeProps";

export function DrawLine(pointer: Vector2d): LineProp {

  const newLine: Shapes = {
    type: "Line",
    id: crypto.randomUUID(),
    points: [0,0,80,-80],
    stroke: "white",
    strokeWidth: 2,
    LineCap: "round",
    y: pointer.y,
    x: pointer.x,
    shadowBlur: 0,
  }

  return newLine;
}

