import { createServer } from "./server";

const server = createServer({ port: 8080 });

console.log(`WebSocket server running on ws://localhost:${server.port}/echo`);
