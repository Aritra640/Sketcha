import { auth } from "@repo/db_auth_service";
import { headers } from "next/headers";
import { UserDataType } from "../../../../../store/types/user";
import { CanvasPageComponent } from "../../../../../components/canvas/canvas_page";
import { GetCanvasData } from "../../../../../utils/APIhandler";
import { CanvasData } from "../../../../../store/types/canvas";

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
  let userData: UserDataType;
  if (!session?.user) {
    return <div>Authentication failed!</div>;
  } else {
    userData = {
      name: session.user.name,
      id: session.user.id,
      email: session.user.email,
      avatarURL: session.user.image == null ? undefined : session.user.image,
      isGuest: false,
      GuestName: undefined,
    };
  }
  const { userid, canvasid } = await params;

  if(userData.id !== userid) {
    return <div>Authentication failed!</div>
  }
  const canvasData = await GetCanvasData(canvasid);
  if (canvasData === null) {
    return <div>Something went wrong!</div>
  }
  console.log(userData);
  console.log(canvasData);
  return (
    <CanvasPageComponent canvasData={canvasData} userData={userData} />
  );
}
