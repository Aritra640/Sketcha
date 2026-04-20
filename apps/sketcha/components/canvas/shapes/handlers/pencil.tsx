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

  const points = shape.points;
  if (points.length < 2) return shape;

  const lastX = points[points.length - 2];
  const lastY = points[points.length - 1];

  const newX = pointer.x - shape.x;
  const newY = pointer.y - shape.y;

  const dx = newX - lastX;
  const dy = newY - lastY;

  if (dx * dx + dy * dy < 4) return shape;

  return {
    ...shape,
    points: [...points, newX, newY],
  };
}
