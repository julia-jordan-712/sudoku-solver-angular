import { VerifySquare } from '@app/core/verification/services/verify-square';
import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';

describe(VerifySquare.name, () => {
  it('should recognize a valid solution and return its size', () => {
    const valid = PuzzleSimple.PUZZLE_1.puzzle;
    expect(new VerifySquare(valid).verifyAndGetSize()).toEqual({
      result: VerificationResult.createValid(),
      size: valid.length,
    });
  });

  it('should find error for empty input', () => {
    expect(new VerifySquare([]).verifyAndGetSize()).toEqual({
      result: VerificationResult.createFromErrors([VerifyI18nKey.ERROR_EMPTY]),
      size: 0,
    });
  });

  it('should find error for input which is not a square', () => {
    const notSquare = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(new VerifySquare(notSquare).verifyAndGetSize()).toEqual({
      result: VerificationResult.createFromErrors([VerifyI18nKey.ERROR_NOT_A_SQUARE]),
      size: 2,
    });
  });

  [
    { size: 1, error: true },
    { size: 2, error: true },
    { size: 3, error: true },
    { size: 4, error: false },
    { size: 5, error: true },
    { size: 6, error: true },
    { size: 7, error: true },
    { size: 8, error: true },
    { size: 9, error: false },
    { size: 10, error: true },
    { size: 11, error: true },
    { size: 12, error: true },
    { size: 13, error: true },
    { size: 14, error: true },
    { size: 15, error: true },
    { size: 16, error: false },
  ].forEach((params: { size: number; error: boolean }) => {
    it(`should ${params.error ? 'find error' : 'be valid'} for size ${
      params.size
    } because it ${
      params.error ? 'does not' : 'does'
    } consist of squares`, () => {
      const candidate: number[][] = [];
      for (let i = 0; i < params.size; i++) {
        const array: number[] = [];
        for (let j = 0; j < params.size; j++) {
          array[j] = j + 1;
        }
        candidate[i] = array;
      }

      if (params.error) {
        expect(new VerifySquare(candidate).verifyAndGetSize()).toEqual({
          result: VerificationResult.createFromErrors([
            VerifyI18nKey.UNSUPPORTED_NOT_QUADRATIC,
          ]),
          size: params.size,
        });
      } else {
        expect(new VerifySquare(candidate).verifyAndGetSize()).toEqual({
          result: VerificationResult.createValid(),
          size: params.size,
        });
      }
    });
  });
});
