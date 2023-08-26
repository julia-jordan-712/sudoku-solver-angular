import { VerifyUniqueness } from '@app/core/verify/verify-uniqueness';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';

describe(VerifyUniqueness.name, () => {
  describe('complete solution', () => {
    [
      {
        input: [
          [1, 2, 3, 4],
          [3, 4, 1, 2],
          [2, 3, 4, 1],
          [4, 1, 2, 3],
        ],
      },
      {
        input: PuzzleSimple.PUZZLE_1.solution,
        desc: 'PuzzleSimple.PUZZLE_1.solution',
      },
    ].forEach((params) => {
      it(`should recognize a valid solution: ${
        params.desc ? params.desc : JSON.stringify(params.input)
      }`, () => {
        expect(
          new VerifyUniqueness(params.input, params.input.length).verify()
        ).toBeTrue();
      });
    });

    it('should recognize duplicate elements', () => {
      expect(() =>
        new VerifyUniqueness(
          [
            [1, 2, 3, 4],
            [3, 4, 1, 2],
            [2, 3, 4, 1],
            [4, 1, 2, 4],
          ],
          4
        ).verify()
      ).toThrowError('VERIFY.ERROR.DUPLICATE_ELEMENTS');
    });
  });
});
