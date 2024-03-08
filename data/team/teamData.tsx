import { atom } from "recoil";

export interface ITeams {
  teamName: string;
  maxTeamMemberNumber: number;
  startDate: string;
  endDate: string;
  challngeType: string;
  numOfMember: number;
}

export const teamData = atom<ITeams>({
  key: "teamData",
  default: {
    teamName: "teamName",
    maxTeamMemberNumber: 0,
    startDate: "2021-10-01T00:00:00.000Z",
    endDate: "2021-10-01T00:00:00.000Z",
    challngeType: "challngeType",
    numOfMember: 0,
  },
});
