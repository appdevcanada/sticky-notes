# Sticky Notes Application

A single-page web application using **React 19 + TypeScript + Vite** for creating and managing draggable sticky notes on a virtual board.

## Goal
Implement a desktop-focused sticky notes interface supporting four core interactions:
- **Create**: Double-click anywhere on the board to spawn a new note at the cursor position
- **Move**: Drag notes by their header to reposition
- **Resize**: Drag the bottom-right corner handle to adjust dimensions
- **Delete**: Drop notes onto the trash zone to remove them from the board

## Extra Features
Different note colours - every new note will get a different colour based on a pre-defined palette.

## Architecture
The application follows a centralized state architecture where the `Board` component maintains the source of truth for all notes and interaction states. Domain entities are strictly typed using TypeScript interfaces (`Note`, `Position`, `Size`, `NoteColor`) and types, ensuring compile-time safety across the component boundary. 

Drag and resize interactions are handled via native mouse events attached to the window during active operations, which decouples the drag logic from the component render cycle and prevents cursor-loss issues when moving quickly. The `Note` component is purely presentational, receiving data and callbacks via props, while `Board` orchestrates collision detection (for trash deletion), state mutations, and coordinates exit animations. This unidirectional data flow makes the application predictable and testable, with performance maintained by minimizing re-renders through targeted state updates.

## Installation

1. **Clone or extract** the project folder to your hard drive
2. **Open terminal** in the project root directory
3. **Install dependencies**:
```
npm install