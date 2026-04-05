"use client";

import { useAtom } from "jotai";
import { UserDataType } from "../../store/types/user";
import { canvasDataAtom, userDataAtom } from "../../store/state/state";
import { useEffect } from "react";
import { MenuButton } from "../menu/button";
import { ToolArea } from "../toolbar/toolarea";
import { CollabeButton } from "../collaborate/button";
import { Canvas } from "./canvas";
import { CanvasData } from "../../store/types/canvas";

interface CanvasPageComponentProp {
  userData: UserDataType;
  canvasData?: CanvasData;
}

export function CanvasPageComponent({ userData, canvasData }: CanvasPageComponentProp) {
  const [user, setUser] = useAtom(userDataAtom);
  const [canvas, setCanvas] = useAtom(canvasDataAtom);
  useEffect(() => {
    setUser(userData);

    if(!userData.isGuest && canvasData !== undefined) {
      setCanvas(canvasData);
    }
  });

  return (
    <div className="bg-background h-screen w-screen">
      <MenuButton />
      <div>
        <ToolArea />
      </div>
      <CollabeButton />
      <Canvas />
    </div>
  );
}
