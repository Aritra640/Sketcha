import { RefObject, useEffect, useRef } from "react";
import Konva from "konva";
import { exportViewportPreview } from "../../lib/exportViewportPreview";
import { deletePreview, savePreview } from "../../lib/preview";
import { Shapes } from "../types/shapes/shapeProps";

interface UseDebouncedPreviewGenerationOptions {
  canvasId: string;
  stageRef: RefObject<Konva.Stage | null>;
  transformerRef: RefObject<Konva.Transformer | null>;
  shapes: Shapes[];
  enabled: boolean;
  isInteracting: boolean;
  stageX: number;
  stageY: number;
  stageWidth: number;
  stageHeight: number;
  debounceMs?: number;
}

export function useDebouncedPreviewGeneration({
  canvasId,
  stageRef,
  transformerRef,
  shapes,
  enabled,
  isInteracting,
  stageX,
  stageY,
  stageWidth,
  stageHeight,
  debounceMs = 1500,
}: UseDebouncedPreviewGenerationOptions) {
  const exportRequestRef = useRef(0);

  useEffect(() => {
    if (!enabled || isInteracting || !canvasId) {
      return;
    }

    const requestId = exportRequestRef.current + 1;
    exportRequestRef.current = requestId;

    const timeoutId = window.setTimeout(async () => {
      if (shapes.length === 0) {
        await deletePreview(canvasId);
        return;
      }

      const stage = stageRef.current;

      if (!stage || exportRequestRef.current !== requestId) {
        return;
      }

      const blob = await exportViewportPreview({
        stage,
        transformer: transformerRef.current,
      });

      if (!blob || exportRequestRef.current !== requestId) {
        return;
      }

      await savePreview(canvasId, blob);
    }, debounceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    canvasId,
    debounceMs,
    enabled,
    isInteracting,
    shapes,
    stageHeight,
    stageRef,
    stageWidth,
    stageX,
    stageY,
    transformerRef,
  ]);
}
