import type { InteractionState } from "../global/types";
import type { Note as NoteType, Size, Position } from "../global/interfaces";
import { useState, useCallback, useRef, useEffect } from "react";
import { checkCollision, getRandomColor } from "../utils/geometry";
import { Note } from "./Note";
import { TrashZone } from "./TrashZone";
import { DEFAULT_NOTE_SIZE, InteractionType } from "../global/constants";

const TRASH_CONFIG = {
  position: { x: 20, y: window.innerHeight - 200 },
  size: { width: 120, height: 120 },
};

export const Board: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [interaction, setInteraction] = useState<InteractionState>({
    type: InteractionType.Idle,
  });
  const [isOverTrash, setIsOverTrash] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(5, 15);

  // Create a new note centered at double-click position
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (e.target !== boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const newNote: NoteType = {
      id: generateId(),
      position: {
        x: e.clientX - rect.left - DEFAULT_NOTE_SIZE.width / 2,
        y: e.clientY - rect.top - DEFAULT_NOTE_SIZE.height / 2,
      },
      size: DEFAULT_NOTE_SIZE,
      color: getRandomColor(),
    };

    setNotes((prev) => [...prev, newNote]);
  };

  // Global mouse move handler
  useEffect(() => {
    if (interaction.type === InteractionType.Idle) return;

    const handleMouseMove = (e: MouseEvent) => {
      setNotes((currentNotes) => {
        const noteIndex = currentNotes.findIndex(
          (n) => n.id === interaction.noteId,
        );

        if (noteIndex === -1) return currentNotes;

        const note = currentNotes[noteIndex];
        const newNotes = [...currentNotes];

        if (interaction.type === InteractionType.Dragging) {
          const newPos: Position = {
            x: e.clientX - interaction.offset.x,
            y: e.clientY - interaction.offset.y,
          };

          // Check trash collision
          const overTrash = checkCollision(
            newPos,
            note.size,
            TRASH_CONFIG.position,
            TRASH_CONFIG.size,
          );

          setIsOverTrash(overTrash);

          newNotes[noteIndex] = { ...note, position: newPos };
        } else if (interaction.type === InteractionType.Resizing) {
          const deltaX = e.clientX - interaction.startMouse.x;
          const deltaY = e.clientY - interaction.startMouse.y;

          const newSize: Size = {
            width: Math.max(150, interaction.startSize.width + deltaX),
            height: Math.max(150, interaction.startSize.height + deltaY),
          };

          newNotes[noteIndex] = { ...note, size: newSize };
        }

        return newNotes;
      });
    };

    const handleMouseUp = () => {
      // Delete if over trash
      if (interaction.type === InteractionType.Dragging && isOverTrash) {
        setNotes((prev) => prev.filter((n) => n.id !== interaction.noteId));
      }

      setInteraction({ type: InteractionType.Idle });
      setIsOverTrash(false);
    };

    // Add global listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Cleanup listeners
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [interaction, isOverTrash]);

  const handleDragStart = useCallback((noteId: string, offset: Position) => {
    setInteraction({ type: InteractionType.Dragging, noteId, offset });
  }, []);

  const handleResizeStart = useCallback(
    (noteId: string, mousePos: Position) => {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        setInteraction({
          type: InteractionType.Resizing,
          noteId,
          startMouse: mousePos,
          startSize: note.size,
        });
      }
    },
    [notes],
  );

  return (
    <div
      ref={boardRef}
      onDoubleClick={handleDoubleClick}
      className="board-panel"
    >
      <div className="board-actions">
        <div><strong>Double-click</strong> to create</div>
        <div><strong>Drag header</strong> to move</div>
        <div><strong>Drag corner</strong> to resize</div>
        <div><strong>Drop on trash</strong> to delete</div>
      </div>

      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          noteCounter={notes.indexOf(note) + 1}
          isDragging={
            interaction.type === InteractionType.Dragging && interaction.noteId === note.id
          }
          onDragStart={handleDragStart}
          onResizeStart={handleResizeStart}
        />
      ))}

      <TrashZone
        position={TRASH_CONFIG.position}
        size={TRASH_CONFIG.size}
        isActive={isOverTrash}
      />
    </div>
  );
};
