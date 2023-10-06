import { Inject, Injectable } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Solver } from "@app/core/solver/solver";
import { SolverResponse } from "@app/core/solver/solver-response";
import { SOLVER_TOKEN } from "@app/core/solver/sudoku-solver.provider";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverService {
  private solvers: Solver[];

  constructor(@Inject(SOLVER_TOKEN) solvers: Solver[]) {
    this.solvers = solvers.sort(
      (a, b) => a.getExecutionOrder() - b.getExecutionOrder(),
    );
  }

  reset(): void {
    this.solvers.forEach((solver) => solver.reset());
  }

  solveNextStep(
    branches: SudokuGrid[],
    solverState: SudokuSolverStateService,
  ): SudokuGrid[] {
    const response: SolverResponse = this.executeSolvers(branches);
    if (response.status === "COMPLETE") {
      solverState.finishExecuting("DONE");
    } else if (response.status === "FAILED") {
      solverState.finishExecuting("FAILED");
    }
    return response.branches;
  }

  private executeSolvers(branches: SudokuGrid[]): SolverResponse {
    let response: SolverResponse = { branches, status: "FAILED" };
    for (const solver of this.solvers) {
      response = solver.executeNextStep(branches);
      if (response.status !== "FAILED") {
        break;
      }
    }
    return response;
  }
}
