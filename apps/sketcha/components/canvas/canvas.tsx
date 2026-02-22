"use client";

import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import { drawnAtom } from "../../store/state/state";

export function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);
  const [selectedId, setSelectedId] = useState<number|null>(null);

  const shapeRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    const updateWindowSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (selectedId !== null && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  return (
    <Stage className="" width={dimensions.width} height={dimensions.height} onClick={(e) => {
      const pointer = e.target.getStage()?.getPointerPosition();
      if (!pointer) return;

      setDrawnShapes((prev) => [...prev, {
        type: "Rect",
        x: pointer.x,
        y: pointer.y,
        width: 100,
        height: 100,
        stroke: "white",
        strokeWidth: 3,
        shadowBlur: 5,
        cornerRadius: [10,10,10,10],
      }])
    }}>
      <Layer>
        {drawnShapes?.map((shape, i) => {
          switch (shape.type) {
            case "Rect":
              return (<Rect
                key={i}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
                shadowBlur={shape.shadowBlur}
                cornerRadius={shape.cornerRadius}
              />);
          }
        })}
      </Layer>
    </Stage>
  );
}
