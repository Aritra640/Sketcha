"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { canvasSettingsAtom } from "../../store/state/state";

const backgroundColors = [
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Dark Blue", value: "#1e3a8a" },
  { name: "Grey", value: "#6b7280" },
  { name: "Brown", value: "#92400e" },
  { name: "Dark Brown", value: "#663300" },
  { name: "Zinc", value: "#18181B" },
];

export function CanvasSettingsModal() {
  const [modal, setModal] = useAtom(canvasSettingsAtom);

  const [selectedBg, setSelectedBg] = useState("#3b82f6");

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-base-100 border border-base-300 shadow-2xl"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-base-300 flex justify-center items-center">
          <div>
            <h1 className="text-xl text-center font-bold tracking-tight">
              Canvas Settings
            </h1>

            <p className="text-sm text-base-content/60 mt-1 text-center">
              Customize your canvas experience
            </p>
          </div>
        </div>

        {/* Theme */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between rounded-xl border border-base-300 px-4 py-3 hover:bg-base-200/50 transition">
            <div>
              <h2 className="text-base font-semibold">Theme</h2>

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

        {/* Background Color */}
        <div className="px-6 pb-5">
          <div className="rounded-xl border border-base-300 px-4 py-4">
            <div className="mb-4">
              <h2 className="text-base font-semibold">
                Select Background Color
              </h2>

              <p className="text-xs text-base-content/60">
                Choose a canvas background color
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {backgroundColors.map((color) => {
                const active = selectedBg === color.value;

                return (
                  <button
                    key={color.value}
                    type="button"
                    title={color.name}
                    onClick={() => setSelectedBg(color.value)}
                    className={`
                      relative flex items-center justify-center
                      w-6 h-6 rounded-full
                      border transition-all duration-200
                      ${
                        active
                          ? "border-white scale-110 shadow-lg"
                          : "border-white/20 hover:scale-105"
                      }
                    `}
                    style={{
                      backgroundColor: color.value,
                    }}
                  >
                    {active && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-base-300 space-y-3">
          <Button name="Reset Canvas" variant="primary" />

          <Button name="Delete Canvas" variant="primary" />
        </div>

        <div className="pb-2" />
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
      className={`btn ${styles[variant]} w-full h-12 rounded-xl text-sm font-medium`}
    >
      {name}
    </button>
  );
}
