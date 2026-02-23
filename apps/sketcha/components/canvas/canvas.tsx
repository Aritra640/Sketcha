"use client";

import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";
import { drawnAtom, selectedIdAtom, toolAtom } from "../../store/state/state";
import { DrawLine } from "./initLine";
import { DrawRect } from "./shapes/rect/initRect";
import Rectangle from "./shapes/rect/Rect";

export function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [curTool] = useAtom(toolAtom);

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
          setSelectedId(null);

          if (curTool == "rect") {
            const newRect = DrawRect(pointer);
            setDrawnShapes((prev) => [...prev, newRect]);
          }

          if (curTool == "line") {
            const newLine = DrawLine(pointer);
            setDrawnShapes((prev) => [...prev, newLine]);
          }
        }
      }}
    >
      <Layer>
        {drawnShapes.map((shape, i) => {
          console.log("shape type: ", shape.type, " i: ", i );
          if (shape.type !== "Rect") return null;


          return <Rectangle key={i} shape={shape} />
            
        })}

        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
}
