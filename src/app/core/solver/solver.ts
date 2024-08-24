import { Logger } from "@app/core/log/logger";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

export abstract class Solver {
  private logger: Logger = new Logger(Solver.name);

  abstract getExecutionOrder(): number;

  executeNextStep(lastResponse: SolverResponse): SolverResponse {
    if (this.isDone(this.getCurrentBranch(lastResponse)?.grid)) {
      return { ...lastResponse, stepId: "COMPLETE", status: "COMPLETE" };
    }
    const response: SolverStepResponse = StopWatch.monitor(
      () => this.executeSingleStep(lastResponse),
      this.logger,
      { message: "Executing single step" },
    );
    return {
      branches: response.branches,
      stepId: response.stepId,
      status: response.failed ? "FAILED" : "INCOMPLETE",
    };
  }

  protected abstract executeSingleStep(
    lastResponse: SolverResponse,
  ): SolverStepResponse;

  abstract reset(): void;

  protected getCurrentBranch(response: SolverResponse): Nullable<SolverBranch> {
    const currentBranch: SolverBranch[] = response.branches.filter(
      (branch: SolverBranch) => branch.isCurrentBranch(),
    );
    if (currentBranch.length === 1) {
      return currentBranch[0];
    }
    return null;
  }

  protected isDone(grid: Nullable<SudokuGrid>): boolean {
    return SudokuGridUtil.isDone(grid);
  }
}
