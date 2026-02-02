import type { Size } from "./interfaces";

export const InteractionType = {
  Idle: "idle",
  Dragging: "dragging",
  Resizing: "resizing",
} as const;

export const DEFAULT_NOTE_SIZE: Size = { width: 250, height: 200 };

export type InteractionType = typeof InteractionType[keyof typeof InteractionType];
