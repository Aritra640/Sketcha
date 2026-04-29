import { auth } from "@repo/db_auth_service";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { GetRandomCanvasName } from "../../../utils/canvas";
import { ConvertCanvasResponseJSON } from "../../../utils/canvasAPI_utils";

export async function GET(request: Request) {
  //check authentication
  //create a new canvas
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json(
        { msg: "authentication failed!" },
        { status: 404 },
      );
    }
    const userId = session.user.id;
    const randomTitle = GetRandomCanvasName();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/recent_canvas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: randomTitle,
          userId: userId,
        }),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch canvas!");
    }
    const data = await res.json();

    const canvas = ConvertCanvasResponseJSON(data);
    const url = new URL(request.url);
    url.pathname = `/canvas/user/${userId}/${canvas.id}`;

    return NextResponse.redirect(url);
  } catch (err) {
    console.error("Error in canvas-state get route: ", err);
    return NextResponse.json({ msg: "something went wrong!" }, { status: 500 });
  }
}
