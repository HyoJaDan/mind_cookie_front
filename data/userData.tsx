import { atom } from "recoil";

export const userToken = atom<string>({
  key: "userToken",
  default: "",
});

export const baseURLData = atom<string>({
  key: "baseURLData",
  default: "", // 기본 URL 설정
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
