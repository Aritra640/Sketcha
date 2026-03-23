import { prisma } from "@repo/db_auth_service";
import { dequeue, enqueue, queue } from "./queue";
import { QueueStore } from "@repo/types/storage";

async function processItem(item: QueueStore) {
  const state = item.state;

  switch (state.command) {
    case "ADD":
    case "UPDATE":
      await prisma.shape.upsert({
        where: { id: state.shape.id },
        update: {
          shape: JSON.parse(JSON.stringify(state.shape)),
          type: state.shape.type,
        },
        create: {
          canvasId: item.canvasId,
          shape: JSON.parse(JSON.stringify(state.shape)),
          type: state.shape.type,
        },
      });
      break;

    case "DELETE":
      await prisma.shape
        .delete({
          where: { id: state.shape.id },
        })
        .catch(() => {}); // ignore if not found
      break;
  }
}
export async function startWorker() {
  while (true) {
    const item = dequeue();

    if (!item) {
      await Bun.sleep(50); // idle wait
      continue;
    }

    try {
      await processItem(item);
    } catch (err) {
      console.error("Worker failed:", err);

      // 🔥 IMPORTANT: retry strategy (simple)
      // push back to queue
      // (optional for now, but recommended)

      queue.unshift(item); // put back at front
      await Bun.sleep(100);
    }
  }
}
