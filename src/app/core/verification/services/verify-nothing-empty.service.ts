import { Injectable } from "@angular/core";
import { VerifyNothingEmpty } from "@app/core/verification/services/verify-nothing-empty";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class VerifyNothingEmptyService {
  public verify(candidate: SudokuGrid): VerificationResult {
    return new VerifyNothingEmpty(candidate).verify({
      disallowEmptyCells: true,
    });
  }
}
