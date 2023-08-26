import { VerifyUniqueness } from '@app/core/verification/services/verify-uniqueness';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';
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
          new VerifyUniqueness(params.input, params.input.length)
            .verify()
            .isValid()
        ).toBeTrue();
      });
    });

    it('should recognize duplicate elements', () => {
      const result = new VerifyUniqueness(
        [
          [1, 2, 3, 4],
          [3, 4, 1, 2],
          [2, 3, 4, 1],
          [4, 1, 2, 4],
        ],
        4
      ).verify();
      expect(result.isValid()).toBeFalse();
      expect(result.getErrors().length).toEqual(1);
      expect(result.getErrors()[0]).toEqual(
        VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS
      );
    });
  });
});
