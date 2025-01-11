import { Injectable } from "@angular/core";
import { Logger } from "@app/core/log/logger";
import { VerifyNothingEmpty } from "@app/core/verification/services/verify-nothing-empty";
import { VerifySquare } from "@app/core/verification/services/verify-square";
import { VerifyUniqueness } from "@app/core/verification/services/verify-uniqueness";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifySquareResult } from "@app/core/verification/types/verify-square-result";
import { StopWatch } from "@app/types/stopwatch";
import { SudokuGrid } from "@app/types/sudoku-grid";

@Injectable()
export class VerifySolution {
  private verifySquare: VerifySquare = new VerifySquare();
  private verifyUniqueness: VerifyUniqueness = new VerifyUniqueness();
  private verifyNothingEmpty: VerifyNothingEmpty = new VerifyNothingEmpty();

  private logger: Logger = new Logger(VerifySolution.name);

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
        this.verifySquare.verifyAndGetSize(candidate);
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
    const result = this.verifyNothingEmpty.verify(candidate, options);
    if (!result.isValid()) {
      return result;
    }
    return this.verifyUniqueness.verify(candidate, size, options);
  }
}
