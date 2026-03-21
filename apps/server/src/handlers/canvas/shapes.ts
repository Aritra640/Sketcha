import { Shapes } from "@repo/types";
import { prisma } from "@repo/db_auth_service";

export async function AddNewShape(canvasId: string, newShape: Shapes) {
  try {
    const shape = await prisma.shape.create({
      data: {
        canvasId: canvasId,
        type: newShape.type,
        shape: JSON.parse(JSON.stringify(newShape)),
      },
    });

    if (!shape) {
      throw new Error("New Shape cannot be made, maybe canvasId is Invalid!");
    }
    return shape;
  } catch (err) {
    console.error("Error in adding new shape in canvas: ", err);
    throw err;
  }
}

export async function DeleteShape(shapeId: string) {
  try {
    const shape = await prisma.shape.delete({
      where: {
        id: shapeId,
      },
    });

    if (!shape) {
      throw new Error("shape not found!");
    }
    return shape;
  } catch (err) {
    console.error("Error in deleting shape");
    throw err;
  }
}

export async function UpdateShape(shapeId: string, newShape: Shapes) {
  try {
    const shape = await prisma.shape.update({
      where: {
        id: shapeId,
      },
      data: {
        type: newShape.type,
        shape: JSON.parse(JSON.stringify(newShape)),
      },
    });

    if (!shape) {
      throw new Error("shape not found!");
    }
    return shape;
  } catch (err) {
    console.error("Error in updating shapes!");
    throw err;
  }
}
