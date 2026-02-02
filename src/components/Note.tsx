import type { Note as NoteType, Position } from "../global/interfaces";

interface Props {
  readonly note: NoteType;
  readonly noteCounter: number;
  readonly isDragging: boolean;
  readonly onDragStart: (noteId: string, offset: Position) => void;
  readonly onResizeStart: (noteId: string, mousePos: Position) => void;
}

export const Note: React.FC<Props> = ({
  note,
  noteCounter,
  isDragging,
  onDragStart,
  onResizeStart,
}) => {
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onDragStart(note.id, {
      x: e.clientX - note.position.x,
      y: e.clientY - note.position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onResizeStart(note.id, { x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="note-body"
      style={{
        backgroundColor: note.color.bg,
        borderColor: `2px solid ${note.color.border}`,
        left: note.position.x,
        top: note.position.y,
        width: note.size.width,
        height: note.size.height,
        boxShadow: isDragging
          ? "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
          : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}
    >
      {/* Drag Handle (Header) */}
      <div
        onMouseDown={handleHeaderMouseDown}
        className="note-header"
        style={{
          backgroundColor: note.color.header,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        Note {noteCounter} ({note.id.slice(0, 4)})
      </div>

      {/* Content Area */}
      <div className="note-content">
        You will be able to add/edit content here later.
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="note-on-resize"
        aria-label="resize"
      />
    </div>
  );
};
