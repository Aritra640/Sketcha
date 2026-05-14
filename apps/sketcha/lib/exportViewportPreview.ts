import Konva from "konva";
import {
  PREVIEW_MIME_TYPE,
  PREVIEW_PIXEL_RATIO,
  PREVIEW_QUALITY,
} from "./preview";

export interface ExportViewportPreviewOptions {
  stage: Konva.Stage;
  transformer?: Konva.Transformer | null;
  mimeType?: typeof PREVIEW_MIME_TYPE;
  quality?: number;
  pixelRatio?: number;
}

export async function exportViewportPreview({
  stage,
  transformer,
  mimeType = PREVIEW_MIME_TYPE,
  quality = PREVIEW_QUALITY,
  pixelRatio = PREVIEW_PIXEL_RATIO,
}: ExportViewportPreviewOptions): Promise<Blob | null> {
  const viewport = {
    x: -stage.x(),
    y: -stage.y(),
    width: stage.width(),
    height: stage.height(),
  };

  if (viewport.width <= 0 || viewport.height <= 0) {
    return null;
  }

  const wasTransformerVisible = transformer?.visible() ?? false;

  try {
    transformer?.visible(false);
    transformer?.getLayer()?.batchDraw();

    const dataURL = stage.toDataURL({
      ...viewport,
      mimeType,
      pixelRatio,
      quality,
    });

    const response = await fetch(dataURL);

    return response.blob();
  } finally {
    if (transformer) {
      transformer.visible(wasTransformerVisible);
      transformer.getLayer()?.batchDraw();
    }
  }
}
