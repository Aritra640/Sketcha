"use client";

import { Text as KonvaText } from "react-konva";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import Konva from "konva";

import {
  drawnAtom,
  selectedIdAtom,
  toolAtom,
} from "../../../../store/state/state";

import { Shapes } from "../../../../store/types/shapes/shapeProps";

export default function TextShapeComponent({ shape }: { shape: Shapes }) {
  const [, setSelectedId] = useAtom(selectedIdAtom);
  const [, setDrawnShapes] = useAtom(drawnAtom);
  const [curTool] = useAtom(toolAtom);

  const [isEditing, setIsEditing] = useState(false);

  const textRef = useRef<Konva.Text>(null);

  if (shape.type !== "Text") return null;

  function handleDblClick() {
    const node = textRef.current;
    if (!node) return;

    setIsEditing(true);

    const stage = node.getStage();
    const container = stage?.container();

    if (!container) return;

    const textPosition = node.absolutePosition();
    const rect = container.getBoundingClientRect();

    const textarea = document.createElement("textarea");

    textarea.value = shape.text;

    document.body.appendChild(textarea);

    textarea.style.position = "fixed";

    textarea.style.top = `${rect.top + textPosition.y}px`;
    textarea.style.left = `${rect.left + textPosition.x}px`;

    textarea.style.width = `${Math.max(node.width() + 20, 200)}px`;
    textarea.style.height = `${Math.max(node.height() + 20, 60)}px`;

    textarea.style.background = "transparent";

    textarea.style.border = "none";
    textarea.style.outline = "none";

    textarea.style.resize = "none";
    textarea.style.overflow = "hidden";

    textarea.style.color = "#ffffff";
    textarea.style.webkitTextFillColor = "#ffffff";

    textarea.style.caretColor = "#ffffff";

    textarea.style.fontSize = `${shape.fontSize}px`;

    textarea.style.fontFamily =
      `"Virgil", "Comic Sans MS", "Caveat", cursive`;

    textarea.style.fontWeight = "400";

    textarea.style.lineHeight = "1.4";

    textarea.style.padding = "0";
    textarea.style.margin = "0";

    textarea.style.whiteSpace = "pre-wrap";

    textarea.style.zIndex = "999999";

    textarea.focus();

    textarea.setSelectionRange(
      textarea.value.length,
      textarea.value.length
    );

    function removeTextarea() {
      textarea.remove();

      setIsEditing(false);

      window.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    function save() {
      setDrawnShapes((prev) =>
        prev.map((s) =>
          s.id === shape.id
            ? {
                ...s,
                text: textarea.value,
              }
            : s
        )
      );

      removeTextarea();
    }

    function handleOutsideClick(e: MouseEvent) {
      if (e.target !== textarea) {
        save();
      }
    }

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        removeTextarea();
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        save();
      }
    });

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });

    setTimeout(() => {
      window.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }, 0);
  }

  return (
    <KonvaText
      ref={textRef}
      id={shape.id}
      x={shape.x}
      y={shape.y}
      text={shape.text}
      fontSize={shape.fontSize}
      fill="#ffffff"
      visible={!isEditing}
      draggable={curTool === "cursor"}
      listening={true}
      onClick={() => setSelectedId(shape.id)}
      onTap={() => setSelectedId(shape.id)}
      onDblClick={handleDblClick}
      onDragEnd={(e) => {
        const node = e.target as Konva.Text;

        setDrawnShapes((prev) =>
          prev.map((s) =>
            s.id === shape.id
              ? {
                  ...s,
                  x: node.x(),
                  y: node.y(),
                }
              : s
          )
        );
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Text;

        const scaleX = node.scaleX();

        node.scaleX(1);

        setDrawnShapes((prev) =>
          prev.map((s) =>
            s.id === shape.id
              ? {
                  ...s,
                  x: node.x(),
                  y: node.y(),
                  fontSize: Math.max(
                    10,
                    shape.fontSize * scaleX
                  ),
                }
              : s
          )
        );
      }}
    />
  );
}
