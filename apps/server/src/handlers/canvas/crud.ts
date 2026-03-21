import { prisma } from "@repo/db_auth_service";

export async function CreateNewCanvas(userId: string, canvasTitle: string) {
  try {
    const canvas = await prisma.canvas.create({
      data: {
        userId: userId,
        title: canvasTitle,
      },
    });

    return canvas;
  } catch (err) {
    console.error("Error creating new canvas: ", err);
    throw err;
  }
}

export async function UpdateCanvasTitle(
  canvasId: string,
  newCanvasTitle: string,
) {
  const canvas = await prisma.canvas.update({
    where: {
      id: canvasId,
    },
    data: {
      title: newCanvasTitle,
    },
  });
}

export async function DeleteCanvasById(canvasId: string) {
  const canvas = await prisma.canvas.delete({
    where: {
      id: canvasId,
    },
  });

  return canvas;
}

export async function GetCanvasState(canvasId: string) {
  try {
    const state = await prisma.canvas.findUnique({
      where: {
        id: canvasId,
      },
      include: {
        shapes: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!state) {
      throw new Error("Canvas not found!");
    }

    return state;
  } catch (err) {
    console.error("Error fetching canvas state: ", err);
    throw err;
  }
}

export async function GetCanvasMetadata(canvasId: string) {
  try {
    const canvas = await prisma.canvas.findUnique({
      where: {
        id: canvasId,
      },
    });

    if (!canvas) {
      throw new Error("Canvas not found!");
    }
    return canvas;
  } catch (err) {
    console.log("Error fetching canvas data: ", err);
    throw err;
  }
}
