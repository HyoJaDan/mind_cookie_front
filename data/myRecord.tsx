import { atom, selector } from "recoil";

export const userIdState = atom<number | undefined>({
  key: "userId",
  default: 1,
});

export interface IUser {
  calorie: number;
  intakedCalorie: number;
  weight: number[];
}
export const userSelector = selector<IUser>({
  key: "userInfo",
  get: async ({ get }) => {
    const idx = get(userIdState);
    const user = await fetch(`http://localhost:8080/api/member/${idx}`).then(
      (res) => res.json()
    );
    return user;
  },
});
