import { atom } from "recoil";

export interface HobbitStatus {
  hobbitId: number;
  hobbit: string;
  done: boolean;
}

export interface PrimaryHobbit {
  primaryHobbitId: number;
  primaryHobbit: string;
  color: string;
  hobbitStatuses: HobbitStatus[];
}

export interface IStatusByDate {
  date: string;
  hobbitStatus: boolean[];
}

export const statusByDateData = atom<IStatusByDate[]>({
  key: "statusByDateData",
  default: [],
});

export interface ITop3Succeess {
  name: string;
  numOfSucceed: number;
}

export const top3SucceessData = atom<ITop3Succeess[]>({
  key: "top3SucceessData",
  default: [],
});

export interface TempHobbitStatus {
  hobbitId: number;
  hobbit: string;
}

export interface TempPrimaryHobbit {
  primaryHobbitId: number;
  primaryHobbit: string;
  color: string;
  hobbitStatuses: TempHobbitStatus[];
}

export const tempTodoData = atom<TempPrimaryHobbit[]>({
  key: "TemptodoData", // atom의 고유 key
  default: [], // 초기값은 빈 배열로 설정
});
