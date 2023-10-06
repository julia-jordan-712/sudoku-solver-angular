import { Injectable, Provider } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverResponse } from "@app/core/solver/solver-response";
import { SOLVER_TOKEN } from "@app/core/solver/sudoku-solver.provider";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable()
export class TestSolver1 extends Solver {
  override getExecutionOrder(): number {
    return 1;
  }
  override executeNextStep(branches: SudokuGrid[]): SolverResponse {
    return { branches, status: "INCOMPLETE" };
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
  override executeNextStep(branches: SudokuGrid[]): SolverResponse {
    return { branches, status: "COMPLETE" };
  }
  override reset(): void {
    // nothing to do
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
