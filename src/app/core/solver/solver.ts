import { Logger } from "@app/core/log/logger";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

export abstract class Solver {
  private logger: Logger = new Logger(Solver.name);

  abstract getExecutionOrder(): number;

  executeNextStep(branches: SudokuGrid[]): SolverResponse {
    if (this.isDone(this.getCurrentBranch(branches))) {
      return { branches, stepId: "COMPLETE", status: "COMPLETE" };
    }
    const response: SolverStepResponse = StopWatch.monitor(
      () => this.executeSingleStep(branches),
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
    branches: SudokuGrid[],
  ): SolverStepResponse;

  abstract reset(): void;

  protected getCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    return branches?.slice(-1)?.[0];
  }

  protected isDone(grid: Nullable<SudokuGrid>): boolean {
    return SudokuGridUtil.isDone(grid);
  }
}
