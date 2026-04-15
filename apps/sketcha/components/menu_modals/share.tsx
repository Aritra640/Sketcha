
"use client";

import { useAtom } from "jotai";
import { shareAtom } from "../../store/state/state";

export function ShareModal() {
  const [modal, setModal] = useAtom(shareAtom);

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


            Hi this the share modal

      </div>
    </div>
  );
}
