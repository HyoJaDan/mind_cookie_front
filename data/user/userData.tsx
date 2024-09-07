import { atom } from "recoil";

export const userToken = atom<string>({
  key: "userToken",
  default: "",
});

// MemberDTO의 타입 정의
export interface MemberDTO {
  event_participants: string[];
  event_activities: string[];
  event_emotions: string[];
  stopwatch_target: string[];
}

// Recoil Atom 정의
export const memberData = atom<MemberDTO>({
  key: "memberData",
  default: {
    event_participants: [],
    event_activities: [],
    event_emotions: [],
    stopwatch_target: [],
  },
});

export const userId = atom<number>({
  key: "userId",
  default: 1,
});

export interface IWeight {
  date: string;
  weight: number;
}

export interface IUserInMyRecord {
  calorie: number;
  intakedCalorie: number;
  weight: IWeight[];
}

export const userDataInMyRecord = atom<IUserInMyRecord>({
  key: "IUserInMyRecord",
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

export interface IUserInProfile {
  userName: string;
}
export const userDataInProfile = atom<IUserInProfile>({
  key: "IUserInProfile",
  default: {
    userName: "",
  },
});

export const IsMemberWithTeam = atom<boolean>({
  key: "IMemberWithTeam",
  default: false,
});
