"use client";

import { useAtom } from "jotai";
import { collabAtom } from "../../store/state/state";

export function CollabModal() {
  const [collab, setCollab] = useAtom(collabAtom);

  if (!collab) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setCollab(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-menu shadow-2xl border border-white/10 p-6 animate-in zoom-in-95 duration-200"
      >

        <div className="mb-4">
          <h2 className="text-xl flex justify-center font-semibold text-white">Collaboration</h2>
          <p className="text-sm flex justify-center text-gray-400 mt-1">
            Real-time collaboration support is coming soon.
          </p>
        </div>

        <div className="text-sm text-gray-300 leading-relaxed">
          This feature is currently under active development. You will soon be
          able to invite collaborators and work together in real-time.
        </div>

        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={() => setCollab(false)}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
