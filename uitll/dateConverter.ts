// 날짜를 "YY.MM.DD" 형식으로 변환하는 함수
export function formatDateUntilMinute(isoDateString: string, weight: number) {
  const date = new Date(isoDateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}`;
  const lastWeight = weight;

  return { formattedDateTime, lastWeight };
}

/** 02/30 */
export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${month}/${day}`;
}

// "9.16 (월)" 형식으로 출력
export function formatDate3() {
  const date = new Date();

  // 월, 일 추출
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const day = date.getDate();

  // 요일 추출 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekDays[date.getDay()];

  // 결과 포맷
  return `${month}.${day} (${dayOfWeek})`;
}

export function calculateDateDifferenceAndIsPast(dateString: string): {
  startDayFromNow: number;
  isPast: boolean;
} {
  const now = new Date();
  const targetDate = new Date(dateString);

  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const targetMidnight = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const differenceInTime = targetMidnight.getTime() - nowMidnight.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return {
    startDayFromNow: Math.round(differenceInDays) * -1,
    isPast: differenceInTime < 0,
  };
}

/** 24.03.21(목) */
export function formatDate2(date: Date): string {
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dayOfWeek = new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
  }).format(date);

  return `${year}.${month}.${day}(${dayOfWeek})`;
}

export const addDays = (date: Date, days: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function isWithinThreeDaysFromNow(dateString: Date): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // 현재 날짜의 시간을 00:00:00.000으로 설정

  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0); // 대상 날짜의 시간을 00:00:00.000으로 설정

  const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000; // 3일을 밀리초로 환산
  const differenceInTime = targetDate.getTime() - now.getTime(); // 두 날짜의 차이를 밀리초로 계산

  return differenceInTime >= 0 && differenceInTime <= threeDaysInMilliseconds;
}
