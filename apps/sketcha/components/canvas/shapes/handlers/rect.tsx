"use client";

import { Vector2d } from "konva/lib/types";
import { RectProps, Shapes } from "../../../../store/types/shapes/shapeProps";

export function startRect(pointer: Vector2d): RectProps {
  return {
    type: "Rect",
    id: crypto.randomUUID(),
    x: pointer.x,
    y: pointer.y,
    width: 0,
    height: 0,
    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 5,
    cornerRadius: [10, 10, 10, 10],
  };
}

export function updateRect(
  shape: Shapes,
  pointer: Vector2d
): Shapes {
  if (shape.type !== "Rect") return shape;

  const startX = shape.x;
  const startY = shape.y;

  const width = pointer.x - startX;
  const height = pointer.y - startY;

  return {
    ...shape,
    x: width < 0 ? pointer.x : startX,
    y: height < 0 ? pointer.y : startY,
    width: Math.abs(width),
    height: Math.abs(height),
  };
}
