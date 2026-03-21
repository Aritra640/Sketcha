console.log("Hello from types - Bun!");
export interface RectProps {
  type: "Rect";
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shadowBlur: number;
  stroke: string;
  strokeWidth: number;
  cornerRadius: number[];
}

export interface CircleProp {
  type: "Circle";
  id: string;
  x: number;
  y: number;
  rx: number; //radius in x axis
  ry: number; //radius in y axis
  fill: string;
  stroke: string;
  shadowBlur: number;
  strokeWidth: number;
}

export interface LineProp {
  type: "Line";
  id: string;
  points: number[];
  stroke: string;
  strokeWidth: number;
  LineCap: string;
  y: number;
  x: number;
  shadowBlur: number;
}

type Shapes = RectProps | LineProp | CircleProp;
export type { Shapes };

type WSmsg = {
  command: "ADD" | "UPDATE" | "DELETE";
  shape: Shapes;
};

export type {WSmsg};
