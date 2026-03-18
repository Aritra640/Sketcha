import { NextResponse } from "next/server";
import { GetRandomCanvasName } from "../../utils/canvas";

export async function GET(request: Request) {
  const guestId ="Guest@" + GetRandomCanvasName();

  const url = new URL(request.url);
  url.pathname = `/canvas/guest/${guestId}`;

  return NextResponse.redirect(url);
}
