"use client";

import { useAtom } from "jotai";
import { Shapes } from "../../../../store/types/shapes/shapeProps";
import { drawnAtom, selectedIdAtom, toolAtom } from "../../../../store/state/state";
import { Line } from "react-konva";
import { LineCap } from "konva/lib/Shape";
import Konva from "konva";

interface LineProps {
  shape: Shapes;
}

export default function LineShape({ shape }: LineProps) {
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);
  const [curTool] = useAtom(toolAtom);

  console.log("rendering at:", shape.x, shape.y);
  console.log("line id: ", shape.id);

  if (shape.type == "Line") {
    return (
      <Line
        id={shape.id}
        key={shape.id}
        points={shape.points}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        lineCap={shape.lineCap as LineCap} //TODO: type LineCap(konva) might cause error
        y={shape.y}
        x={shape.x}
        shadowBlur={shape.shadowBlur}
        draggable
        listening = {curTool === "cursor"}
        onClick={() => {
          // e.cancelBubble = true;
          setSelectedId(shape.id);
        }}
        onTap={() => {
          // e.cancelBubble = true;
          setSelectedId(shape.id);
        }}
        onDragEnd={(e) => {
          const node = e.target as Konva.Line;
          const newX = node.x();
          const newY = node.y();

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type == "Line"
                ? { ...s, x: newX, y: newY }
                : s,
            ),
          );
        }}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Line;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const oldPoints = node.points();

          const newPoints = oldPoints.map(
            (point, index) =>
              index % 2 === 0
                ? point * scaleX 
                : point * scaleY,
          );

          node.scaleX(1);
          node.scaleY(1);

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type === "Line"
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
