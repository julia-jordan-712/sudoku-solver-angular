import { Injectable, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Solver } from "@app/core/solver/solver";
import { SolverBruteForce } from "@app/core/solver/solver-brute-force/solver-brute-force";
import { SolverResponse } from "@app/core/solver/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverService {
  private verify: VerifySolutionService = inject(VerifySolutionService);

  private solver: Solver;

  constructor() {
    this.solver = new SolverBruteForce(this.verify);
  }

  reset(): void {
    this.solver.reset();
  }

  solveNextStep(
    branches: SudokuGrid[],
    solverState: SudokuSolverStateService,
  ): SudokuGrid[] {
    const response: SolverResponse = this.solver.executeNextStep(branches);
    if (response.status === "COMPLETE") {
      solverState.finishExecuting("DONE");
    } else if (response.status === "FAILED") {
      solverState.finishExecuting("FAILED");
    }
    return response.branches;
  }
}
