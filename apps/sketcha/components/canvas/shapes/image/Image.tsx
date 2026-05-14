"use client";

import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useAtom } from "jotai";
import Konva from "konva";

import {
  drawnAtom,
  selectedIdAtom,
  toolAtom,
} from "../../../../store/state/state";

import { Shapes } from "../../../../store/types/shapes/shapeProps";

export default function ImageShape({ shape }: { shape: Shapes }) {

  const [, setSelectedId] = useAtom(selectedIdAtom);
  const [, setDrawnShapes] = useAtom(drawnAtom);
  const [curTool] = useAtom(toolAtom);

  const isImageShape = shape.type === "Image";
  const [image, status] = useImage(isImageShape ? shape.src : "");

  if (!isImageShape) return null;

  if (
    status !== "loaded" ||
    !image ||
    !image.complete ||
    image.naturalWidth === 0 ||
    image.naturalHeight === 0
  ) {
    return null;
  }

  return (
    <KonvaImage
      id={shape.id}
      image={image}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      draggable={curTool === "cursor"}
      listening={true}
      onClick={() => setSelectedId(shape.id)}
      onTap={() => setSelectedId(shape.id)}
      onDragEnd={(e) => {
        const node = e.target as Konva.Image;

        setDrawnShapes((prev) =>
          prev.map((s) =>
            s.id === shape.id
              ? { ...s, x: node.x(), y: node.y() }
              : s
          )
        );
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Image;

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
}
