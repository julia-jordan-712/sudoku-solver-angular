import { Logger } from "@app/core/log/logger";
import { VerificationDuplicates } from "@app/core/verification/types/verification-duplicates";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { Index } from "@app/types";
import { CellPosition } from "@app/types/cell-position";
import { CellPositionMap } from "@app/types/cell-position-map";
import { StopWatch } from "@app/types/stopwatch";
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/types/sudoku-grid";
import { isArray, isNotArray } from "@app/util/is-array";
import { isDefined } from "@app/util/is-defined";
import { Objects } from "@app/util/objects";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";

export class VerifyUniqueness {
  verify(
    candidate: SudokuGrid,
    size: number,
    options: VerificationOptions = { trackUniquenessViolations: false },
  ): VerificationResult {
    return StopWatch.monitor(
      () => {
        const result: VerificationResult = VerificationResult.createValid();
        this.verifyRowsAndColumnsAndSquares(options, candidate, size, result);
        return result;
      },
      new Logger(VerifyUniqueness.name),
      { message: VerifyUniqueness.name },
    );
  }

  private verifyRowsAndColumnsAndSquares(
    options: VerificationOptions,
    area: SudokuGrid,
    size: number,
    result: VerificationResult,
  ): void {
    const cellPositionsOfSquares: CellPositionMap =
      SudokuGridUtil.getCellPositionsOfSquares(size);
    if (options.trackUniquenessViolations) {
      return this.verifyRowsAndColumnsAndSquaresTracked(
        area,
        size,
        cellPositionsOfSquares,
        result,
      );
    } else {
      return this.verifyRowsAndColumnsAndSquaresUntracked(
        area,
        size,
        cellPositionsOfSquares,
        result,
      );
    }
  }

  private verifyRowsAndColumnsAndSquaresTracked(
    area: SudokuGrid,
    size: number,
    cellPositionsOfSquares: CellPositionMap,
    result: VerificationResult,
  ): void {
    for (let i = 0; i < size; i++) {
      const currentRow: CellValueWithPosition[] = [];
      const currentColumn: CellValueWithPosition[] = [];

      for (let j = 0; j < size; j++) {
        this.verifyValidNumber(area[i][j], size, result);
        currentRow.push({ x: i, y: j, value: area[i][j] });
        currentColumn.push({ x: j, y: i, value: area[j][i] });
      }

      const currentSquare: CellValueWithPosition[] = cellPositionsOfSquares
        .getForSquareIndex(i)
        .map((position) => {
          return {
            x: position.x,
            y: position.y,
            value: area[position.x][position.y],
          };
        });

      this.verifyUniquenessTracked(currentRow, result);
      this.verifyUniquenessTracked(currentColumn, result);
      this.verifyUniquenessTracked(currentSquare, result);
    }
  }

  private verifyUniquenessTracked(
    elements: CellValueWithPosition[],
    result: VerificationResult,
  ): void {
    const index: Index<CellPosition[]> = Objects.arrayToArrayIndex(
      elements,
      (e) => (isNotArray(e.value) ? e.value?.toString() : undefined),
      (e) => {
        return new CellPosition(e.x, e.y);
      },
    );
    const duplicates: VerificationDuplicates = Objects.filterIndex(
      index,
      (_, v) => v.length > 1,
    );

    if (Object.keys(duplicates).length > 0) {
      result.addError(VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS);
      result.addDuplicates(duplicates);
    }
  }

  private verifyRowsAndColumnsAndSquaresUntracked(
    area: SudokuGrid,
    size: number,
    cellPositionsOfSquares: CellPositionMap,
    result: VerificationResult,
  ): void {
    for (let i = 0; i < size; i++) {
      const currentRow: SudokuGridRow = [];
      const currentColumn: SudokuGridRow = [];

      for (let j = 0; j < size; j++) {
        this.verifyValidNumber(area[i][j], size, result);
        currentRow.push(area[i][j]);
        currentColumn.push(area[j][i]);
      }

      const currentSquare: SudokuGridRow = cellPositionsOfSquares
        .getForSquareIndex(i)
        .map((position) => area[position.x][position.y]);

      this.verifyUniquenessUntracked(currentRow, result);
      this.verifyUniquenessUntracked(currentColumn, result);
      this.verifyUniquenessUntracked(currentSquare, result);
    }
  }

  private verifyValidNumber(
    cell: SudokuGridCell,
    size: number,
    result: VerificationResult,
  ): void {
    const valueValid: (v: number) => boolean = (v: number) =>
      v <= 0 || v > size;
    if (isNotArray(cell) && isDefined(cell)) {
      if (valueValid(cell)) {
        result.addError(VerifyI18nKey.ERROR_INVALID_NUMBERS(size));
      }
    } else if (isArray(cell)) {
      cell.forEach((value) => {
        if (valueValid(value)) {
          result.addError(VerifyI18nKey.ERROR_INVALID_NUMBERS(size));
        }
      });
    }
  }

  private verifyUniquenessUntracked(
    elements: SudokuGridRow,
    result: VerificationResult,
  ): void {
    const definedElements: number[] = elements
      .filter(isNotArray)
      .filter(isDefined);
    if (definedElements.length !== new Set(definedElements).size) {
      result.addError(VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS);
    }
  }
}

interface CellValueWithPosition {
  x: number;
  y: number;
  value: SudokuGridCell;
}
