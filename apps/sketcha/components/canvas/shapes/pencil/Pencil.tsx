"use client";

import { useAtom } from "jotai";
import { Shapes } from "../../../../store/types/shapes/shapeProps";
import { drawnAtom, selectedIdAtom, toolAtom } from "../../../../store/state/state";
import { Line } from "react-konva";
import Konva from "konva";

interface PencilProps {
  shape: Shapes;
}

export default function PencilShape({ shape }: PencilProps) {
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);

  if (shape.type === "Pencil") {
    return (
      <Line
        id={shape.id}
        key={shape.id}
        x={shape.x}
        y={shape.y}
        points={shape.points}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        shadowBlur={shape.shadowBlur}
        lineCap={shape.lineCap}
        lineJoin={shape.lineJoin}
        tension={0.5} // smooths the line nicely
        draggable={shape.id === selectedId}
        onClick={() => setSelectedId(shape.id)}
        onTap={() => setSelectedId(shape.id)}
        onDragEnd={(e) => {
          const node = e.target as Konva.Line;

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type === "Pencil"
                ? {
                    ...s,
                    x: node.x(),
                    y: node.y(),
                  }
                : s,
            ),
          );
        }}
      />
    );
  }
}
