import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";
import { isArray } from "@app/util/is-array";
import { isDefined } from "@app/util/is-defined";

export class VerifyNothingEmpty {
  verify(
    candidate: SudokuGrid,
    options?: VerificationOptions,
  ): VerificationResult {
    if (options?.allowEmptyCells) {
      return VerificationResult.createValid();
    } else {
      for (let rowIndex = 0; rowIndex < candidate.length; rowIndex++) {
        const row = candidate[rowIndex]!;
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const cell: SudokuGridCell = row[columnIndex];
          if (!isDefined(cell)) {
            return VerificationResult.createFromErrors([
              VerifyI18nKey.ERROR_EMPTY_CELL,
            ]);
          } else if (isArray(cell) && cell.length === 0) {
            return VerificationResult.createFromErrors([
              VerifyI18nKey.ERROR_EMPTY_CELL,
            ]);
          }
        }
      }
      return VerificationResult.createValid();
    }
  }
}
