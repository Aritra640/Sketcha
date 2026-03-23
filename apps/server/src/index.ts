import { Hono } from "hono";
import { upgradeWebSocket, websocket } from "hono/bun";
import { PublichCanvas, SubscribeCanvas, UnSubscribeCanvas } from "./pubsub";
import { ShapeController } from "./controllers/shapes";
import { WSmsg, WSres } from "@repo/types";
import { startWorker } from "./controllers/worker";

startWorker();

const app = new Hono();

app.get("/health", (c) => {
  return c.text("Hello from server!");
});

//create,update,delete(erase) shapes
app.all(
  "/canvas/:canvasId/:userId/:token",
  upgradeWebSocket((c) => {
    const { canvasId, userId, token } = c.req.param();
    console.log(`canvasId: ${canvasId}  userId: ${canvasId}  token: ${token}`);
    if (!canvasId || !userId) {
      console.log("canvasId or userId empty");
    }

    return {
      onOpen(evt, ws) {
        SubscribeCanvas(ws, canvasId!, userId!);
      },

      onMessage(evt, ws) {
        const data = evt.data.toString();
        let res: WSres | null = null;

        try {
          res = ShapeController(canvasId!, data);
        } catch (err) {
          console.error("Message format may be wrong!: ", err);
          PublichCanvas(canvasId!, JSON.stringify({ iserr: true }), ws);
          throw err;
        }

        if (res != null) {
          PublichCanvas(canvasId!, JSON.stringify(res), ws);
        } else {
          PublichCanvas(canvasId!, JSON.stringify({ iserr: true }), ws);
        }
      },

      onClose(evt, ws) {
        UnSubscribeCanvas(ws);
      },

      onError: () => {
        console.log("canase ws server suffered an error");
      },
    };
  }),
);

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
  websocket,
};
