"use client";

import { useRef } from "react";
import { useAtom } from "jotai";
import { drawnAtom, toolAtom, userDataAtom } from "../../store/state/state";
import { Image } from "lucide-react";
import { ToolButton } from "./toolbutton";

export function ImageUploadTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [userData] = useAtom(userDataAtom);
  const isGuest = userData.isGuest;

  const [, setDrawnShapes] = useAtom(drawnAtom);
  const [, setTool] = useAtom(toolAtom);

  function handleClick() {
    inputRef.current?.click();
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setDrawnShapes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "Image",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        src: data.url,
      },
    ]);

    setTool("cursor");

    e.target.value = "";
  }

  async function handleLocalFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    setDrawnShapes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "Image",

        x: 100,
        y: 100,

        width: 200,
        height: 200,

        src: localUrl,

        file,
        isLocal: true,
      },
    ]);

    setTool("cursor");

    e.target.value = "";
  }

  async function onChangeFunction(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isGuest) {
      return handleFile(e);
    } else {
      return handleLocalFile(e);
    }
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
