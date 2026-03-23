import { prisma } from "@repo/db_auth_service";
import { ShapeReturn } from "@repo/types/db";
import { Shapes } from "@repo/types";

export async function AddShape(shape: Shapes, canvasId: string): ShapeReturn {
  try {
    const shapeRet = await prisma.shape.create({
      data: {
        type: shape.type,
        canvasId: canvasId,
        shape: JSON.parse(JSON.stringify(shape)) 
      }
    });

    if(!shapeRet) {
      throw new Error("AddShape failed!");
    }

    return {
      shapeId: shapeRet.id,
      isErr: null,
      shape: shapeRet.shape
    }
  }
}

export async function UpdateShape(shapeId: string, shape: Shapes) {}

export async function DeleteShape(shapeId: string) {}
