import type { Position, Size } from "../global/interfaces";

export const checkCollision = (
    pos1: Position, 
    size1: Size, 
    pos2: Position, 
    size2: Size
): boolean => {
    return (
        pos1.x < pos2.x + size2.width &&
        pos1.x + size1.width > pos2.x &&
        pos1.y < pos2.y + size2.height &&
        pos1.y + size1.height > pos2.y
    );
};

// Predefined pleasant pastel colors (better than pure random)
const NOTE_COLORS = [
  { bg: '#fff176', border: '#fdd835', header: '#fdd835' }, // Yellow
  { bg: '#ff8a80', border: '#ff5252', header: '#ff5252' }, // Red
  { bg: '#82b1ff', border: '#448aff', header: '#448aff' }, // Blue
  { bg: '#b9f6ca', border: '#69f0ae', header: '#69f0ae' }, // Green
  { bg: '#ffd180', border: '#ffab40', header: '#ffab40' }, // Orange
  { bg: '#e1bee7', border: '#ce93d8', header: '#ce93d8' }, // Purple
  { bg: '#80deea', border: '#4dd0e1', header: '#4dd0e1' }, // Cyan
  { bg: '#ffccbc', border: '#ffab91', header: '#ffab91' }, // Deep Orange
] as const;

export const getRandomColor = () => 
  NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
