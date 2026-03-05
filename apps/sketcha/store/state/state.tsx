import { atom } from "jotai";
import { toolTypes } from "../types/toolTypes";
import { Shapes } from "../types/shapes/shapeProps";
import { UserDataType } from "../types/user";
import { GetGuestName } from "../../utils/guest";
import { CanvasData } from "../types/canvas";

export const toolAtom = atom<toolTypes>("none");
export const lockAtom = atom<true | false>(false);
export const menuAtom = atom<true | false>(false);
export const collabAtom = atom<true | false>(false);
export const themeAtom = atom<"dark" | "bright">("dark");

export const drawnAtom = atom<Shapes[]>([]);

export const selectedIdAtom = atom<string | null>(null);
export const userModeAtom = atom<"signed" | "guest">("signed");

const sampleUserData: UserDataType = {
  isGuest: true,
  GuestName: GetGuestName(),
  name: "Aritra",
};
export const userDataAtom = atom<UserDataType>(sampleUserData);

const sampleCanvasData: CanvasData = {
  name: "#1312d3e2",
};

export const canvasDataAtom = atom<CanvasData>(sampleCanvasData);
