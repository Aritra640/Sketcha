"use client";

import { useEffect, useState } from "react";

export default function RadialProgress() {
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    let start: number | null = null;
    const duration = 2000; // animation duration (ms)

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(percent));

      if (percent < 100) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div
      data-theme="dark"
      className="flex items-center justify-center h-screen w-screen bg-base-200"
    >
      <div
        className="radial-progress text-primary"
        style={
          {
            "--value": progress,
            "--size": "10rem",
            "--thickness": "10px",
          } as React.CSSProperties
        }
      >
        {progress}%
      </div>
    </div>
  );
}
