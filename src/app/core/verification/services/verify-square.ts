import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';
import { VerifySquareResult } from '@app/core/verification/types/verify-square-result';

export class VerifySquare {
  constructor(private candidate: number[][]) {}

  verifyAndGetSize(): VerifySquareResult {
    const result: VerificationResult = VerificationResult.createValid();
    const size: number = this.verifyIsSquare(this.candidate, result);
    if (result.isValid()) {
      this.verifyConsistsOfSquares(size, result);
    }
    return { result, size };
  }

  private verifyIsSquare(area: number[][], result: VerificationResult): number {
    const length: number = area.length;
    if (length <= 0) {
      result.addError(VerifyI18nKey.ERROR_EMPTY);
    }
    area.forEach((array: number[]) => {
      if (array.length !== length) {
        result.addError(VerifyI18nKey.ERROR_NOT_A_SQUARE);
      }
    });
    return length;
  }

  private verifyConsistsOfSquares(
    size: number,
    result: VerificationResult
  ): void {
    if (size === 1 || !Number.isInteger(Math.sqrt(size))) {
      result.addError(VerifyI18nKey.UNSUPPORTED_NOT_QUADRATIC);
    }
  }
}
