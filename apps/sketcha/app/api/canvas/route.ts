import { prisma } from "@repo/db_auth_service";
import { NextResponse } from "next/server";
import {
  CanvasResponse,
  ConvertDeleteJSON,
  ConvertGetJSON,
  ConvertPostJSON,
  ConvertPutJSON,
} from "../../../utils/canvasAPI_utils";

export async function GET(request: Request) {
  try {
    // const body = await request.json();
    // if (!body) {
    //   return NextResponse.json(
    //     {
    //       error: "body may be empty or missing",
    //     },
    //     { status: 404 },
    //   );
    // }
    // const req = ConvertGetJSON(body);

    const { searchParams } = new URL(request.url);
    const canvasId = searchParams.get("canvasId");
    
    if(canvasId === null) {
      return NextResponse.json({msg: "canvas id not found!"}, {status: 404});
    }

    const canvas = await prisma.canvas.findUnique({
      where: {
        id: canvasId,
      },
    });

    if (!canvas) {
      throw new Error("canvas id invalid or missing!");
    }

    const retObj: CanvasResponse = {
      id: canvas.id,
      title: canvas.title,
      userId: canvas.userId,
      createdAt: canvas.createdAt,
    };

    return NextResponse.json(retObj, { status: 200 });
  } catch (err) {
    console.error("Error in api/canvas/get: ", err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function POST(request: Request) {
  //create a new canvas with given username and return canvasId
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

    const canvas = await prisma.canvas.create({
      data: {
        title: req.title,
        userId: req.userId,
      },
    });

    if (!canvas) {
      console.error(
        "Error in api/canvas/post: failed to create a new canvas: ",
      );
      throw new Error(
        "Error in api/canvas/post: failed to create a new canvas: ",
      );
    }

    const retObj: CanvasResponse = {
      id: canvas.id,
      title: canvas.title,
      userId: canvas.userId,
      createdAt: canvas.createdAt,
    };

    return NextResponse.json(retObj, { status: 200 });
  } catch (err) {
    console.error("Error in api/canvas/post: ", err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(request: Request) {
  //Update canvas title
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
    const req = ConvertPutJSON(data);

    const canvas = await prisma.canvas.update({
      where: {
        id: req.id,
      },
      data: {
        title: req.new_title,
      },
    });

    if (!canvas) {
      console.error("Error in api/canvas/put: failed to update canvas");
      throw new Error("Error in api/canvas/put: failed to update canvas");
    }

    const retObj: CanvasResponse = {
      id: canvas.id,
      userId: canvas.userId,
      title: canvas.title,
      createdAt: canvas.createdAt,
    };

    return NextResponse.json(retObj, { status: 200 });
  } catch (err) {
    console.error("Error in api/canvas/put: ", err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  //Delete canvas
  try {
    const data = request.json();
    if (!data) {
      return NextResponse.json(
        {
          error: "body may be empty or missing",
        },
        { status: 404 },
      );
    }
    const req = ConvertDeleteJSON(data);

    const canvas = await prisma.canvas.delete({
      where: {
        id: req.id,
      },
    });

    if (!canvas) {
      console.error("Error in api/canvas/delete: failed to delete canvas");
      throw new Error("Error in api/canvas/delete: failed to delete canvas");
    }

    const retObj: CanvasResponse = {
      id: canvas.id,
      userId: canvas.userId,
      title: canvas.title,
      createdAt: canvas.createdAt,
    };

    return NextResponse.json(retObj, { status: 200 });
  } catch (err) {
    console.error("Error in api/canvas/delete: ", err);
    return NextResponse.json({}, { status: 500 });
  }
}
