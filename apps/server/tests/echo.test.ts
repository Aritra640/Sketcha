/// <reference types="bun" />

import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { createServer } from "../echo";

describe("WebSocket Server", () => {
  let server: ReturnType<typeof createServer>;
  const port = 0; // Use random available port

  beforeAll(() => {
    server = createServer({ port });
  });

  afterAll(() => {
    server.stop();
  });

  it("should return 404 for non-WebSocket routes", async () => {
    const response = await fetch(`http://localhost:${server.port}/unknown`);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });

  it("should return 404 for /echo without WebSocket upgrade", async () => {
    const response = await fetch(`http://localhost:${server.port}/echo`);
    expect(response.status).toBe(404);
  });

  it("should handle WebSocket connection", async () => {
    const ws = new WebSocket(`ws://localhost:${server.port}/echo`);

    await new Promise<void>((resolve, reject) => {
      ws.onopen = () => {
        resolve();
      };
      ws.onerror = (error) => {
        reject(error);
      };
    });

    expect(ws.readyState).toBe(WebSocket.OPEN);
    ws.close();
  });

  it("should respond with pong when receiving ping", async () => {
    const ws = new WebSocket(`ws://localhost:${server.port}/echo`);

    await new Promise<void>((resolve, reject) => {
      ws.onopen = () => {
        resolve();
      };
      ws.onerror = (error) => {
        reject(error);
      };
    });

    const responsePromise = new Promise<string>((resolve) => {
      ws.onmessage = (event) => {
        resolve(event.data as string);
      };
    });

    ws.send("ping");
    const response = await responsePromise;

    expect(response).toBe("pong");
    ws.close();
  });

  it("should handle multiple messages", async () => {
    const ws = new WebSocket(`ws://localhost:${server.port}/echo`);

    await new Promise<void>((resolve, reject) => {
      ws.onopen = () => resolve();
      ws.onerror = reject;
    });

    const messages: string[] = [];

    ws.onmessage = (event) => {
      messages.push(event.data as string);
    };

    ws.send("ping");
    ws.send("ping");
    ws.send("ping");

    // Wait a bit for messages to arrive
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(messages).toEqual(["pong", "pong", "pong"]);
    ws.close();
  });

  it("should handle connection close", async () => {
    const ws = new WebSocket(`ws://localhost:${server.port}/echo`);

    await new Promise<void>((resolve, reject) => {
      ws.onopen = () => resolve();
      ws.onerror = reject;
    });

    const closePromise = new Promise<void>((resolve) => {
      ws.onclose = () => {
        resolve();
      };
    });

    ws.close();
    await closePromise;

    expect(ws.readyState).toBe(WebSocket.CLOSED);
  });
});
