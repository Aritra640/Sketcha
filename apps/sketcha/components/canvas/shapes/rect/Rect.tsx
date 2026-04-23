"use client";

import { Rect } from "react-konva";
import { Shapes } from "../../../../store/types/shapes/shapeProps";
import Konva from "konva";
import { useAtom } from "jotai";
import { drawnAtom, selectedIdAtom, toolAtom } from "../../../../store/state/state";

interface RectangleProps {
  shape: Shapes;
}

export default function Rectangle({ shape }: RectangleProps) {
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);

  console.log("rect id: ", shape.id);

  if (shape.type == "Rect") {
    return (
      <Rect
        id={shape.id}
        key={shape.id}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        shadowBlur={shape.shadowBlur}
        cornerRadius={shape.cornerRadius}
        draggable
        onClick={() => {
          // e.cancelBubble = true;
          setSelectedId(shape.id);
        }}
        onTap={(e) => {
          // e.cancelBubble = true;
          setSelectedId(shape.id);
        }}
        onDragEnd={(e) => {
          const node = e.target as Konva.Rect;

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id ? { ...s, x: node.x(), y: node.y() } : s,
            ),
          );
        }}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Rect;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const newWidth = Math.max(5, node.width() * scaleX);
          const newHeight = Math.max(5, node.height() * scaleY);

          node.scaleX(1);
          node.scaleY(1);

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id
                ? {
                    ...s,
                    x: node.x(),
                    y: node.y(),
                    width: newWidth,
                    height: newHeight,
                  }
                : s,
            ),
          );
        }}
      />
    );
  }
}
