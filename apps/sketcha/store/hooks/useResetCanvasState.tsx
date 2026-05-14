import { useAtom } from "jotai";
import { canvasDataAtom, drawnAtom, hydrateState } from "../state/state";

export function useResetCanvasState() {
  const [drawn, setDrawn] = useAtom(drawnAtom);
  const [hydrate, setHydrate] = useAtom(hydrateState);

  setDrawn([]);
  setHydrate(false);
}
