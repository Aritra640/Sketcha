import { Hono } from "hono";
import { upgradeWebSocket, websocket } from "hono/bun";
import { PublichCanvas, SubscribeCanvas, UnSubscribeCanvas } from "./pubsub";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.all("/canvas/:canvasId/:userId/:token" , upgradeWebSocket((c) => {
  const {canvasId, userId, token} = c.req.param();
  console.log(`canvasId: ${canvasId}  userId: ${canvasId}  token: ${token}`);
  if(!canvasId || !userId) {
    console.log("canvasId or userId empty");
  }

  return {
    onOpen(evt, ws) {
      SubscribeCanvas(ws, canvasId!, userId!);
    },

    onMessage(evt, ws) {
      const data = evt.data.toString();
      PublichCanvas(canvasId!, data, ws);
    },

    onClose(evt, ws) {
        UnSubscribeCanvas(ws);
    },

    onError: () => {
      console.log("canase ws server suffered an error")
    }
  }
}))

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
  websocket,
};
