import { z } from "zod";

const RectSchema = z.object({
  type: z.literal("Rect"),
  id: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  shadowBlur: z.number(),
  stroke: z.string(),
  strokeWidth: z.number(),
  cornerRadius: z.array(z.number()),
});

const CircleSchema = z.object({
  type: z.literal("Circle"),
  id: z.string(),
  x: z.number(),
  y: z.number(),
  rx: z.number(),
  ry: z.number(),
  fill: z.string(),
  stroke: z.string(),
  shadowBlur: z.number(),
  strokeWidth: z.number(),
});

const LineSchema = z.object({
  type: z.literal("Line"),
  id: z.string(),
  points: z.array(z.number()),
  stroke: z.string(),
  strokeWidth: z.number(),
  LineCap: z.string(),
  x: z.number(),
  y: z.number(),
  shadowBlur: z.number(),
});

const ShapesSchema = z.discriminatedUnion("type", [
  RectSchema,
  CircleSchema,
  LineSchema,
]);

const WSmsgSchema = z.object({
  command: z.enum(["ADD", "UPDATE", "DELETE"]),
  id: z.any(),
  shape: ShapesSchema,
});

export { RectSchema, LineSchema, CircleSchema, ShapesSchema, WSmsgSchema };
