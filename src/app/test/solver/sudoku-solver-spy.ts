import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import {
  SolverResponse,
  SolverResponseStatus,
} from "@app/core/solver/types/solver-response";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

type SpyFunctions = "solveNextStep" | "reset";

export class SudokuSolverSpy {
  public readonly STEP_ID = "TEST";

  private solveNextStep: (response: SolverResponse) => SolverResponse;
  private solveNextStepSpy: jasmine.Spy;
  private resetSpy: jasmine.Spy;

  constructor(private solver: SudokuSolverService) {
    this.solveNextStep = (r) => r;
    this.solveNextStepSpy = spyOn(this.solver, "solveNextStep").and.callFake(
      this.solveNextStep,
    );
    this.resetSpy = spyOn(this.solver, "reset").and.callFake(() => {});
  }

  onSolveNextStepAndReturnPreviousGrid(): void {
    this.solveNextStep = (response: SolverResponse) => {
      return {
        branches: response.branches,
        status: "INCOMPLETE",
        stepId: this.STEP_ID,
      } satisfies SolverResponse;
    };
  }

  onSolveNextStepAndReturnGrid(
    value: SudokuGrid,
    status: SolverResponseStatus = "INCOMPLETE",
  ): void {
    this.solveNextStep = (response: SolverResponse) => {
      return {
        branches: this.setGridInAllBranches(response, value),
        status: status,
        stepId: this.STEP_ID,
      } satisfies SolverResponse;
    };
  }

  onSolveNextStepAndReturnSuccess(): void {
    this.solveNextStep = (response: SolverResponse) => {
      return {
        branches: this.setGridInAllBranches(
          response,
          PuzzleSimple.PUZZLE_1.solution,
        ),
        status: "COMPLETE",
        stepId: this.STEP_ID,
      } satisfies SolverResponse;
    };
  }

  onSolveNextStepAndReturnFailure(): void {
    this.solveNextStep = (response: SolverResponse) => {
      return {
        branches: this.setGridInAllBranches(
          response,
          PuzzleSimple.PUZZLE_1.solution,
        ),
        status: "FAILED",
        stepId: this.STEP_ID,
      } satisfies SolverResponse;
    };
  }

  private setGridInAllBranches(
    response: SolverResponse,
    grid: SudokuGrid,
  ): SolverBranch[] {
    if (response.branches.length === 0) {
      return [SolverBranch.createInitialBranch(grid)];
    } else {
      return response.branches.map((branch) => {
        if (branch.isCurrentBranch()) {
          branch.grid = grid;
        }
        return branch;
      });
    }
  }

  public expectSolveNextStepToHaveBeenCalledWith(
    branches: { grid: SudokuGrid; hasParent?: boolean; hasChild?: boolean }[],
    status: SolverResponse["status"],
    stepId: SolverResponse["stepId"],
  ): void {
    const expectedBranches = branches.map((branch) => {
      jasmine.objectContaining({
        grid: branch.grid,
        parentId:
          branch.hasParent != undefined
            ? branch.hasParent
              ? jasmine.anything()
              : undefined
            : jasmine.anything(),
        childId:
          branch.hasChild != undefined
            ? branch.hasChild
              ? jasmine.anything()
              : undefined
            : jasmine.anything(),
      });
    });
    expect(this.solveNextStepSpy).toHaveBeenCalledWith({
      branches: expectedBranches,
      status,
      stepId,
    });
  }

  public expectToHaveBeenCalledTimes(func: SpyFunctions, times: number) {
    switch (func) {
      case "solveNextStep":
        this.expectSpyToHaveBeenCalledTimes(this.solveNextStepSpy, times);
        break;
      case "reset":
        this.expectSpyToHaveBeenCalledTimes(this.resetSpy, times);
        break;
    }
  }

  private expectSpyToHaveBeenCalledTimes(spy: jasmine.Spy, times: number) {
    if (times === 0) {
      expect(spy).not.toHaveBeenCalled();
    } else {
      expect(spy).toHaveBeenCalledTimes(times);
    }
  }

  public resetAllCalls(): void {
    this.solveNextStepSpy.calls.reset();
    this.resetSpy.calls.reset();
  }
}
