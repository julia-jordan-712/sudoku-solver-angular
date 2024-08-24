import { Logger } from "@app/core/log/logger";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

export abstract class Solver {
  private logger: Logger = new Logger(Solver.name);

  abstract getExecutionOrder(): number;

  executeNextStep(lastResponse: SolverResponse): SolverResponse {
    if (this.isDone(this.getCurrentBranch(lastResponse.branches))) {
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

  protected cloneCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    const branch: Nullable<SudokuGrid> = this.getCurrentBranch(branches);
    return branch ? SudokuGridUtil.clone(branch) : undefined;
  }

  protected getCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    return branches?.slice(-1)?.[0];
  }

  protected replaceCurrentBranch(
    branches: SudokuGrid[],
    currentBranch: Nullable<SudokuGrid>,
  ): SudokuGrid[] {
    const newBranches: SudokuGrid[] = [...branches];
    if (isDefined(currentBranch)) {
      if (newBranches.length > 0) {
        newBranches.splice(newBranches.length - 1, 1);
      }
      newBranches.push(currentBranch);
    }
    return newBranches;
  }

  protected isDone(grid: Nullable<SudokuGrid>): boolean {
    return SudokuGridUtil.isDone(grid);
  }
}
