import { Injectable } from "@angular/core";
import { VerifyNothingEmpty } from "@app/core/verification/services/verify-nothing-empty";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { SudokuGrid } from "@app/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class VerifyNothingEmptyService {
  public verify(
    candidate: SudokuGrid,
    options: VerificationOptions,
  ): VerificationResult {
    return new VerifyNothingEmpty(candidate).verify(options);
  }
}
