import { atom } from "recoil";

export interface IEventData {
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
  data: IEventData[];
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
