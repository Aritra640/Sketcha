import { Canvas } from "../../../../components/canvas/canvas";
import { CollabeButton } from "../../../../components/collaborate/button";
import { MenuButton } from "../../../../components/menu/button";
import { ToolArea } from "../../../../components/toolbar/toolarea";

type GuestPageProps = {
  params: Promise<{
    guestid: string;
  }>;
};
export default async function GuestPage({ params }: GuestPageProps) {
  const { guestid } = await params;

  return (
    <div className="bg-background h-screen w-screen">
      <MenuButton isGuest={true} guestId={guestid} />
      <div>
        <ToolArea />
      </div>
      <CollabeButton />
      <Canvas />
    </div>
  );
}
