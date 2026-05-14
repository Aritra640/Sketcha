"use client";

import { useAtom } from "jotai";
import { addNewCanvasAtom, drawnAtom, hydrateState, userDataAtom } from "../../store/state/state";
import { useRef } from "react";
import { CanvasData } from "../../store/types/canvas";
import { useRouter } from "next/navigation";

export function AddCanvasModal() {
  const [modal, setModal] = useAtom(addNewCanvasAtom);
  const canvasNameRef = useRef<HTMLInputElement>(null);
  const [user] = useAtom(userDataAtom);
  const router = useRouter();

  if (!modal) return null;

  async function onCreate() {
    try {
      if (canvasNameRef.current === null) {
        throw new Error("Canvas ref invalid!");
      }
      if (canvasNameRef.current.value === "") {
        throw new Error("Canvas name cannot be empty!");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/canvas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: canvasNameRef.current.value,
            userId: user.id,
          }),
          cache: "no-store",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update canvas title");
      }

      const newCanvas: CanvasData = await res.json();
      const newURL = `/canvas/user/${user.id}/${newCanvas.id}`;

      setModal(false);
      router.push(newURL);
    } catch (err) {
      console.error("Error creating canvas title:", err);
      alert("Something went wrong while creating new canvas");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-menu shadow-2xl border border-white/10 p-6 animate-in zoom-in-95 duration-200"
      >
        <div className="font-extrabold font-mono text-center">
          Create new sketch
        </div>
        <br />

        <div className="flex justify-content">
          <input
            type="text"
            placeholder="canvas title"
            ref={canvasNameRef}
            className="input input-neutral text-center cursor-pointer bg-background"
          />
          <button onClick={onCreate} className="btn btn-soft bg-selectedtool hover:bg-collab rounded-sm">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
