import { Inject, Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SOLVER_TOKEN } from "@app/core/solver/sudoku-solver.provider";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";

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

  solveNextStep(lastResponse: SolverResponse): SolverResponse {
    let response: SolverResponse =
      this.cloneIntoNonReadonlySolverResponse(lastResponse);
    for (const solver of this.solvers) {
      response = solver.executeNextStep(response);
      if (response.status !== "FAILED") {
        break;
      }
    }
    return response;
  }

  private cloneIntoNonReadonlySolverResponse(
    lastResponse: SolverResponse,
  ): SolverResponse {
    return {
      status: lastResponse.status,
      stepId: lastResponse.stepId,
      branches: lastResponse.branches.map((branch) =>
        SolverBranch.cloneBranch(branch),
      ),
    };
  }
}
