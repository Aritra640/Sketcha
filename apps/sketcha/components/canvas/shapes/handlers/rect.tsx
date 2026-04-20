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

    // ✅ FIXED anchor
    startX: pointer.x,
    startY: pointer.y,

    stroke: "white",
    strokeWidth: 2,
    shadowBlur: 5,
    cornerRadius: [10, 10, 10, 10],
  };
}


export function updateRect(shape: Shapes, pointer: Vector2d): Shapes {
  if (shape.type !== "Rect") return shape;

  const startX = shape.startX;
  const startY = shape.startY;

  const newX = Math.min(startX, pointer.x);
  const newY = Math.min(startY, pointer.y);

  const newWidth = Math.abs(pointer.x - startX);
  const newHeight = Math.abs(pointer.y - startY);

  return {
    ...shape,
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
  };
}
