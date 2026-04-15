
"use client";

import { useAtom } from "jotai";
import { userSettingsAtom } from "../../store/state/state";

export function UserSettingsModal() {
  const [modal, setModal] = useAtom(userSettingsAtom);

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


      Hi this is the User Settings modal

      </div>
    </div>
  );
}
