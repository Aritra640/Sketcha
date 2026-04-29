import { prisma } from "@repo/db_auth_service";
import { NextResponse } from "next/server";
import { ConvertPostJSON } from "../../../utils/canvasAPI_utils";

export async function POST(request: Request) {
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
    const req = ConvertPostJSON(data);

    const title =  req.title;
    const userId = req.userId;

    if (!userId) {
      return NextResponse.json(
        {
          error: "userId is required",
        },
        { status: 400 },
      );
    }

    let canvas = await prisma.canvas.findFirst({
      where: {
        userId,
      },

      orderBy: {
        lastOpenedAt: "desc",
      },
    });

    if (!canvas) {
      canvas = await prisma.canvas.create({
        data: {
          title: title,
          userId,
          lastOpenedAt: new Date(),
        },
      });
    } else {
      canvas = await prisma.canvas.update({
        where: {
          id: canvas.id,
        },

        data: {
          lastOpenedAt: new Date(),
        },
      });
    }

    return NextResponse.json(
      {
        id: canvas.id,
        title: canvas.title,
        userId: canvas.userId,
        createdAt: canvas.createdAt,
        lastOpenedAt: canvas.lastOpenedAt,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error in recent canvas route:", err);

    return NextResponse.json(
      {
        error: "internal server error",
      },
      { status: 500 },
    );
  }
}
