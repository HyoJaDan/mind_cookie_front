import { atom } from "recoil";

export interface EventData {
  date: string;
  participants: string[];
  whichActivity: string;
  emotion: string;
  emotionRate: number;
}

export interface EventResponse {
  status: number;
  message: string;
  code: string;
  data: EventData[];
}

export const eventData = atom<EventResponse>({
  key: "eventData",
  default: {
    status: 200,
    message: "요청에 성공하셨습니다",
    code: "200",
    data: [],
  },
});
