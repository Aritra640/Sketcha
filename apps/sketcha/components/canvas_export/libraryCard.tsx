"use client";

import { useEffect, useRef, useState } from "react";
import { loadPreview } from "../../lib/preview";

interface SketchaLibraryCardInterface {
  canvasId: string;
  title?: string;
  onOpen?: (canvasId: string) => void;
}

type PreviewStatus = "idle" | "loading" | "ready" | "missing";

export function SketchaLibraryCard({
  canvasId,
  title = "Untitled canvas",
  onOpen,
}: SketchaLibraryCardInterface) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [shouldLoadPreview, setShouldLoadPreview] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>("idle");

  useEffect(() => {
    const card = cardRef.current;

    if (!card || shouldLoadPreview) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoadPreview(true);
        observer.disconnect();
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [shouldLoadPreview]);

  useEffect(() => {
    if (!shouldLoadPreview) {
      return;
    }

    let cancelled = false;

    async function loadPreviewURL() {
      setPreviewStatus("loading");

      const preview = await loadPreview(canvasId);

      if (cancelled) {
        return;
      }

      if (!preview) {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }

        setPreviewURL(null);
        setPreviewStatus("missing");
        return;
      }

      const nextObjectURL = URL.createObjectURL(preview.blob);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      objectUrlRef.current = nextObjectURL;
      setPreviewURL(nextObjectURL);
      setPreviewStatus("ready");
    }

    void loadPreviewURL();

    return () => {
      cancelled = true;
    };
  }, [canvasId, shouldLoadPreview]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen?.(canvasId)}
      className="group w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] text-left transition hover:border-white/25"
    >
      <div
        className="aspect-[16/10] bg-neutral-900 bg-cover bg-center"
        style={{
          backgroundImage: previewURL ? `url(${previewURL})` : undefined,
        }}
      >
        {previewStatus !== "ready" && (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            {previewStatus === "loading"
              ? "Loading preview..."
              : "No preview yet"}
          </div>
        )}
      </div>

      <div className="truncate px-3 py-2 text-sm font-medium text-white/85">
        {title}
      </div>
    </button>
  );
}
