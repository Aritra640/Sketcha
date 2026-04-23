"use client";

import { useRef } from "react";
import { useAtom } from "jotai";
import { drawnAtom, toolAtom } from "../../store/state/state";
import { Image } from "lucide-react";
import { ToolButton } from "./toolbutton";

export function ImageUploadTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [, setDrawnShapes] = useAtom(drawnAtom);
  const [, setTool] = useAtom(toolAtom);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setDrawnShapes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "Image",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        src: url,
      },
    ]);

    setTool("cursor");

    e.target.value = "";
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />

      <div onClick={handleClick}>
        <ToolButton
          name="image"
          shape={<Image className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
      </div>
    </>
  );
}
