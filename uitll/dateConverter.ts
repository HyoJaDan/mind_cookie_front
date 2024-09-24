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
