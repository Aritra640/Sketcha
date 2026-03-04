"use client";

import { useAtom } from "jotai";
import { menuAtom } from "../../store/state/state";
import { MenuContent } from "./menucontent";

export function MenuBar() {
  const [menu, setMenu] = useAtom(menuAtom);

  if (!menu) return null;

  return (
    <div
      className="bg-slate-10/10 fixed z-[60] inset-0"
      onClick={() => setMenu(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-background bg-background border-r border-slate-800 rounded-r-xl md:w-72 h-screen"
      >
        <MenuContent />
      </div>
    </div>
  );
}
