"use client";

// import { useAtom } from "jotai";
import {
    AtSign,
    Brain,
  Database,
  Globe,
  Network,
  Pencil,
  Server,
  Shield,
  User,
  Workflow,
} from "lucide-react";

// import { utilsModalAtom } from "../../store/state/state";

const specialShapes = [
  User,
  Database,
  Server,
  Globe,
  Shield,
  Workflow,
  Network,
  Brain,
  AtSign
];

export function DemoUtilsModal() {
  // const [modal, setModal] = useAtom(utilsModalAtom);

  // if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-menu shadow-2xl border border-white/10 p-6 animate-in zoom-in-95 duration-200"
      >
        <div className="space-y-6">
          <div>
            <div className="font-mono text-sm font-bold mb-3">
              Get Shared Canvas
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste shared string..."
                className="input input-ghost rounded-xl w-full bg-black/20"
              />

              <button className="btn rounded-xl px-5">Open</button>
            </div>
          </div>

          <div>
            <div className="font-mono text-sm font-bold mb-4">
              Special Shapes
            </div>

            <div className="flex flex-wrap gap-4">
              {specialShapes.map((Icon, index) => (
                <button
                  key={index}
                  className="cursor-pointer w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:scale-105 transition-all flex items-center justify-center"
                >
                  <Icon size={30} strokeWidth={1.8} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="font-mono text-sm font-bold">
              System Design Mode
            </div>

            <div className="text-xs opacity-60 mt-2 leading-relaxed">
              APIs, databases, queues, infra nodes, and distributed system
              diagrams coming soon.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Pencil size={16} />
              <div className="font-mono text-sm font-bold">
                Prompt to Sketch
              </div>
            </div>

            <div className="text-xs opacity-60 mt-2 leading-relaxed">
              Describe diagrams, interfaces, flows, architectures, or rough
              concepts and instantly turn them into visual sketches on the
              canvas coming soon.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
