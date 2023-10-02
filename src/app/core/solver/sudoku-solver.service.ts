import { Injectable, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { SolverBruteForce } from "@app/core/solver/solver-brute-force";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverService {
  private verify: VerifySolutionService = inject(VerifySolutionService);

  solveNextStep(
    branches: SudokuGrid[],
    solverState: SudokuSolverStateService,
  ): SudokuGrid[] {
    const grid: Nullable<SudokuGrid> = this.getCurrentBranch(branches);
    new SolverBruteForce(this.verify, solverState).execute(grid);
    return branches;
  }

  private getCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    return branches?.slice(-1)?.[0];
  }
}
