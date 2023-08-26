import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';

export class VerifyUniqueness {
  constructor(private candidate: number[][], private size: number) {}

  verify(): VerificationResult {
    const result: VerificationResult = VerificationResult.createValid();
    this.verifyRowsAndColumnsAndSquares(this.candidate, this.size, result);
    return result;
  }

  private verifyRowsAndColumnsAndSquares(
    area: number[][],
    size: number,
    result: VerificationResult
  ): void {
    let currentRow: Set<number> = new Set();
    let currentColumn: Set<number> = new Set();
    let currentSquare: Set<number> = new Set();
    const sqrt: number = Math.sqrt(size);
    let k: number = 0;

    for (let i: number = 0; i < size; i++) {
      currentRow.clear();
      currentColumn.clear();
      currentSquare.clear();

      if (i > 0 && i % sqrt === 0) {
        k += sqrt;
      }

      for (let j: number = 0; j < size; j++) {
        currentRow.add(area[i][j]);
        currentColumn.add(area[j][i]);

        const squareA: number = k + Math.ceil((1 + j - sqrt) / sqrt);
        const squareB: number = (i % sqrt) * sqrt + (j % sqrt);
        currentSquare.add(area[squareA][squareB]);
      }

      this.verifyUniqueness(currentRow, size, result);
      this.verifyUniqueness(currentColumn, size, result);
      this.verifyUniqueness(currentSquare, size, result);
    }
  }

  private verifyUniqueness(
    elements: Set<number>,
    numberOfElements: number,
    result: VerificationResult
  ): void {
    if (elements.size !== numberOfElements) {
      result.addError(VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS);
    }
  }
}
