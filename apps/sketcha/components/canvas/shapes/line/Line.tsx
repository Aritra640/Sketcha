import { useAtom } from "jotai";
import { Shapes } from "../../../../store/types/shapes/shapeProps";
import { drawnAtom, selectedIdAtom } from "../../../../store/state/state";
import { Line } from "react-konva";
import { LineCap } from "konva/lib/Shape";
import Konva from "konva";

interface LineProps{
  key: number;
  shape: Shapes;
}

export default function LineShape({key, shape}: LineProps) {
  
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [drawnShapes, setDrawnShapes] = useAtom(drawnAtom);

  console.log("line id: ", key)

  if(shape.type == "Line") {
    return  (
      <Line 
        id={shape.id}
        key={shape.id}
        points={shape.points}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
        lineCap={shape.LineCap as LineCap} //TODO: type LineCap(konva) might cause error
        y={shape.y}
        shadowBlur={shape.shadowBlur}
        draggable
        onClick={() => {
          // e.cancelBubble = true;
          setSelectedId(shape.id);
        }}
        onTap={() => {
          // e.cancelBubble = true;
          setSelectedId(shape.id);
        }}

        onDragEnd={(e) => {
        }}
      />
    );
  }
}
