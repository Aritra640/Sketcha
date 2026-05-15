"use client";

import { useAtom } from "jotai";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { yourCanvasesAtom, userDataAtom } from "../../store/state/state";
import { CanvasData } from "../../store/types/canvas";
import { SketchaLibraryCard } from "../canvas_export/libraryCard";

export function YourCanvasesModal() {
  const [modal, setModal] = useAtom(yourCanvasesAtom);
  const [user] = useAtom(userDataAtom);
  const router = useRouter();
  const [canvases, setCanvases] = useState<CanvasData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!modal || !user.id) {
      return;
    }

    const abortController = new AbortController();

    async function loadCanvases() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `/api/canvas?userId=${encodeURIComponent(user.id ?? "")}`,
          {
            cache: "no-store",
            signal: abortController.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load canvases");
        }

        const nextCanvases: CanvasData[] = await response.json();

        if (!abortController.signal.aborted) {
          setCanvases(nextCanvases);
        }
      } catch (err) {
        if (abortController.signal.aborted) {
          return;
        }

        console.error("Error loading canvas library:", err);
        setErrorMessage("Could not load your canvases");
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadCanvases();

    return () => abortController.abort();
  }, [modal, user.id]);

  const filteredCanvases = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return canvases;
    }

    return canvases.filter((canvas) =>
      canvas.title.toLowerCase().includes(normalizedSearch),
    );
  }, [canvases, searchTerm]);

  function openCanvas(canvasId: string) {
    if (!user.id) {
      return;
    }

    setModal(false);
    router.push(`/canvas/user/${user.id}/${canvasId}`);
  }

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-5 flex max-h-[82vh] w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-menu p-5 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="font-extrabold">Sketcha Library</div>

        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
          <Search size={16} className="shrink-0 text-white/45" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search canvases"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
        </div>

        <div className="mt-4 min-h-48 overflow-y-auto pr-1">
          {isLoading && (
            <div className="flex h-48 items-center justify-center text-sm text-white/45">
              Loading canvases...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="flex h-48 items-center justify-center text-sm text-red-200/80">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && filteredCanvases.length === 0 && (
            <div className="flex h-48 items-center justify-center text-sm text-white/45">
              {canvases.length === 0
                ? "Your sketcha library is currently empty"
                : "No canvases match your search"}
            </div>
          )}

          {!isLoading && !errorMessage && filteredCanvases.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredCanvases.map((canvas) => (
                <SketchaLibraryCard
                  key={canvas.id}
                  canvasId={canvas.id}
                  title={canvas.title}
                  onOpen={openCanvas}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
