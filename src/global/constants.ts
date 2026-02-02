export const InteractionType = {
  Idle: "idle",
  Dragging: "dragging",
  Resizing: "resizing",
} as const;

export type InteractionType = typeof InteractionType[keyof typeof InteractionType];
