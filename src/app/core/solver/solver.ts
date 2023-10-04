import { SolverResponse } from "@app/core/solver/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export abstract class Solver {
  constructor(protected verify: VerifySolutionService) {}

  protected getCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    return branches?.slice(-1)?.[0];
  }

  abstract executeNextStep(branches: SudokuGrid[]): SolverResponse;
}
