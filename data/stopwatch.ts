// stateData.ts
import { atom } from "recoil";

export interface IStopwatch {
  time: string;
  target: string;
}

export const stopwatchData = atom<IStopwatch[]>({
  key: "stopwatchData",
  default: [{ time: "", target: "" }],
});
