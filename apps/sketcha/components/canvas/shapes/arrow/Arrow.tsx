"use client";

import { useAtom } from "jotai";
import { Shapes } from "../../../../store/types/shapes/shapeProps";
import { drawnAtom, selectedIdAtom } from "../../../../store/state/state";
import { Arrow } from "react-konva";
import Konva from "konva";

interface ArrowProps {
  shape: Shapes;
}

export default function ArrowShape({ shape }: ArrowProps) {
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);

  if (shape.type === "Arrow") {
    return (
      <Arrow
        id={shape.id}
        key={shape.id}
        x={shape.x}
        y={shape.y}
        points={shape.points}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        shadowBlur={shape.shadowBlur}
        pointerLength={shape.pointerLength}
        pointerWidth={shape.pointerWidth}
        lineCap={shape.lineCap}
        draggable={shape.id === selectedId}
        onClick={() => setSelectedId(shape.id)}
        onTap={() => setSelectedId(shape.id)}
        onDragEnd={(e) => {
          const node = e.target as Konva.Arrow;

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type === "Arrow"
                ? {
                    ...s,
                    x: node.x(),
                    y: node.y(),
                  }
                : s,
            ),
          );
        }}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Arrow;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const oldPoints = node.points();

          const newPoints = oldPoints.map((p, i) =>
            i % 2 === 0 ? p * scaleX : p * scaleY,
          );

          node.scaleX(1);
          node.scaleY(1);

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type === "Arrow"
                ? {
                    ...s,
                    x: node.x(),
                    y: node.y(),
                    points: newPoints,
                  }
                : s,
            ),
          );
        }}
      />
    );
  }
}
