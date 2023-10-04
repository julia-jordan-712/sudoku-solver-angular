import { Injectable, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Solver } from "@app/core/solver/solver";
import { SolverBruteForce } from "@app/core/solver/solver-brute-force/solver-brute-force";
import { SolverResponse } from "@app/core/solver/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Index } from "@app/shared/types";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverService {
  private verify: VerifySolutionService = inject(VerifySolutionService);

  private solver: Index<Solver>;

  constructor() {
    this.solver = { BRUTE_FORCE: new SolverBruteForce(this.verify) };
  }

  solveNextStep(
    branches: SudokuGrid[],
    solverState: SudokuSolverStateService,
  ): SudokuGrid[] {
    const response: SolverResponse =
      this.solver["BRUTE_FORCE"].executeNextStep(branches);
    if (response.status === "COMPLETE") {
      solverState.finishExecuting("DONE");
    } else if (response.status === "FAILED") {
      solverState.finishExecuting("FAILED");
    }
    return response.branches;
  }
}
