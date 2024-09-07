// stateData.ts
import { atom } from "recoil";

export interface StateDTO {
  positive: number;
  negative: number;
  lifeSatisfaction: number;
  physicalCondition: number;
}

export const stateData = atom<StateDTO>({
  key: "stateData",
  default: {
    positive: 0,
    negative: 0,
    lifeSatisfaction: 0,
    physicalCondition: 0,
  },
});
