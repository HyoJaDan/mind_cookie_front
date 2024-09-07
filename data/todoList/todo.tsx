import { atom } from "recoil";

export interface HobbitStatus {
  hobbitId: number;
  hobbit: string;
  done: boolean;
}

export interface PrimaryHobbit {
  primaryHobbitId: number;
  primaryHobbit: string;
  hobbitStatuses: HobbitStatus[];
}

export const todoData = atom<PrimaryHobbit[]>({
  key: "todoData", // atom의 고유 key
  default: [], // 초기값은 빈 배열로 설정
});
