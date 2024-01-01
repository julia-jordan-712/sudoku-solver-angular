import {
  SolverResponse,
  SolverResponseStatus,
} from "@app/core/solver/solver-response";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

export class SudokuSolverSpy {
  static onSolveNextStepAndReturnPreviousGrid(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake((b) => {
      return {
        branches: b,
        status: "INCOMPLETE",
        stepId: "TEST",
      } satisfies SolverResponse;
    });
  }

  static onSolveNextStepAndReturnGrid(
    solver: SudokuSolverService,
    value: SudokuGrid[],
    status: SolverResponseStatus = "INCOMPLETE",
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(() => {
      return {
        branches: value,
        status: status,
        stepId: "TEST",
      } satisfies SolverResponse;
    });
  }

  static onSolveNextStepAndReturnSuccess(
    solver: SudokuSolverService,
  ): jasmine.Spy {
    return spyOn(solver, "solveNextStep").and.callFake(() => {
      return {
        branches: [PuzzleSimple.PUZZLE_1.solution],
        status: "COMPLETE",
        stepId: "TEST",
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
        stepId: "TEST",
      } satisfies SolverResponse;
    });
  }
}
