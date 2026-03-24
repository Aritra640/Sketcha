import { prisma } from "@repo/db_auth_service";
import { ShapeReturn } from "@repo/types/db";
import { Shapes } from "@repo/types";

export async function AddShape(
  shape: Shapes,
  canvasId: string,
): Promise<ShapeReturn> {
  try {
    const shapeRet = await prisma.shape.create({
      data: {
        type: shape.type,
        canvasId: canvasId,
        shape: JSON.parse(JSON.stringify(shape)),
      },
    });

    if (!shapeRet) {
      throw new Error("AddShape failed!");
    }

    return {
      shapeId: shapeRet.id,
      isErr: null,
      shape: JSON.parse(shapeRet.shape) as Shapes,
    };
  } catch (err) {
    console.log("Error in adding shape: ", err);
    throw err;
  }
}

export async function UpdateShape(
  shapeId: string,
  shape: Shapes,
): Promise<ShapeReturn> {
  try {
    const shapeRet = await prisma.shape.update({
      where: {
        id: shapeId,
      },
      data: {
        shape: JSON.stringify(shape),
      },
    });

    if (!shapeRet) {
      throw new Error("shape not found!");
    }

    return {
      shapeId: shapeRet.id,
      isErr: null,
      shape: JSON.parse(shapeRet.shape) as Shapes,
    };
  } catch (err) {
    console.log("Error in updating shape: ", err);
    throw err;
  }
}

export async function DeleteShape(shapeId: string): Promise<ShapeReturn> {
  try {
    const shapeRet = await prisma.shape.delete({
      where: {
        id: shapeId,
      },
    });

    if (!shapeRet) {
      throw new Error("shape not found!");
    }

    return {
      shapeId: shapeRet.id,
      isErr: null,
      shape: JSON.parse(shapeRet.shape) as Shapes,
    };
  } catch (err) {
    console.log("Error in deleting shape: ", err);
    throw err;
  }
}
