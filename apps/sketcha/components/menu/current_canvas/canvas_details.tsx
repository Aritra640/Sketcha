"use client";

import { atom, useAtom } from "jotai";
import { canvasDataAtom } from "../../../store/state/state";
import { useRef } from "react";
import { CanvasData } from "../../../store/types/canvas";

const canvasNameAtom = atom<boolean>(false);

function CanvasNameModal() {
  const [canvas, setCanvas] = useAtom(canvasDataAtom);
  const [modal, setModal] = useAtom(canvasNameAtom);
  const canvasNameRef = useRef<HTMLInputElement>(null);

  function UpdateCanvasName() {
    if (!canvasNameRef.current) return;

    const newCanvasName = canvasNameRef.current.value.trim();
    const newCanvas: CanvasData = {
      id: canvas.id,
      title: newCanvasName,
      userId: canvas.userId,
      createdAt: canvas.createdAt,
    };
    setCanvas(newCanvas);

    setModal(false);
  }

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-menu shadow-2xl border border-white/10 p-6 animate-in zoom-in-95 duration-200"
      >
        <div className="mb-4">
          <h2 className="text-xl flex justify-center font-semibold text-white">
            Canvas Details
          </h2>
          <p className="text-sm flex justify-center text-gray-400 mt-1">
            Update current canvas details
          </p>
        </div>

        <div className="text-sm text-gray-300 leading-relaxed flex justify-center">
          <input
            ref={canvasNameRef}
            type="text"
            placeholder="Type here"
            className="input text-center"
          />
        </div>

        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={UpdateCanvasName}
            className="px-4 py-2 cursor-pointer rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export function CurrentCanvasInformation() {
  const [canvas] = useAtom(canvasDataAtom);
  const [, setMenu] = useAtom(canvasNameAtom);

  console.log("canvas details: ", canvas);
  console.log("canvas details name: ", canvas.title);

  return (
    <div className="">
      <CanvasNameModal />
      <button
        className="btn rounded-xl btn-primary hover:bg-collab bg-menu"
        onClick={() => setMenu(true)}
      >
        {canvas.title}
      </button>
    </div>
  );
}
