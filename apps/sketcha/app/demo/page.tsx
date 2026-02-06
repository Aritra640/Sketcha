import { Canvas } from "../../components/canvas/canvas";
import { ToolArea } from "../../components/toolbar/toolarea";

export default function DemoPage() {
  return (
    <div className="bg-neutral-900 h-screen w-screen">
      <ToolArea />
      <Canvas />
    </div>
  );
}
