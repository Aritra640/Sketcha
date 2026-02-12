import { Canvas } from "../../components/canvas/canvas";
import { ToolArea } from "../../components/toolbar/toolarea";

export default function DemoPage() {
  return (
    <div className="bg-background h-screen w-screen">
      <div>
        <ToolArea />
      </div>
      <Canvas />
    </div>
  );
}
