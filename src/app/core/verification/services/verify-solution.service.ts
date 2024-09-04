import { Injectable, inject } from "@angular/core";
import { Logger } from "@app/core/log/logger";
import { VerifyNothingEmptyService } from "@app/core/verification/services/verify-nothing-empty.service";
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
  private squareService: VerifySquareService = inject(VerifySquareService);
  private uniquenessService: VerifyUniquenessService = inject(
    VerifyUniquenessService,
  );
  private nothingEmptyService: VerifyNothingEmptyService = inject(
    VerifyNothingEmptyService,
  );

  private logger: Logger = new Logger(VerifySolutionService.name);

  constructor() {}

  verify(
    candidate: SudokuGrid,
    options: VerificationOptions = {},
  ): VerificationResult {
    return StopWatch.monitor(
      () => this.verifySudoku(candidate, options),
      this.logger,
      { message: "verify" },
    );
  }

  private verifySudoku(
    candidate: SudokuGrid,
    options: VerificationOptions,
  ): VerificationResult {
    if (options.size != undefined) {
      return this.verifyGridWithSize(candidate, options.size, options);
    } else {
      const verifySquareResult: VerifySquareResult =
        this.squareService.verify(candidate);
      if (verifySquareResult.result.isValid()) {
        return this.verifyGridWithSize(
          candidate,
          verifySquareResult.size,
          options,
        );
      } else {
        return verifySquareResult.result;
      }
    }
  }

  private verifyGridWithSize(
    candidate: SudokuGrid,
    size: number,
    options: VerificationOptions,
  ): VerificationResult {
    const result = this.nothingEmptyService.verify(candidate, options);
    if (!result.isValid()) {
      return result;
    }
    return this.uniquenessService.verify(candidate, size, options);
  }
}
