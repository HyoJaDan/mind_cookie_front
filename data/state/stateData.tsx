// stateData.ts
import { atom } from "recoil";

export interface StateDTO {
  date: string;
  positive: number;
  negative: number;
  lifeSatisfaction: number;
  physicalConnection: number;
}

export const stateData = atom<StateDTO[]>({
  key: "stateData",
  default: [],
});
