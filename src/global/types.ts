import type { Position, Size } from "./interfaces";
import { InteractionType } from "././constants";

export type InteractionState =
  | { type: typeof InteractionType.Idle }
  | { 
      type: typeof InteractionType.Dragging; 
      noteId: string; 
      offset: Position; // This is the mouse offset from note top-left
    }
  | { 
      type: typeof InteractionType.Resizing; 
      noteId: string; 
      startMouse: Position;
      startSize: Size;
    };
