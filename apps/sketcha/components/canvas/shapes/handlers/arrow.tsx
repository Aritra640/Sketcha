import { Vector2d } from "konva/lib/types";
import { ArrowProp, Shapes } from "../../../../store/types/shapes/shapeProps";

export function startArrow(pointer: Vector2d): ArrowProp {
  return {
    type: "Arrow",
    id: crypto.randomUUID(),

    x: pointer.x,
    y: pointer.y,

    points: [0, 0, 0, 0],

    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 5,

    pointerLength: 10,
    pointerWidth: 10,

    lineCap: "round",
  };
}

export function updateArrow(shape: Shapes, pointer: Vector2d): Shapes {
  if (shape.type !== "Arrow") return shape;

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
