import { CanvasPageComponent } from "../../../../components/canvas/canvas_page";
import { UserDataType } from "../../../../store/types/user";

type GuestPageProps = {
  params: Promise<{
    guestid: string;
  }>;
};
export default async function GuestPage({ params }: GuestPageProps) {
  const { guestid } = await params;
  const userData: UserDataType = {
    isGuest: true,
    GuestName: guestid,
  };

  return <CanvasPageComponent userData={userData} />;
}
