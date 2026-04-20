import { Vector2d } from "konva/lib/types";
import { CircleProp, Shapes } from "../../../../store/types/shapes/shapeProps";

export function startCircle(pointer: Vector2d): CircleProp {
  return {
    type: "Circle",
    id: crypto.randomUUID(),

    x: pointer.x,
    y: pointer.y,

    rx: 0,
    ry: 0,

    fill: "transparent",
    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 5,
  };
}

export function updateCircle(
  shape: Shapes,
  pointer: Vector2d
): Shapes {
  if (shape.type !== "Circle") return shape;

  const dx = pointer.x - shape.x;
  const dy = pointer.y - shape.y;

  return {
    ...shape,
    rx: Math.abs(dx),
    ry: Math.abs(dy),
  };
}
