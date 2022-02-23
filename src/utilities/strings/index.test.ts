import { escapeRegExp } from ".";

describe("escapeRegExp", () => {
  describe("escapeRegExp를 통과한 문자열로 RegExp를 만들면, 원본 문자열을 정확하게 인식해야함", () => {
    test("3.141592", () => {
      const s = "3.141592";
      const regexp = new RegExp(escapeRegExp(s));
      expect(regexp.test(s)).toBeTruthy();
    });

    test('"안녕"', () => {
      const s = '"안녕"';
      const regexp = new RegExp(escapeRegExp(s));
      expect(regexp.test(s)).toBeTruthy();
    });

    test("1.3 * (2 - 5) ^ 4", () => {
      const s = "1.3 * (2 - 5) ^ 4";
      const regexp = new RegExp(escapeRegExp(s));
      expect(regexp.test(s)).toBeTruthy();
    });

    test("100.4$", () => {
      const s = "100.4$";
      const regexp = new RegExp(escapeRegExp(s));
      expect(regexp.test(s)).toBeTruthy();
    });

    test("\\o^o/\n", () => {
      const s = "\\o^o/\n";
      const regexp = new RegExp(escapeRegExp(s));
      expect(regexp.test(s)).toBeTruthy();
    });
  });
});
