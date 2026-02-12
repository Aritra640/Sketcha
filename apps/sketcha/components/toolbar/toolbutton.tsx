"use client";

import { useAtom } from "jotai";
import { toolAtom } from "../../store/state/state";
import type { toolTypes } from "../../store/types/toolTypes";

interface ToolButtonProps {
  name: toolTypes;
  shape: React.ReactNode;
}

export function ToolButton({ name, shape }: ToolButtonProps) {
  const [tool, setTool] = useAtom(toolAtom);

  const isSelected = name === tool;

  return (
    <button
      type="button"
      className={`rounded-md btn btn-sm sm:btn-sm border-transparent ${
        isSelected
          ? "bg-[var(--color-selectedtool)] text-white"
          : "bg-transparent hover:bg-white/10"
      }`}
      onClick={() => setTool(name)}
    >
      <div className="">{shape}</div>
    </button>
  );
}
