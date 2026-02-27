"use client";

import { useAtom } from "jotai";
import { menuAtom } from "../../store/state/state";

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
        className="shadow-background bg-menu w-60 h-screen"
      >
        hi hello there
      </div>
    </div>
  );
}
