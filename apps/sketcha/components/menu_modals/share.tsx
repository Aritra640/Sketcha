"use client";

import { useAtom } from "jotai";
import { Copy } from "lucide-react";
import { canvasDataAtom, shareAtom } from "../../store/state/state";
import { CreateShareSlug } from "../../utils/share";

export function ShareModal() {
  const [modal, setModal] = useAtom(shareAtom);
  const [canvas] = useAtom(canvasDataAtom);

  if (!modal) return null;

  const shareString = CreateShareSlug();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareString);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-menu shadow-2xl border border-white/10 p-6 animate-in zoom-in-95 duration-200"
      >
        <div className="font-extrabold text-center text-2xl text-white">
          Share Canvas
        </div>

        <br />

        <div className="rounded-xl bg-white/5 p-4">
          <div className="text-white/40 text-sm">
            Share the current canvas
          </div>

          <div className="text-white font-semibold text-lg mt-1">
            {canvas.title}
          </div>
        </div>

        <div className="mt-5 pt-2">

          <div className="flex items-center gap-2 rounded-xl bg-black/20 border border-white/10 p-2">
            <input
              readOnly
              value={shareString}
              className="w-full bg-transparent px-2 text-sm text-white/70 outline-none"
            />

            <button
              onClick={handleCopy}
              className="flex items-center cursor-pointer gap-2 rounded-lg bg-[#4f4a78] px-4 py-2 text-sm font-medium text-white hover:bg-[#605a91] transition-all"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
