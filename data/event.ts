import { atom } from "recoil";

export interface EventResponse {
  status: number;
  message: string;
  code: string;
  data: IEventData[];
}

export interface IEventData {
  date: string;
  participants: string[];
  whichActivity: string;
  emotion: string;
  emotionRate: number;
}

export const eventData = atom<IEventData[]>({
  key: "eventData",
  default: [
    {
      date: "",
      participants: [],
      whichActivity: "",
      emotion: "",
      emotionRate: 0,
    },
  ],
});

export interface AllEventsResponse {
  status: number;
  message: string;
  code: string;
  data: Record<string, IEventData[]>; // 날짜별로 이벤트를 관리하는 객체
}

export const allEventsData = atom<Record<string, IEventData[]>>({
  key: "AllEventData",
  default: {},
});
