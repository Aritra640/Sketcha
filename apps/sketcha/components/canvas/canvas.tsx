"use client";

import { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";

export function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <Stage className="" width={dimensions.width} height={dimensions.height}>
      <Layer>
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          shadowBlur={10}
          draggable
          stroke="white"
          cornerRadius={[10, 10, 10, 10]}
        />
      </Layer>
    </Stage>
  );
}
