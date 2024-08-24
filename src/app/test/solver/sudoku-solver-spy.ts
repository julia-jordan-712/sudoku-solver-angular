import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import {
  SolverResponse,
  SolverResponseStatus,
} from "@app/core/solver/types/solver-response";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

export class SudokuSolverSpy {
  public static readonly STEP_ID = "TEST";

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
    value: SudokuGrid[],
    status: SolverResponseStatus = "INCOMPLETE",
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(
      (_response: SolverResponse) => {
        return {
          branches: value,
          status: status,
          stepId: SudokuSolverSpy.STEP_ID,
        } satisfies SolverResponse;
      },
    );
  }

  static onSolveNextStepAndReturnSuccess(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(() => {
      return {
        branches: [PuzzleSimple.PUZZLE_1.solution],
        status: "COMPLETE",
        stepId: SudokuSolverSpy.STEP_ID,
      } satisfies SolverResponse;
    });
  }

  static onSolveNextStepAndReturnFailure(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(() => {
      return {
        branches: [PuzzleSimple.PUZZLE_1.puzzle],
        status: "FAILED",
        stepId: SudokuSolverSpy.STEP_ID,
      } satisfies SolverResponse;
    });
  }
}
