import { Injectable, Provider } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverStepResponse } from "@app/core/solver/solver-response";
import { SOLVER_TOKEN } from "@app/core/solver/sudoku-solver.provider";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable()
export class TestSolver1 extends Solver {
  override getExecutionOrder(): number {
    return 1;
  }
  override executeSingleStep(branches: SudokuGrid[]): SolverStepResponse {
    return { branches, failed: false };
  }
  override reset(): void {
    // nothing to do
  }
}
@Injectable()
export class TestSolver2 extends Solver {
  override getExecutionOrder(): number {
    return 2;
  }
  override executeSingleStep(branches: SudokuGrid[]): SolverStepResponse {
    return { branches, failed: false };
  }
  override reset(): void {
    // nothing to do
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override isDone(_: Nullable<SudokuGrid>): boolean {
    return true;
  }
}

export const SOLVER_TEST_PROVIDERS: Provider[] = [
  TestSolver1,
  TestSolver2,
  {
    provide: SOLVER_TOKEN,
    useClass: TestSolver1,
    multi: true,
  },
  {
    provide: SOLVER_TOKEN,
    useClass: TestSolver2,
    multi: true,
  },
];
