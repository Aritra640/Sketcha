import { Canvas } from "../../components/canvas/canvas";
import { MenuButton } from "../../components/menu/button";
import { ToolArea } from "../../components/toolbar/toolarea";

export default function DemoPage() {
  return (
    <div className="bg-background h-screen w-screen">
      <MenuButton />
      <div>
        <ToolArea />
      </div>
      <Canvas />
    </div>
  );
}
