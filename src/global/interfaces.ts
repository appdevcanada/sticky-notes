export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface Note {
  readonly id: string;
  position: Position;
  size: Size;
  color: NoteColor;
}

export interface NoteColor {
  readonly bg: string;
  readonly border: string;
  readonly header: string;
}