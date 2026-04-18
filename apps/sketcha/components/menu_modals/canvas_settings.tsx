"use client";

import { useAtom } from "jotai";
import { canvasSettingsAtom } from "../../store/state/state";

export function CanvasSettingsModal() {
  const [modal, setModal] = useAtom(canvasSettingsAtom);

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-base-100 shadow-2xl border border-base-300"
      >
        <div className="px-6 py-5 border-b flex justify-center items-center border-base-300">
          <div>
            <h1 className="text-xl text-center font-bold tracking-tight">
              Canvas Settings
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Customize your canvas experience
            </p>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="flex items-center justify-between rounded-xl border border-base-300 px-4 py-3 hover:bg-base-200/50 transition">
            <div>
              <h2 className="text-base font-semiboldt">Theme</h2>
              <p className="text-xs text-base-content/60">
                Toggle dark / light mode
              </p>
            </div>

            <input
              type="checkbox"
              className="toggle border-black bg-black/90 checked:border-slate-400 checked:bg-slate-300 checked:text-white"
            />
          </div>
        </div>

        <div className="px-6 py-5 border-t border-base-300 space-y-3">
          <Button name="Reset Canvas" variant="primary" />
          <Button name="Delete Canvas" variant="primary" />
        </div>

        <div className="pt-1.5"></div>
      </div>
    </div>
  );
}

interface ButtonProps {
  name: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

function Button({ name, onClick, variant = "primary" }: ButtonProps) {
  const styles = {
    primary: "btn-soft bg-selectedtool hover:bg-collab",
    secondary: "btn-outline",
    danger: "btn-soft bg-collab",
  };

  return (
    <button
      onClick={onClick}
      className={`btn ${styles[variant]} w-full h-12 text-sm font-medium rounded-xl`}
    >
      {name}
    </button>
  );
}
