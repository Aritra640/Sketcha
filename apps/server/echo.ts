/// <reference types="bun" />

export interface ServerConfig {
  port: number;
}

export function createServer(config: ServerConfig) {
  return Bun.serve({
    port: config.port,
    fetch(req, server) {
      const url = new URL(req.url);

      if (url.pathname === "/echo") {
        const upgraded = server.upgrade(req);
        if (upgraded) {
          return undefined;
        }
      }

      // return new Response("Not Found", { status: 404 });
    },
    websocket: {
      open(ws) {
        console.log("Client connected");
      },
      message(ws, message) {
        console.log("Received:", message);
        if (message === "ping") {
          ws.send("pong");
        }
      },
      close(ws, code, reason) {
        console.log("Client disconnected");
      },
    },
  });
}
