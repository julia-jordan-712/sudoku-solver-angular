import { Injectable } from "@angular/core";
import { VerifyUniqueness } from "@app/core/verification/services/verify-uniqueness";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class VerifyUniquenessService {
  verify(
    candidate: SudokuGrid,
    size: number,
    options: VerificationOptions = {},
  ): VerificationResult {
    return new VerifyUniqueness(candidate, size).verify(options);
  }
}
