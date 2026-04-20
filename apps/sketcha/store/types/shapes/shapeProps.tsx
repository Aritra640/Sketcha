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
  startX: number;
  startY: number;
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
  type: "Line"
  id: string;
  points: number[];
  stroke: string;
  strokeWidth: number;
  y: number;
  x: number;
  shadowBlur: number;
  lineCap: "butt" | "round" | "square";
}

export interface ArrowProp {
  type: "Arrow";
  id: string;

  x: number;
  y: number;

  points: number[];

  stroke: string;
  strokeWidth: number;
  shadowBlur: number;

  pointerLength: number;
  pointerWidth: number;

  lineCap: "butt" | "round" | "square";
}

export interface PencilProp {
  type: "Pencil";
  id: string;

  x: number;
  y: number;

  points: number[];

  stroke: string;
  strokeWidth: number;
  shadowBlur: number;

  lineCap: "round" | "butt" | "square";
  lineJoin: "round" | "bevel" | "miter";
}


export type Shapes = RectProps|LineProp|CircleProp|ArrowProp|PencilProp;
