import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";

export class VerifyNothingEmpty {
  constructor(private candidate: SudokuGrid) {}

  verify(options?: VerificationOptions): VerificationResult {
    if (options?.allowEmptyCells) {
      return VerificationResult.createValid();
    } else {
      for (let row = 0; row < this.candidate.length; row++) {
        for (let column = 0; column < this.candidate[row].length; column++) {
          const cell: SudokuGridCell = this.candidate[row][column];
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
