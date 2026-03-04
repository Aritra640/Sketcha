import { atom } from "jotai";
import { toolTypes } from "../types/toolTypes";
import { Shapes } from "../types/shapes/shapeProps";
import { UserDataType } from "../types/user";
import { GetGuestName } from "../../utils/guest";

export const toolAtom = atom<toolTypes>("none");
export const lockAtom = atom<true | false>(false);
export const menuAtom = atom<true | false>(false);
export const collabAtom = atom<true | false>(false);
export const themeAtom = atom<"dark" | "bright">("dark");

export const drawnAtom = atom<Shapes[]>([]);

export const selectedIdAtom = atom<string | null>(null);
export const userModeAtom = atom<"signed" | "guest">("guest");

const sampleUserData: UserDataType = {
  isGuest: true,
  GuestName: GetGuestName(),
};
export const userDataAtom = atom<UserDataType>(sampleUserData);
