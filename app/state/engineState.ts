import create from "zustand";

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
