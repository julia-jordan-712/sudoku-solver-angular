import { Injectable } from "@angular/core";
import { VerifySquareService } from "@app/core/verification/services/verify-square.service";
import { VerifyUniquenessService } from "@app/core/verification/services/verify-uniqueness.service";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifySquareResult } from "@app/core/verification/types/verify-square-result";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class VerifySolutionService {
  constructor(
    private squareService: VerifySquareService,
    private uniquenessService: VerifyUniquenessService,
  ) {}

  verify(
    candidate: SudokuGrid,
    options: VerificationOptions = {},
  ): VerificationResult {
    if (options.size != undefined) {
      return this.uniquenessService.verify(candidate, options.size, options);
    } else {
      return this.verifyFull(candidate, options);
    }
  }

  private verifyFull(
    candidate: SudokuGrid,
    options: VerificationOptions = {},
  ): VerificationResult {
    const verifySquareResult: VerifySquareResult =
      this.squareService.verify(candidate);
    if (verifySquareResult.result.isValid()) {
      return this.uniquenessService.verify(
        candidate,
        verifySquareResult.size,
        options,
      );
    } else {
      return verifySquareResult.result;
    }
  }
}
