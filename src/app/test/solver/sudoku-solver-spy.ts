import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import {
  SolverResponse,
  SolverResponseStatus,
} from "@app/core/solver/types/solver-response";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

export class SudokuSolverSpy {
  public static readonly STEP_ID = "TEST";

  static onSolveNextStepAndReturnBranches(
    solver: SudokuSolverService,
    branches: SolverBranch[],
    status: SolverResponseStatus = "INCOMPLETE",
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(() => {
      return {
        branches,
        status: status,
        stepId: SudokuSolverSpy.STEP_ID,
      } satisfies SolverResponse;
    });
  }

  static onSolveNextStepAndReturnPreviousGrid(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(
      (response: SolverResponse) => {
        return {
          branches: response.branches,
          status: "INCOMPLETE",
          stepId: SudokuSolverSpy.STEP_ID,
        } satisfies SolverResponse;
      },
    );
  }

  static onSolveNextStepAndReturnGrid(
    solver: SudokuSolverService,
    value: SudokuGrid,
    status: SolverResponseStatus = "INCOMPLETE",
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(
      (response: SolverResponse) => {
        return {
          branches: SudokuSolverSpy.setGridInAllBranches(response, value),
          status: status,
          stepId: SudokuSolverSpy.STEP_ID,
        } satisfies SolverResponse;
      },
    );
  }

  static onSolveNextStepAndReturnSuccess(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(
      (response: SolverResponse) => {
        return {
          branches: SudokuSolverSpy.setGridInAllBranches(
            response,
            PuzzleSimple.PUZZLE_1.solution,
          ),
          status: "COMPLETE",
          stepId: SudokuSolverSpy.STEP_ID,
        } satisfies SolverResponse;
      },
    );
  }

  static onSolveNextStepAndReturnFailure(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(
      (response: SolverResponse) => {
        return {
          branches: SudokuSolverSpy.setGridInAllBranches(
            response,
            PuzzleSimple.PUZZLE_1.solution,
          ),
          status: "FAILED",
          stepId: SudokuSolverSpy.STEP_ID,
        } satisfies SolverResponse;
      },
    );
  }

  private static setGridInAllBranches(
    response: SolverResponse,
    grid: SudokuGrid,
  ): SolverBranch[] {
    if (response.branches.length === 0) {
      return [SolverBranch.createInitialBranch(grid)];
    } else {
      return response.branches.map((branch) => {
        const clonedBranch = SolverBranch.cloneBranch(branch);
        clonedBranch.grid = grid;
        return clonedBranch;
      });
    }
  }

  public static expectToHaveBeenCalledWith(): void {}
}
