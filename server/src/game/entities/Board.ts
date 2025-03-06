import { Player } from "../../player/entities/Player";

export type ElementType = "player" | "bush";

export interface Element {
  x: number;
  y: number;
  type: ElementType;
  identificador?: string;
}

export interface Board {
  size: number;
  elements: Element[];
}
