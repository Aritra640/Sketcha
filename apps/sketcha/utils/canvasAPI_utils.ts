import { z } from "zod";

const GetRequestSchema = z.object({
  id: z.coerce.string(),
});
export type GetRequest = z.infer<typeof GetRequestSchema>;

export function ConvertGetJSON(data: unknown): GetRequest {
  return GetRequestSchema.parse(data);
}

const PostRequestSchema = z.object({
  title: z.coerce.string(),
  userId: z.coerce.string(),
});

export type PostRequest = z.infer<typeof PostRequestSchema>;

export function ConvertPostJSON(data: unknown): PostRequest {
  return PostRequestSchema.parse(data);
}

const PutRequestSchema = z.object({
  id: z.coerce.string(),
  new_title: z.coerce.string(),
});

export type PutRequest = z.infer<typeof PutRequestSchema>;

export function ConvertPutJSON(data: unknown): PutRequest {
  return PutRequestSchema.parse(data);
}

const DeleteRequestSchema = z.object({
  id: z.coerce.string(),
});

export type DeleteRequest = z.infer<typeof DeleteRequestSchema>;

export function ConvertDeleteJSON(data: unknown): DeleteRequest {
  return DeleteRequestSchema.parse(data);
}
