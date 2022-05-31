import { revolutionsPerMinuteToRadiansPerSecond } from "../index";

describe("Helper Functions", () => {
  describe("revolutionsPerMinuteToRadiansPerSecond", () => {
    describe("normal use", () => {
      it("should convert rpm to radians per second", () => {
        expect(revolutionsPerMinuteToRadiansPerSecond(60)).toBeCloseTo(6.28, 2);
      });
    });
  });
});
