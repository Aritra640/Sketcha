-- CreateTable
CREATE TABLE "CanvasExport" (
    "canvasId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "CanvasExport_pkey" PRIMARY KEY ("canvasId")
);

-- AddForeignKey
ALTER TABLE "CanvasExport" ADD CONSTRAINT "CanvasExport_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "Canvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
