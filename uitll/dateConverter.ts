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

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${month}/${day}`;
}

export function calculateDaysFromNow(dateString: string): number {
  const now = new Date(); // 현재 날짜 및 시간
  const targetDate = new Date(dateString); // 인자로 받은 특정 날짜

  // 두 날짜의 차이를 밀리초 단위로 계산
  const differenceInTime = now.getTime() - targetDate.getTime();

  // 밀리초를 일수로 변환
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  // 소수점 이하를 버리고 결과 반환
  return Math.floor(differenceInDays);
}
