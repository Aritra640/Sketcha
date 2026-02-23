import { Vector2d } from "konva/lib/types";
import { Shapes } from "../../../../store/types/shapes/shapeProps";

export function DrawRect(pointer: Vector2d): Shapes {
  const newRect: Shapes = {
    type: "Rect",
    id: crypto.randomUUID(),
    x: pointer.x,
    y: pointer.y,
    width: 100,
    height: 100,
    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 5,
    cornerRadius: [10, 10, 10, 10],
  };

  return newRect;
}


