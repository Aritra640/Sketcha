import { WSmsg } from "@repo/types";
import { QueueStore } from "@repo/types/storage";
import { randomUUIDv7 } from "bun";

const queue: QueueStore[] = [];

function enqueue(canvasId: string, msg: WSmsg) {
  const store: QueueStore = {
    id: randomUUIDv7(),
    state: msg,
    canvasId: canvasId,
    flushed: false,
    date: new Date(),
  };
  queue.push(store);
}

function dequeue(): QueueStore|undefined {
  if (queue.length == 0) {
    return undefined;
  }
  return queue.shift();
}

export { queue, enqueue, dequeue };
