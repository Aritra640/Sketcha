import { WSContext } from "hono/ws";

export type WS = WSContext<any>;

const rooms = new Map<string, Set<WS>>();
const connected = new Map<WS, { canvasId: string; userId: string }>();

export function SubscribeCanvas(ws: WS, canvasId: string, userId: string) {
  if (!rooms.has(canvasId)) {
    rooms.set(canvasId, new Set<WS>());
  }

  rooms.get(canvasId)?.add(ws);
  connected.set(ws, { canvasId: canvasId, userId: userId });

  console.log(`user: ${userId} subscriber to canvas: ${canvasId}`);
}

export function PublichCanvas(canvasId: string, data: string, sender: WS) {
  const room = rooms.get(canvasId);
  if (room == undefined || !room) return;

  for (const client of room) {
    if (client != sender) {
      client.send(data);
    }
  }

  console.log(`canvas: ${canvasId} published data: ${data}`);
}

export function UnSubscribeCanvas(ws: WS) {
  const data = connected.get(ws);
  if (!data) return;

  const { canvasId, userId } = data;
  const room = rooms.get(canvasId);
  if (!room) return;

  room.delete(ws);
  if (room.size === 0) rooms.delete(canvasId);

  console.log(`User: ${userId} unsubscribed from canvas: ${canvasId}`);
}
