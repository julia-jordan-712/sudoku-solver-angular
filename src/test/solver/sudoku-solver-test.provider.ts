import { Injectable, Provider } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SOLVER_TOKEN } from "@app/core/solver/sudoku-solver.provider";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";

@Injectable()
export class TestSolver1 extends Solver {
  override getExecutionOrder(): number {
    return 1;
  }
  override executeSingleStep(lastResponse: SolverResponse): SolverStepResponse {
    return { branches: lastResponse.branches, stepId: "TEST_1", failed: false };
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
  override executeSingleStep(lastResponse: SolverResponse): SolverStepResponse {
    return { branches: lastResponse.branches, stepId: "TEST_2", failed: false };
  }
  override reset(): void {
    // nothing to do
  }
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
