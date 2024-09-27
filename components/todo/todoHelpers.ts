import { PrimaryHobbit } from "../../data/todo";

// 세부 목표 중복 확인
export const isHobbitDuplicate = (
  todos: PrimaryHobbit[],
  newPrimaryHobbit: string,
  selectedPrimaryHobbit: string,
  newHobbit: string
): boolean => {
  return todos.some(
    (primaryHobbit) =>
      (primaryHobbit.primaryHobbit === newPrimaryHobbit ||
        primaryHobbit.primaryHobbit === selectedPrimaryHobbit) &&
      primaryHobbit.hobbitStatuses.some((hobbit) => hobbit.hobbit === newHobbit)
  );
};

// 상위 목표 중복 확인
export const isPrimaryHobbitDuplicate = (
  todos: PrimaryHobbit[],
  newPrimaryHobbit: string
): boolean => {
  return todos.some(
    (primaryHobbit) => primaryHobbit.primaryHobbit === newPrimaryHobbit
  );
};

// 색상 중복 확인
export const isColorDuplicate = (
  todos: PrimaryHobbit[],
  selectedColor: string
): boolean => {
  return todos.some((primaryHobbit) => primaryHobbit.color === selectedColor);
};

// 새로 추가된 상위 목표를 todos에 추가하는 함수
export const addNewPrimaryHobbit = (
  todos: PrimaryHobbit[],
  addedHobbit: any,
  newPrimaryHobbit: string,
  selectedColor: string,
  newHobbit: string
): PrimaryHobbit[] => {
  const newPrimaryHobbitData = {
    primaryHobbitId: addedHobbit.primaryHobbitId,
    primaryHobbit: newPrimaryHobbit,
    color: selectedColor,
    hobbitStatuses: [
      {
        hobbitId: addedHobbit.hobbitStatuses[0].hobbitId,
        hobbit: newHobbit,
        done: false,
      },
    ],
  };

  return [...todos, newPrimaryHobbitData];
};

// 기존 상위 목표에 세부 목표를 추가하는 함수
export const addHobbitToExistingPrimary = (
  todos: PrimaryHobbit[],
  addedHobbit: any,
  selectedPrimaryHobbit: string,
  newHobbit: string
): PrimaryHobbit[] => {
  return todos.map((primaryHobbit) =>
    primaryHobbit.primaryHobbit === selectedPrimaryHobbit
      ? {
          ...primaryHobbit,
          hobbitStatuses: [
            ...primaryHobbit.hobbitStatuses,
            {
              hobbitId: addedHobbit.hobbitId,
              hobbit: newHobbit,
              done: false,
            },
          ],
        }
      : primaryHobbit
  );
};

// 해당 목표의 상태를 토글하는 함수
export const toggleHobbitStatus = (
  todos: PrimaryHobbit[],
  primaryHobbitId: number,
  hobbitId: number
): PrimaryHobbit[] => {
  return todos.map((primaryHobbit) =>
    primaryHobbit.primaryHobbitId === primaryHobbitId
      ? {
          ...primaryHobbit,
          hobbitStatuses: primaryHobbit.hobbitStatuses.map((hobbit) =>
            hobbit.hobbitId === hobbitId
              ? { ...hobbit, done: !hobbit.done }
              : hobbit
          ),
        }
      : primaryHobbit
  );
};

// statusByDate를 업데이트하는 함수
export const updateStatusByDate = (
  statusByDate: any[],
  selectedDate: string,
  hobbitId: number,
  todos: PrimaryHobbit[]
) => {
  return statusByDate.map((status) => {
    if (status.date === selectedDate) {
      const updatedHobbitStatus = [...status.hobbitStatus];
      const hobbitIndex = todos
        .flatMap((primaryHobbit) => primaryHobbit.hobbitStatuses)
        .findIndex((hobbit) => hobbit.hobbitId === hobbitId);

      if (hobbitIndex !== -1) {
        updatedHobbitStatus[hobbitIndex] = !updatedHobbitStatus[hobbitIndex];
      }

      return {
        ...status,
        hobbitStatus: updatedHobbitStatus,
      };
    }
    return status;
  });
};
