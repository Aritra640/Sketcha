import { LockButton } from "./lockbutton";
import { ToolButton } from "./toolbutton";
import {
  Image,
  LockKeyhole,
  MoveRight,
  Pencil,
  Shapes,
  Square,
  Slash,
  Circle,
  Eraser,
  Type,
  Hand,
  MousePointer,
} from "lucide-react";

export async function ToolArea() {
  return (
    <div className="fixed bottom-3 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          flex items-center gap-1 sm:gap-1.5
          px-1.5 sm:px-2 py-1 sm:py-1.5
          rounded-md
          bg-toolarea
          backdrop-blur-xl
          border border-base-300/40
          shadow-lg shadow-black/20
        "
      >
        <LockButton
          shape={<LockKeyhole className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="hand"
          shape={<Hand className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="cursor"
          shape={<MousePointer className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="pen"
          shape={<Pencil className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="rect"
          shape={<Square className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="line"
          shape={<Slash className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="circle"
          shape={<Circle className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="arrow"
          shape={<MoveRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="erasure"
          shape={<Eraser className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="text"
          shape={<Type className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="image"
          shape={<Image className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
        <ToolButton
          name="more"
          shape={<Shapes className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
        />
      </div>
    </div>
  );
}
