import { Canvas } from "../../../../../components/canvas/canvas";
import { CollabeButton } from "../../../../../components/collaborate/button";
import { MenuButton } from "../../../../../components/menu/button";
import { ToolArea } from "../../../../../components/toolbar/toolarea";

type CanvasPageProps = {
  params: Promise<{
    userid: string;
    canvasid: string;
  }>;
};

export default async function Page({ params }: CanvasPageProps) {
  const { userid, canvasid } = await params;
  return (
    <div className="bg-background h-screen w-screen">
      <MenuButton isGuest={false} />
      <div>
        <ToolArea />
      </div>
      <CollabeButton />
      <Canvas />
    </div>
  );
}
