"use client";

import { useAtom } from "jotai";
import { menuAtom } from "../../store/state/state";
import { Menu } from "lucide-react";

export function MenuButton() {
  const [menu, setMenu] = useAtom(menuAtom);

  return (
    <div className="fixed top-4 left-3 md:top-7 md:left-6 z-50">
      <button
        type="button"
        className={`rounded-md h-9 btn btn-sm md:btn-sm border-transparent ${
          menu
            ? "bg-[var(--color-selectedtool)] text-white"
            : "bg-toolarea hover:bg-white/10"
        }`}
        onClick={() => setMenu(!menu)}
      >
        <Menu className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
}
