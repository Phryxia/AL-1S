// 일반 문자열을 정규표현식 내부 조건문으로 삽입하기 위해
// 정규표현식 전용 특수문자를 이스케이프합니다.
export function escapeRegExp(s: string): string {
  return s.replace(/(\.|\+|\$|\^|\(|\)|\{|\}|\\)/, "\\$1");
}
