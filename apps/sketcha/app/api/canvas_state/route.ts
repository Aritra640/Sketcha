import { NextResponse } from "next/server";
import { DeleteCanvasStateJSON } from "../../../utils/canvasAPI_utils";
import { prisma } from "@repo/db_auth_service";

export async function GET(request: Request): Promise<NextResponse> {
  //get all shapes of the current canvas;
  try {
    const { searchParams } = new URL(request.url);
    const canvasId = searchParams.get("canvasId");

    if (canvasId === null) {
      return NextResponse.json(
        { msg: "canvasId either invalid or null!" },
        { status: 404 },
      );
    }

    const state = await prisma.shape.findMany({
      where: {
        canvasId: canvasId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      state.map((shape) => ({
        id: shape.id,
        type: shape.type,
        shape: shape.shape,
        createdAt: shape.createdAt,
        canvasId: shape.canvasId,
      })),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error in getting canvas state: ", err);
    return NextResponse.json({ msg: "internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        {
          error: "body may be empty or missing",
        },
        { status: 404 },
      );
    }

    const req = DeleteCanvasStateJSON(data);

    const state = await prisma.shape.deleteMany({
      where: {
        canvasId: req.id,
      },
    });
    return NextResponse.json({ count: state.count }, { status: 200 });
  } catch (error) {
    console.error("Error in deleting canvas state: ", error);
    return NextResponse.json(
      { msg: "Canvas state deletion failed!" },
      { status: 404 },
    );
  }
}
