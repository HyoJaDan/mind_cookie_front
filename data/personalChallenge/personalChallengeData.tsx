import { atom } from "recoil";

export interface EtcGoal {
  id: number | string;
  goalName: string;
  done: boolean;
}

export interface IExercise {
  exerciseCalorie: number;
  durationInSeconds: number;
  done: boolean;
}

export interface mealRecords {
  id: string;
  createdTime: string;
  type: "meal" | "snack";
  title: string;
  calorie: number;
  content: string;
  imageUrl: string | null;
}

interface Challenge {
  id: number;
  etcGoals: EtcGoal[];
  exercise: IExercise;
  mealRecords: mealRecords[];
}

enum Status {
  Before = "before",
  Active = "active",
  After = "after",
}

interface Team {
  teamId: number;
  teamName: string;
}

export interface ITodayPersonalChallenge {
  status: Status;
  challenge: Challenge | null;
  team: Team;
}

export const todayPersonalChallenge = atom<ITodayPersonalChallenge>({
  key: "todayPersonalChallenge",
  default: {
    status: Status.Active,
    team: {
      teamId: 1,
      teamName: "챌린지",
    },
    challenge: {
      id: 0,
      etcGoals: [],
      exercise: {
        exerciseCalorie: 0,
        durationInSeconds: 0,
        done: false,
      },
      mealRecords: [
        {
          id: Date.now().toString(),
          createdTime: new Date().toISOString(),
          calorie: 0,
          content: "",
          type: "meal",
          title: "오늘의 1번째 식사",
          imageUrl: null,
        },
      ],
    },
  },
});

interface ExerciseOption {
  label: string;
  value: string;
  caloriesPerSecond: number; // 초당 소모 칼로리
}

export const exerciseOptions: ExerciseOption[] = [
  { label: "달리기", value: "running", caloriesPerSecond: 0.015 },
  { label: "헬스", value: "gym", caloriesPerSecond: 0.011 },
  { label: "걷기", value: "walking", caloriesPerSecond: 0.009 },
  { label: "축구", value: "soccer", caloriesPerSecond: 0.013 },
  { label: "줄넘기", value: "skipping", caloriesPerSecond: 0.016 },
  { label: "계단오르기", value: "stairClimbing", caloriesPerSecond: 0.015 },
  { label: "버피테스트", value: "burpee", caloriesPerSecond: 0.017 },
  // 여기에 더 추가할 수 있습니다.
];
