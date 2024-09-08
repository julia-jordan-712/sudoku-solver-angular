import { Injectable } from "@angular/core";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class VerifySolutionService {
  verify(
    candidate: SudokuGrid,
    options: VerificationOptions = {},
  ): VerificationResult {
    return new VerifySolution().verify(candidate, options);
  }
}
