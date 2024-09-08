// src/data/date/dateState.ts
import { atom } from "recoil";

export const dateData = atom<string>({
  key: "dateData", // Recoil에서 고유한 key 값
  default: "", // 기본값은 빈 문자열
});
