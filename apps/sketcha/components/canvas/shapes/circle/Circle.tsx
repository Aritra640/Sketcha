"use client";

import { useAtom } from "jotai";
import { Shapes } from "../../../../store/types/shapes/shapeProps";
import { drawnAtom, selectedIdAtom } from "../../../../store/state/state";
import { Ellipse } from "react-konva";
import Konva from "konva";

interface CircleProps {
  shape: Shapes;
}

export default function CircleShape({ shape }: CircleProps) {
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);

  console.log("circle id: ", shape.id);

  if (shape.type === "Circle") {
    return (
      <Ellipse
        id={shape.id}
        key={shape.id}
        x={shape.x}
        y={shape.y}
        radiusX={shape.rx}
        radiusY={shape.ry}
        fill={shape.fill}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        shadowBlur={shape.shadowBlur}
        draggable
        onClick={() => {
          setSelectedId(shape.id);
        }}
        onTap={() => {
          setSelectedId(shape.id);
        }}
        onDragEnd={(e) => {
          const node = e.target as Konva.Ellipse;

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type === "Circle"
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
          const node = e.target as Konva.Ellipse;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const newRx = Math.max(5, shape.rx * scaleX);
          const newRy = Math.max(5, shape.ry * scaleY);

          node.scaleX(1);
          node.scaleY(1);

          setDrawnShapes((prev) =>
            prev.map((s) =>
              s.id === shape.id && s.type === "Circle"
                ? {
                    ...s,
                    x: node.x(),
                    y: node.y(),
                    rx: newRx,
                    ry: newRy,
                  }
                : s,
            ),
          );
        }}
      />
    );
  }
}
