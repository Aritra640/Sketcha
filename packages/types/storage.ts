import { WSmsg } from ".";

type QueueStore = {
  id: string;
  state: WSmsg;
  canvasId: string;
  flushed: boolean;
  date: Date;
};

export type {QueueStore};
