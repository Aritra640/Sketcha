import {Shapes} from "@repo/types";
import {prisma} from "@repo/db_auth_service";

export async function AddNewShape(canvasId: string, newShape: Shapes) {}

export async function DeleteShape(canvasId: string, shapeId: string) {}

export async function UpdateShape(canvasId: string, shapeId: string, newShape: Shapes) {}



