import { inject, Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Nullable } from "@app/shared/types/nullable";

@Injectable({
  providedIn: "root",
})
export class SolverCloseBranch extends Solver {
  private static readonly STEP_ID: string = "BRANCH_CLOSE";
  private verifyService: VerifySolutionService = inject(VerifySolutionService);

  override getExecutionOrder(): number {
    return 2;
  }

  override reset(): void {
    // nothing to do
  }

  override executeSingleStep(lastResponse: SolverResponse): SolverStepResponse {
    const currentBranch: Nullable<SolverBranch> =
      this.getCurrentBranch(lastResponse);
    if (currentBranch) {
      const verificationResult = this.verifyService.verify(currentBranch.grid, {
        size: currentBranch.grid.length,
        disallowEmptyCells: true,
      });
      if (!verificationResult.isValid()) {
        const newBranches: SolverBranch[] = currentBranch.closeBranch(
          lastResponse.branches,
        );
        return {
          branches: newBranches,
          failed: true,
          stepId: SolverCloseBranch.STEP_ID,
        };
      }
    }
    return {
      branches: lastResponse.branches,
      failed: true,
      stepId: SolverCloseBranch.STEP_ID,
    };
  }
}
