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

interface DateTimeDTO {
  date: string; // LocalDate는 문자열로 표현
  time: string; // LocalTime은 문자열로 표현
}

export interface IAllStopwatch {
  target: string;
  dateTimeList: DateTimeDTO[];
}

// Atom: 스탑워치 데이터를 관리할 상태
export const allStopwatchData = atom<IAllStopwatch[]>({
  key: "allStopwatchData", // unique key for this atom
  default: [], // 기본값은 빈 배열
});
