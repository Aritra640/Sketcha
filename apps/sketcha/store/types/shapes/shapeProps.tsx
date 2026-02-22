interface RectProps {
  type: "Rect";
  x: number;
  y: number;
  width: number;
  height: number;
  shadowBlur: number;
  stroke: string;
  strokeWidth: number;
  cornerRadius: number[];
}

interface CircleProp {
  type: "Circle";
  x: number;
  y: number;
  rx: number; //radius in x axis
  ry: number; //radius in y axis
  fill: string;
  stroke: string;
  shadowBlur: number;
  strokeWidth: number;
}

interface LineProp {
  type: "Line"
  points: number[];
  stroke: string;
  strokeWidth: number;
  LineCap: string;
  y: number;
  shadowBlur: number;
}

export type Shapes = RectProps|LineProp|CircleProp;
