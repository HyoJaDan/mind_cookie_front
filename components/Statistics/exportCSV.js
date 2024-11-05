import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

function convertToCSV(data) {
  if (!data || data.length === 0) {
    return "날짜,긍정감각,부정감각,삶의만족도,몸상태,집중시간,기록한사건수,총참가자수\n"; // 빈 CSV 헤더만 반환
  }

  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  return headers + rows;
}

async function exportToCSV(filename, data) {
  try {
    const csv = convertToCSV(data);
    const fileUri = `${FileSystem.documentDirectory}${filename}.csv`;

    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      alert("파일 공유가 지원되지 않는 기기입니다.");
    }
  } catch (error) {}
}

// 특정 날짜에서 하루를 더해주는 함수
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// 날짜 범위 생성 함수
function generateDateRange(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // YYYY-MM-DD 형식
    currentDate = addDays(currentDate, 1);
  }
  return dates;
}

// 날짜별 데이터 병합 함수
export function mergeDataByDate(stateList, stopwatchList, allEventsData) {
  const mergedData = [];
  const allDates = new Set();

  // 날짜별로 state 데이터를 분류하여 Set에 날짜 추가
  const stateByDate = {};
  stateList.forEach((state) => {
    allDates.add(state.date);
    stateByDate[state.date] = state;
  });

  // 각 날짜별로 모든 목표의 시간을 합산하여 stopwatchByDate에 저장
  const stopwatchByDate = {};
  stopwatchList.forEach((stopwatch) => {
    stopwatch.dateTimeList.forEach((dateTime) => {
      const { date, time } = dateTime;
      allDates.add(date);

      // 시간 문자열을 초 단위로 변환
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      if (stopwatchByDate[date]) {
        stopwatchByDate[date] += totalSeconds;
      } else {
        stopwatchByDate[date] = totalSeconds;
      }
    });
  });

  // 날짜별로 allEventsData 데이터를 분류하여 참가자 수와 이벤트 개수만 저장
  const eventByDate = {};
  Object.entries(allEventsData).forEach(([date, events]) => {
    allDates.add(date);
    let totalParticipants = 0;
    const eventCount = events.length;

    events.forEach((event) => {
      totalParticipants += event.participants.length;
    });

    eventByDate[date] = { eventCount, totalParticipants };
  });

  // 모든 날짜 범위를 생성
  const sortedDates = Array.from(allDates).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const dateRange = generateDateRange(
    new Date(sortedDates[0]),
    new Date(sortedDates[sortedDates.length - 1])
  );

  // 날짜별로 데이터를 병합
  dateRange.forEach((date) => {
    const state = stateByDate[date] || {};
    const totalSeconds = stopwatchByDate[date] || 0;
    const totalMinutes = Math.floor(totalSeconds / 60); // 초를 분으로 변환
    const eventData = eventByDate[date] || {
      eventCount: 0,
      totalParticipants: 0,
    };

    mergedData.push({
      날짜: date,
      긍정감각: state.positive || "",
      부정감각: state.negative || "",
      삶의만족도: state.lifeSatisfaction || "",
      몸상태: state.physicalConnection || "",
      집중시간: totalMinutes, // 분 단위로 저장
      기록한사건수: eventData.eventCount,
      총참가자수: eventData.totalParticipants,
    });
  });

  // 병합된 데이터를 CSV로 내보내기
  exportToCSV("mindcookie", mergedData);
}
