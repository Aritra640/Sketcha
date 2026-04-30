"use client";

import { useAtom } from "jotai";
import { toolAtom, utilsModalAtom } from "../../store/state/state";
import { Shapes } from "lucide-react";

export function UtilsButton() {

  const name = "more";
  const shape = <Shapes className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />;

  const [modal, setModal] = useAtom(utilsModalAtom);
  const [tool, setTool] = useAtom(toolAtom);

  const isSelected = name === tool;

  function OnClick() {
    setTool(name);
    setModal(true);
  }

  return (
    <button
      type="button"
      className={`rounded-md btn btn-sm sm:btn-sm border-transparent ${
        isSelected
          ? "bg-[var(--color-selectedtool)] text-white"
          : "bg-transparent hover:bg-white/10"
      }`}
      onClick={OnClick}
    >
      <div className="">{shape}</div>
    </button>
  );
}
