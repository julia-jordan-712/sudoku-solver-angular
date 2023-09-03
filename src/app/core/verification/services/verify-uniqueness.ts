import { VerificationOptions } from '@app/core/verification/types/verification-options';
import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifyI18nKey } from '@app/core/verification/types/verify-i18n-keys';
import { Index } from '@app/shared/types';
import { CellPosition } from '@app/shared/types/cell-position';
import { Nullable } from '@app/shared/types/nullable';
import { isDefined } from '@app/shared/util/is-defined';
import { Objects } from '@app/shared/util/objects';

export class VerifyUniqueness {
  constructor(private candidate: Nullable<number>[][], private size: number) {}

  verify(
    options: VerificationOptions = { trackUniquenessViolations: false }
  ): VerificationResult {
    const result: VerificationResult = VerificationResult.createValid();
    this.verifyRowsAndColumnsAndSquares(
      options,
      this.candidate,
      this.size,
      result
    );
    return result;
  }

  private verifyRowsAndColumnsAndSquares(
    options: VerificationOptions,
    area: Nullable<number>[][],
    size: number,
    result: VerificationResult
  ): void {
    const sqrt: number = Math.sqrt(size);
    if (options.trackUniquenessViolations) {
      return this.verifyRowsAndColumnsAndSquaresTracked(
        area,
        size,
        sqrt,
        result
      );
    } else {
      return this.verifyRowsAndColumnsAndSquaresUntracked(
        area,
        size,
        sqrt,
        result
      );
    }
  }

  private verifyRowsAndColumnsAndSquaresTracked(
    area: Nullable<number>[][],
    size: number,
    sqrt: number,
    result: VerificationResult
  ): void {
    let squareBaseX = 0;

    for (let i = 0; i < size; i++) {
      const currentRow: CellValueWithPosition[] = [];
      const currentColumn: CellValueWithPosition[] = [];
      const currentSquare: CellValueWithPosition[] = [];

      squareBaseX = this.calculateNewSquareBase(i, sqrt, squareBaseX);

      for (let j = 0; j < size; j++) {
        currentRow.push({ x: i, y: j, value: area[i][j] });
        currentColumn.push({ x: j, y: i, value: area[j][i] });

        const squareA: number = this.calculateSquareA(squareBaseX, j, sqrt);
        const squareB: number = this.calculateSquareB(i, sqrt, j);
        currentSquare.push({
          x: squareA,
          y: squareB,
          value: area[squareA][squareB],
        });
      }

      this.verifyUniquenessTracked(currentRow, result);
      this.verifyUniquenessTracked(currentColumn, result);
      this.verifyUniquenessTracked(currentSquare, result);
    }
  }

  private verifyUniquenessTracked(
    elements: CellValueWithPosition[],
    result: VerificationResult
  ): void {
    const index: Index<CellPosition[]> = Objects.arrayToArrayIndex(
      elements,
      (e) => e.value?.toString(),
      (e) => {
        return new CellPosition(e.x, e.y);
      }
    );
    const duplicates: Index<CellPosition[]> = Objects.filterIndex(
      index,
      (_, v) => v.length > 1
    );

    if (Object.keys(duplicates).length > 0) {
      result.addError(VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS);
      result.addDuplicates(duplicates);
    }
  }

  private verifyRowsAndColumnsAndSquaresUntracked(
    area: Nullable<number>[][],
    size: number,
    sqrt: number,
    result: VerificationResult
  ): void {
    let squareBaseX = 0;

    for (let i = 0; i < size; i++) {
      const currentRow: Nullable<number>[] = [];
      const currentColumn: Nullable<number>[] = [];
      const currentSquare: Nullable<number>[] = [];

      squareBaseX = this.calculateNewSquareBase(i, sqrt, squareBaseX);

      for (let j = 0; j < size; j++) {
        currentRow.push(area[i][j]);
        currentColumn.push(area[j][i]);

        const squareA: number = this.calculateSquareA(squareBaseX, j, sqrt);
        const squareB: number = this.calculateSquareB(i, sqrt, j);
        currentSquare.push(area[squareA][squareB]);
      }

      this.verifyUniquenessUntracked(currentRow, result);
      this.verifyUniquenessUntracked(currentColumn, result);
      this.verifyUniquenessUntracked(currentSquare, result);
    }
  }

  private verifyUniquenessUntracked(
    elements: Nullable<number>[],
    result: VerificationResult
  ): void {
    const definedElements: number[] = elements.filter(isDefined);
    if (definedElements.length !== new Set(definedElements).size) {
      result.addError(VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS);
    }
  }

  private calculateNewSquareBase(i: number, sqrt: number, squareBaseX: number) {
    if (i > 0 && i % sqrt === 0) {
      squareBaseX += sqrt;
    }
    return squareBaseX;
  }

  private calculateSquareA(
    squareBaseX: number,
    j: number,
    sqrt: number
  ): number {
    return squareBaseX + Math.ceil((1 + j - sqrt) / sqrt);
  }

  private calculateSquareB(i: number, sqrt: number, j: number): number {
    return (i % sqrt) * sqrt + (j % sqrt);
  }
}

interface CellValueWithPosition {
  x: number;
  y: number;
  value: Nullable<number>;
}
