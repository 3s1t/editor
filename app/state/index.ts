import create from "zustand";
import produce from "immer";
import { defaultInitialEditorState } from "./defaultState";
import { getItemAtBreadcrumbs } from "./helpers";

/**
 * Engine
 */
export interface EngineState {
  elapsedTime: number;
  setElapsedTime: (to: number) => void;

  crankshaftAngle: number;
  setCrankshaftAngle: (to: number) => void;
}

export const useEngineStore = create<EngineState>()((set) => ({
  elapsedTime: 0,
  setElapsedTime: (to) => set(() => ({ elapsedTime: to })),

  crankshaftAngle: 0,
  setCrankshaftAngle: (to) => set(() => ({ crankshaftAngle: to })),
}));

export { useEditorStore } from "./editorState";
export type {
  TabState,
  SplitGroupState,
  TabGroupState,
  EditorState,
  ViewDropArea,
  EditorStore,
} from "./editorState";
