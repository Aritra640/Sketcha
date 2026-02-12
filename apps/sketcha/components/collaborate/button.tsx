"use client";

import { useAtom } from "jotai";
import { collabAtom } from "../../store/state/state";
import { Share2 } from "lucide-react";

export function CollabeButton() {
  const [collab, setCollab] = useAtom(collabAtom);

  return (
    <div className="fixed top-4 right-3 md:top-7 md:right-6 z-50">
      <button
        type="button"
        className={`rounded-md h-9 btn btn-sm md:btn-sm border-transparent ${
          collab
            ? "bg-[var(--color-selectedtool)] text-white"
            : "bg-collab text-black hover:bg-white/10 hover:text-white"
        }`}
        onClick={() => setCollab(!collab)}
      >
        <Share2 className="w-5 h-5  md:w-6 md:h-6" />
      </button>
    </div>
  );
}
