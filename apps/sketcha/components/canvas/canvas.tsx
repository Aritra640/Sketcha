"use client";

import { Stage, Layer, Rect } from "react-konva";

export function Canvas() {
  return (
    <Stage className="" width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          shadowBlur={10}
          draggable
          stroke="white"
          strokeWidth={3}
          cornerRadius={[10,10,10,10]}
        />
      </Layer>
    </Stage>
  );
}
