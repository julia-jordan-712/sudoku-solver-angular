import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { isArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";

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
