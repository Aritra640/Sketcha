"use client";

import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";

import {
  drawnAtom,
  lockAtom,
  selectedIdAtom,
  toolAtom,
} from "../../store/state/state";

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

import ImageShape from "./shapes/image/Image";
import TextShapeComponent from "./shapes/text/Text";
import { loadCanvas, saveCanvas } from "../../lib/persistence";

export function Canvas() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [lock, setLock] = useAtom(lockAtom);

  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);

  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);

  const [curTool] = useAtom(toolAtom);

  const [draftShape, setDraftShape] = useState<Shapes | null>(null);
  const canvasId = "main-canvas";

  const [isErasing, setIsErasing] = useState(false);

  const [stagePos, setStagePos] = useState({
    x: 0,
    y: 0,
  });

  const transformerRef = useRef<Konva.Transformer | null>(null);

  const stageRef = useRef<Konva.Stage | null>(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const container = stage.container();

    if (lock) {
      container.style.cursor = "default";
    } else if (curTool === "erasure") {
      const eraserCursor = `url("data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24"><path fill="white" d="M16.24 3.56a2 2 0 0 1 2.83 0l1.37 1.37a2 2 0 0 1 0 2.83l-9.9 9.9a2 2 0 0 1-1.41.59H5a2 2 0 0 1-2-2v-4.13a2 2 0 0 1 .59-1.41z"/></svg>`,
      )}") 4 20, auto`;

      container.style.cursor = eraserCursor;
    } else if (curTool === "cursor") {
      container.style.cursor = "default";
    } else if (curTool === "hand") {
      container.style.cursor = "grab";
    } else {
      container.style.cursor = "crosshair";
    }
  }, [curTool, isErasing]);

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
    async function hydrateCanvas() {
      const savedShapes = await loadCanvas(canvasId);
      if (savedShapes === null) {
        console.log("local db shapes === null");
      } else if (savedShapes.length > 0) {
        setDrawnShapes(savedShapes);
      }
    }

    hydrateCanvas();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveCanvas(canvasId, drawnShapes);
    }, 500);

    return () => clearTimeout(timeout);
  }, [drawnShapes]);

  useEffect(() => {
    const transformer = transformerRef.current;

    if (!transformer) return;

    const stage = transformer.getStage();

    if (!stage) return;

    if (curTool !== "cursor") {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
      return;
    }

    if (selectedId) {
      const node = stage.findOne(`#${selectedId}`);

      transformer.nodes(node ? [node] : []);
    } else {
      transformer.nodes([]);
    }

    transformer.getLayer()?.batchDraw();
  }, [selectedId, curTool]);

  const isDrawingTool = ["rect", "line", "circle", "arrow", "pen"].includes(
    curTool,
  );

  return (
    <Stage
      ref={stageRef}
      width={dimensions.width}
      height={dimensions.height}
      x={stagePos.x}
      y={stagePos.y}
      draggable={curTool === "hand"}
      onDragStart={() => {
        if (curTool === "hand") {
          const stage = stageRef.current;

          if (!stage) return;

          stage.container().style.cursor = "grabbing";
        }
      }}
      onDragMove={(e) => {
        if (curTool !== "hand") return;

        setStagePos({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onDragEnd={() => {
        if (curTool === "hand") {
          const stage = stageRef.current;

          if (!stage) return;

          stage.container().style.cursor = "grab";
        }
      }}
      onMouseDown={(e) => {
        if (curTool === "hand") return;
        if (lock) return;

        const stage = e.target.getStage();
        const pointer = stage?.getPointerPosition();

        if (!pointer || !stage) return;

        if (curTool === "erasure") {
          setIsErasing(true);
          return;
        }

        if (isDrawingTool && e.target !== stage) return;

        if (curTool === "cursor") {
          if (e.target === stage) {
            setSelectedId(null);
          } else {
            const id = e.target.id();

            if (id) setSelectedId(id);
          }

          return;
        }

        if (e.target === stage) {
          setSelectedId(null);

          if (curTool === "rect") {
            setDraftShape(startRect(pointer));
          }

          if (curTool === "line") {
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

          if (curTool === "text" && e.target === stage) {
            const id = crypto.randomUUID();

            setDrawnShapes((prev) => [
              ...prev,
              {
                id,
                type: "Text",
                x: pointer.x,
                y: pointer.y,
                text: "Double click to edit",
                fontSize: 20,
                fill: "#ffffff",
              },
            ]);

            setSelectedId(id);

            return;
          }
        }
      }}
      onMouseMove={(e) => {
        if (curTool === "hand") return;

        const stage = e.target.getStage();

        const pointer = stage?.getPointerPosition();

        if (!pointer || !stage) return;

        if (curTool === "erasure" && isErasing) {
          const node = stage.getIntersection(pointer);

          if (!node) return;

          if (node.getClassName() === "Transformer") return;

          const id = node.id();

          if (!id) return;

          setDrawnShapes((prev) => prev.filter((s) => s.id !== id));

          return;
        }

        if (curTool === "cursor") return;

        if (!draftShape) return;

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
        if (curTool === "hand") return;
        if (lock) return;
        setIsErasing(false);

        if (curTool === "cursor") return;

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

            case "Image":
              return <ImageShape key={shape.id} shape={shape} />;

            case "Text":
              return <TextShapeComponent key={shape.id} shape={shape} />;

            default:
              return null;
          }
        })}

        {draftShape?.type === "Rect" && <Rectangle shape={draftShape} />}

        {draftShape?.type === "Line" && <LineShape shape={draftShape} />}

        {draftShape?.type === "Circle" && <CircleShape shape={draftShape} />}

        {draftShape?.type === "Arrow" && <ArrowShape shape={draftShape} />}

        {draftShape?.type === "Pencil" && <PencilShape shape={draftShape} />}

        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
}
