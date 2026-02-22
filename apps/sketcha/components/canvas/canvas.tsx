"use client";

import { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { toolTypes } from "../../store/types/toolTypes";

interface Shapes {
  type: toolTypes;
  prop?: JSON;
}

export function Canvas() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [shapes, setShapes] = useState<Shapes[]>([] as Shapes[]);
  const [curShape, setCurShape] = useState<Shapes>({type: "none"});
  const [isDrawing, setIsDrawing] = useState<true|false>(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
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
