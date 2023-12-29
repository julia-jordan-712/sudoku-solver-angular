import { Injectable } from "@angular/core";
import { Logger } from "@app/core/log/logger";
import { VerifySquareService } from "@app/core/verification/services/verify-square.service";
import { VerifyUniquenessService } from "@app/core/verification/services/verify-uniqueness.service";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifySquareResult } from "@app/core/verification/types/verify-square-result";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class VerifySolutionService {
  private logger: Logger = new Logger(VerifySolutionService.name);

  constructor(
    private squareService: VerifySquareService,
    private uniquenessService: VerifyUniquenessService,
  ) {}

  verify(
    candidate: SudokuGrid,
    options: VerificationOptions = {},
  ): VerificationResult {
    return StopWatch.monitor(
      () => {
        if (options.size != undefined) {
          return this.uniquenessService.verify(
            candidate,
            options.size,
            options,
          );
        } else {
          return this.verifyFull(candidate, options);
        }
      },
      this.logger,
      { message: "verify" },
    );
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
