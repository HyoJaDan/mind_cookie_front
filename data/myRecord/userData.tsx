import axios from "axios";
import { atom, selector } from "recoil";

export const userId = atom<number | undefined>({
  key: "userId",
  default: 1,
});

export interface IWeight {
  date: string;
  weight: number;
}

export interface IUser {
  calorie: number;
  intakedCalorie: number;
  weight: IWeight[];
}

export const userData = atom<IUser>({
  key: "userData",
  default: {
    calorie: 2000,
    intakedCalorie: 1700,
    weight: [
      { date: "2021-10-01T00:00:00.000Z", weight: 70 },
      { date: "2021-10-02T00:00:00.000Z", weight: 70 },
      { date: "2021-10-03T00:00:00.000Z", weight: 70 },
      { date: "2021-10-04T00:00:00.000Z", weight: 70 },
      { date: "2021-10-05T00:00:00.000Z", weight: 70 },
    ],
  },
});
