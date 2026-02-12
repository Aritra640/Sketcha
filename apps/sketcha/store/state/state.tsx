import { atom } from "jotai";
import { toolTypes } from "../types/toolTypes";

export const toolAtom = atom<toolTypes>("none");
export const lockAtom = atom<true | false>(false);
export const menuAtom = atom<true | false>(false);
export const collabAtom = atom<true| false>(false);
