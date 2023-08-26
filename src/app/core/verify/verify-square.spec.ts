import { VerifySquare } from '@app/core/verify/verify-square';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';

describe(VerifySquare.name, () => {
  it('should recognize a valid solution and return its size', () => {
    const valid = PuzzleSimple.PUZZLE_1.solution;
    expect(new VerifySquare(valid).verifyAndGetSize()).toEqual(valid.length);
  });

  it('should throw an error for empty input', () => {
    expect(() => new VerifySquare([]).verifyAndGetSize()).toThrowError(
      'VERIFY.ERROR.EMPTY'
    );
  });

  it('should throw an error for input which is not a square', () => {
    const notSquare = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(() => new VerifySquare(notSquare).verifyAndGetSize()).toThrowError(
      'VERIFY.ERROR.NOT_A_SQUARE'
    );
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
    it(`should ${params.error ? 'throw an error' : 'be valid'} for size ${
      params.size
    } because it ${params.error ? 'does not' : 'does'} consist of squares`, () => {
      const candidate: number[][] = [];
      for (let i = 0; i < params.size; i++) {
        const array: number[] = [];
        for (let j = 0; j < params.size; j++) {
          array[j] = j + 1;
        }
        candidate[i] = array;
      }

      if(params.error) {
        expect(() => new VerifySquare(candidate).verifyAndGetSize()).toThrowError(
          'VERIFY.UNSUPPORTED.NOT_QUADRATIC'
        );
      } else {
        expect(new VerifySquare(candidate).verifyAndGetSize()).toEqual(params.size);
      }
    });
  });
});
