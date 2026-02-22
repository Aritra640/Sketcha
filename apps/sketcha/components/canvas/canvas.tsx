"use client";

import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";
import { drawnAtom } from "../../store/state/state";
import { Shapes } from "../../store/types/shapes/shapeProps";

export function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const transformerRef = useRef<Konva.Transformer | null>(null);


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
    const transformer = transformerRef.current;
    if (!transformer) return;

    const stage = transformer.getStage();
    if (!stage) return;

    if (selectedId) {
      const selectedNode = stage.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformer.nodes([selectedNode]);
      } else {
        transformer.nodes([]);
      }
    } else {
      transformer.nodes([]);
    }

    transformer.getLayer()?.batchDraw();
  }, [selectedId]);

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      onClick={(e) => {
        const stage = e.target.getStage();
        const pointer = stage?.getPointerPosition();
        if (!pointer) return;

        if (e.target === stage) {
          const newRect: Shapes = {
            type: "Rect",
            id: crypto.randomUUID(),
            x: pointer.x,
            y: pointer.y,
            width: 100,
            height: 100,
            stroke: "white",
            strokeWidth: 2,
            shadowBlur: 5,
            cornerRadius: [10, 10, 10, 10],
          };

          setDrawnShapes((prev) => [...prev, newRect]);
          setSelectedId(null);
        }
      }}
    >
      <Layer>
        {drawnShapes.map((shape) => {
          if (shape.type !== "Rect") return null;

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
                    s.id === shape.id
                      ? { ...s, x: node.x(), y: node.y() }
                      : s
                  )
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
                      : s
                  )
                );
              }}
            />
          );
        })}

        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
}
