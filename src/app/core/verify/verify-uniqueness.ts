import { VerifyI18nKey } from '@app/core/verify/types/verify-i18n-keys';

export class VerifyUniqueness {
  constructor(private candidate: number[][], private size: number) {}

  verify(): boolean {
    this.verifyRowsAndColumnsAndSquares(this.candidate, this.size);
    return true;
  }

  private verifyRowsAndColumnsAndSquares(area: number[][], size: number): void {
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

      this.verifyUniqueness(currentRow, size);
      this.verifyUniqueness(currentColumn, size);
      this.verifyUniqueness(currentSquare, size);
    }
  }

  private verifyUniqueness(
    elements: Set<number>,
    numberOfElements: number
  ): void {
    if (elements.size !== numberOfElements) {
      throw new Error(`${VerifyI18nKey.VERIFY_ERROR}.DUPLICATE_ELEMENTS`);
    }
  }
}
