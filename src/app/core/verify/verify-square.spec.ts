import { VerifySquare } from "@app/core/verify/verify-square";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

describe(VerifySquare.name, () => {
  it('should recognize a valid solution and return its size', () => {
    const valid = PuzzleSimple.PUZZLE_1.solution;
    expect(new VerifySquare(valid).verifyAndGetSize()).toEqual(valid.length);
  });
});
