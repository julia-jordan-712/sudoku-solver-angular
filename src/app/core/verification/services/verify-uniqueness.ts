import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';
import { Nullable } from '@app/shared/types/nullable';
import { isDefined } from '@app/shared/util/is-defined';

export class VerifyUniqueness {
  constructor(private candidate: Nullable<number>[][], private size: number) {}

  verify(): VerificationResult {
    const result: VerificationResult = VerificationResult.createValid();
    this.verifyRowsAndColumnsAndSquares(this.candidate, this.size, result);
    return result;
  }

  private verifyRowsAndColumnsAndSquares(
    area: Nullable<number>[][],
    size: number,
    result: VerificationResult
  ): void {
    const sqrt: number = Math.sqrt(size);
    let k: number = 0;

    for (let i: number = 0; i < size; i++) {
      const currentRow: Nullable<number>[] = [];
      const currentColumn: Nullable<number>[] = [];
      const currentSquare: Nullable<number>[] = [];

      if (i > 0 && i % sqrt === 0) {
        k += sqrt;
      }

      for (let j: number = 0; j < size; j++) {
        currentRow.push(area[i][j]);
        currentColumn.push(area[j][i]);

        const squareA: number = k + Math.ceil((1 + j - sqrt) / sqrt);
        const squareB: number = (i % sqrt) * sqrt + (j % sqrt);
        currentSquare.push(area[squareA][squareB]);
      }

      this.verifyUniqueness(currentRow, result);
      this.verifyUniqueness(currentColumn, result);
      this.verifyUniqueness(currentSquare, result);
    }
  }

  private verifyUniqueness(
    elements: Nullable<number>[],
    result: VerificationResult
  ): void {
    const definedElements: number[] = elements.filter(isDefined);
    if (definedElements.length !== new Set(definedElements).size) {
      result.addError(VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS);
    }
  }
}
