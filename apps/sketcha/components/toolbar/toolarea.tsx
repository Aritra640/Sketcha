import { ToolButton } from "./toolbutton";
import { Pencil } from "lucide-react";
import { Square } from "lucide-react";
import { Slash } from "lucide-react";
import { LineSquiggle } from "lucide-react";
import { Circle } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { Eraser } from "lucide-react";
import { Type } from "lucide-react";
import { HandGrab } from "lucide-react";

export async function ToolArea() {
  return (
    <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-base-100/90 backdrop-blur shadow-lg rounded-box p-1 flex items-center">
        <ToolButton name="hand" shape={<HandGrab />} />
        <ToolButton name="pen" shape={<Pencil />} />
        <ToolButton name="rect" shape={<Square />} />
        <ToolButton name="line" shape={<Slash />} />
        <ToolButton name="curve" shape={<LineSquiggle />} />
        <ToolButton name="circle" shape={<Circle />} />
        <ToolButton name="arrow" shape={<MoveUpRight />} />
        <ToolButton name="erasure" shape={<Eraser />} />
        <ToolButton name="text" shape={<Type />} />
      </div>
    </div>
  );
}
