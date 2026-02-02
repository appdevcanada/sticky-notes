import type { Position, Size } from "../global/interfaces";

interface Props {
  readonly position: Position;
  readonly size: Size;
  readonly isActive: boolean;
}

export const TrashZone: React.FC<Props> = ({ position, size, isActive }) => {
  return (
    <div
      className="note-trash-zone"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        backgroundColor: isActive ? "#ff5252" : "#bbb5b5",
        border: `2px dashed ${isActive ? "#ff5252" : "#f44336"}`,
      }}
    >
      <img
        src="/trash.png"
        alt="Trash Icon"
        width={64}
        height={64}
      />
    </div>
  );
};
