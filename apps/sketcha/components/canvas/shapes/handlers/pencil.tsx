import { Vector2d } from "konva/lib/types";
import { PencilProp, Shapes } from "../../../../store/types/shapes/shapeProps";

export function startPencil(pointer: Vector2d): PencilProp {
  return {
    type: "Pencil",
    id: crypto.randomUUID(),

    x: pointer.x,
    y: pointer.y,

    points: [0, 0],

    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 2,

    lineCap: "round",
    lineJoin: "round",
  };
}

export function updatePencil(
  shape: Shapes,
  pointer: Vector2d
): Shapes {
  if (shape.type !== "Pencil") return shape;

  const newPoint = [
    pointer.x - shape.x,
    pointer.y - shape.y,
  ];

  return {
    ...shape,
    points: [...shape.points, ...newPoint],
  };
}
