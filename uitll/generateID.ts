/** 고유한 ID를 생성하기 위한 간단한 헬퍼 함수 */
export const generateID = () => Math.random().toString(36).substring(2, 9);
