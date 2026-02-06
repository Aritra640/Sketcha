"use client";

import { useAtom } from "jotai";
import { toolAtom } from "../../store/state/state";
import { toolTypes } from "../../store/types/toolTypes";

interface ToolButtonProps {
  name: toolTypes;
  shape: React.ReactNode;
}

export function ToolButton({ name, shape }: ToolButtonProps) {
  const [tool, setTool] = useAtom(toolAtom);

  const isSelected = name === tool;

  return (
    <button
      className={`btn btn-sm btn-primary ${
        isSelected ? "" : "btn-outline"
      }`}
      onClick={() => setTool(name)}
    >
      {shape}
    </button>
  );
}

