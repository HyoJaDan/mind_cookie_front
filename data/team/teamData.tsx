import { atom } from "recoil";

export const teamId = atom<number>({
  key: "teamId",
  default: 1,
});

export interface ITeams {
  id: number;
  teamName: string;
  maxTeamMemberNumber: number;
  startDate: Date;
  endDate: Date;
  challngeType: string;
  numOfMember: number;
}

export const everyTeamData = atom<ITeams[]>({
  key: "everyTeamData",
  default: [
    {
      id: 0,
      teamName: "teamName",
      maxTeamMemberNumber: 0,
      startDate: new Date("2021-10-01T00:00:00.000Z"),
      endDate: new Date("2021-10-01T00:00:00.000Z"),
      challngeType: "challngeType",
      numOfMember: 0,
    },
  ],
});

export enum RecordType {
  meal,
  snack,
}
export interface MealRecord {
  id: number;
  createdTime: string;
  title: string;
  content: string;
  recordType: RecordType;
  imageUrl: string;
}
export interface memberDTOS {
  flatMap: any;
  length: number;

  memberId: number;
  teamUserName: string;
  mealRecords: MealRecord[];
}

export interface ITeamData {
  startDate: string;
  endDate: string;
  totalEtcGoals: number;
  completedEtcGoals: number;
  completedExercises: number;
  memberDTOS: memberDTOS[];
}
export const teamData = atom<ITeamData>({
  key: "ITeamData",
  default: {
    startDate: "",
    endDate: "",
    totalEtcGoals: 0,
    completedEtcGoals: 0,
    completedExercises: 0,
    memberDTOS: [],
  },
});

export type RootStackParamList = {
  FindChallenge: undefined;
  ChallengeDetail: { currentTeam: ITeams };
  AddChallenge: undefined;
};
