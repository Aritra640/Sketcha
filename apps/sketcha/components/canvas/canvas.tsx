"use client";

import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Transformer, Line } from "react-konva";
import Konva from "konva";

import { drawnAtom, selectedIdAtom, toolAtom } from "../../store/state/state";

import Rectangle from "./shapes/rect/Rect";
import { Shapes } from "../../store/types/shapes/shapeProps";
import { startRect, updateRect } from "./shapes/handlers/rect";
import { startLine, updateLine } from "./shapes/handlers/line";
import LineShape from "./shapes/line/Line";
import { startCircle, updateCircle } from "./shapes/handlers/circle";
import CircleShape from "./shapes/circle/Circle";
import { startArrow, updateArrow } from "./shapes/handlers/arrow";
import ArrowShape from "./shapes/arrow/Arrow";
import { startPencil, updatePencil } from "./shapes/handlers/pencil";
import PencilShape from "./shapes/pencil/Pencil";

export function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [curTool] = useAtom(toolAtom);

  const [draftShape, setDraftShape] = useState<Shapes | null>(null);

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
      const node = stage.findOne(`#${selectedId}`);
      transformer.nodes(node ? [node] : []);
    } else {
      transformer.nodes([]);
    }

    transformer.getLayer()?.batchDraw();
  }, [selectedId]);

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={(e) => {
        const stage = e.target.getStage();
        const pointer = stage?.getPointerPosition();
        if (!pointer) return;

        if (e.target === stage) {
          setSelectedId(null);

          if (curTool === "rect") {
            setDraftShape(startRect(pointer));
          }

          if (curTool == "line") {
            setDraftShape(startLine(pointer));
          }

          if (curTool === "circle") {
            setDraftShape(startCircle(pointer));
          }

          if (curTool === "arrow") {
            setDraftShape(startArrow(pointer));
          }

          if (curTool === "pen") {
            setDraftShape(startPencil(pointer));
          }
        }
      }}
      onMouseMove={(e) => {
        const stage = e.target.getStage();
        const pointer = stage?.getPointerPosition();
        if (!pointer || !draftShape) return;

        if (draftShape.type === "Rect") {
          setDraftShape(updateRect(draftShape, pointer));
        }

        if (draftShape.type === "Line") {
          setDraftShape(updateLine(draftShape, pointer));
        }

        if (draftShape.type === "Circle") {
          setDraftShape(updateCircle(draftShape, pointer));
        }

        if (draftShape.type === "Arrow") {
          setDraftShape(updateArrow(draftShape, pointer));
        }

        if (draftShape.type === "Pencil") {
          setDraftShape(updatePencil(draftShape, pointer));
        }
      }}
      onMouseUp={() => {
        if (!draftShape) return;

        setDrawnShapes((prev) => [...prev, draftShape]);
        setDraftShape(null);
      }}
    >
      <Layer>
        {drawnShapes.map((shape) => {
          switch (shape.type) {
            case "Rect":
              return <Rectangle key={shape.id} shape={shape} />;
            case "Line":
              return <LineShape key={shape.id} shape={shape} />;
            case "Circle":
              return <CircleShape key={shape.id} shape={shape} />;
            case "Arrow":
              return <ArrowShape key={shape.id} shape={shape} />;
            case "Pencil":
              return <PencilShape key={shape.id} shape={shape} />;
            default:
              return null;
          }
        })}

        {draftShape && draftShape.type === "Rect" && (
          <Rectangle shape={draftShape} />
        )}

        {draftShape?.type === "Line" && <LineShape shape={draftShape} />}

        {draftShape?.type === "Circle" && <CircleShape shape={draftShape} />}

        {draftShape?.type === "Arrow" && <ArrowShape shape={draftShape} />}

        {draftShape?.type === "Pencil" && <PencilShape shape={draftShape} />}

        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
}
