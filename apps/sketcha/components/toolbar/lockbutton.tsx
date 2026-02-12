"use client";

import { useAtom } from "jotai";
import { lockAtom } from "../../store/state/state";

interface LockButtonProps {
  shape: React.ReactNode;
}

export function LockButton({ shape }: LockButtonProps) {
  const [lock, setLock] = useAtom(lockAtom);
  const isSelected = lock;

  return (
    <button
      type="button"
      className={`rounded-2xl btn btn-sm sm:btn-md border-transparent ${
        isSelected
          ? "bg-[var(--color-selectedtool)] text-white"
          : "bg-transparent hover:bg-white/10"
      }`}
      onClick={() => setLock(!lock)}
    >
      <div>{shape}</div>
    </button>
  );
}
