import { VerifyUniqueness } from "@app/core/verify/verify-uniqueness";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

describe(VerifyUniqueness.name, () => {
  it('should recognize a valid solution and return its size', () => {
    const valid = PuzzleSimple.PUZZLE_1.solution;
    expect(new VerifyUniqueness(valid, valid.length).verify()).toBeTrue();
  });
});
