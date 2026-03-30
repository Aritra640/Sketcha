import { auth } from "@repo/db_auth_service";
import { Canvas } from "../../../../../components/canvas/canvas";
import { CollabeButton } from "../../../../../components/collaborate/button";
import { MenuButton } from "../../../../../components/menu/button";
import { ToolArea } from "../../../../../components/toolbar/toolarea";
import { headers } from "next/headers";

type CanvasPageProps = {
  params: Promise<{
    userid: string;
    canvasid: string;
  }>;
};

export default async function Page({ params }: CanvasPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return <div>Authentication failed!</div>
  }
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
