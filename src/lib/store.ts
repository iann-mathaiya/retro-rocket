import { atom } from "jotai";
import type { CartItem } from "./types";

export const cartAtom = atom<CartItem[]>([]);