import { VerifyUniqueness } from '@app/core/verification/services/verify-uniqueness';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';
import { Puzzle4x4 } from '@app/test/puzzles/puzzle-4x4';
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

  describe('incomplete solution', () => {
    [
      {
        input: [
          [1, 2, 3, 4],
          [3, , 1, 2],
          [2, 3, , 1],
          [4, 1, 2, 3],
        ],
      },
      {
        input: Puzzle4x4.EMPTY,
        desc: 'empty solution',
      },
      {
        input: Puzzle4x4.EMPTY_ROW,
        desc: 'empty row',
      },
      {
        input: Puzzle4x4.EMPTY_COLUMN,
        desc: 'empty column',
      },
      {
        input: Puzzle4x4.EMPTY_SQUARE,
        desc: 'empty square',
      },
      {
        input: PuzzleSimple.PUZZLE_1.puzzle,
        desc: 'PuzzleSimple.PUZZLE_1.puzzle',
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

    [
      {
        input: Puzzle4x4.INCOMPLETE_INVALID_ROW,
        title: 'should recognize duplicate elements in rows',
      },
      {
        input: Puzzle4x4.INCOMPLETE_INVALID_COLUMN,
        title: 'should recognize duplicate elements in columns',
      },
      {
        input: Puzzle4x4.INCOMPLETE_INVALID_SQUARE,
        title: 'should recognize duplicate elements in squares',
      },
    ].forEach((params) => {
      it(params.title, () => {
        const result = new VerifyUniqueness(
          params.input,
          params.input.length
        ).verify();
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors().length).toEqual(1);
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS
        );
      });
    });
  });
});
