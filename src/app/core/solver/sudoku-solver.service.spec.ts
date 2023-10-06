import { TestBed } from "@angular/core/testing";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Solver } from "@app/core/solver/solver";
import {
  SOLVER_PROVIDERS,
  SOLVER_TOKEN,
} from "@app/core/solver/sudoku-solver.provider";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SudokuSolverService } from "./sudoku-solver.service";

describe(SudokuSolverService.name, () => {
  describe("updating verification result", () => {
    let solverState: SudokuSolverStateService;
    let service: SudokuSolverService;
    let testSolver: jasmine.SpyObj<Solver>;

    beforeEach(() => {
      testSolver = jasmine.createSpyObj("testSolver", [
        "getExecutionOrder",
        "executeNextStep",
      ]);
      TestBed.configureTestingModule({
        providers: [
          {
            provide: SOLVER_TOKEN,
            useValue: testSolver,
            multi: true,
          },
        ],
      });
      service = TestBed.inject(SudokuSolverService);
      solverState = TestBed.inject(SudokuSolverStateService);
      testSolver.getExecutionOrder.and.returnValue(0);
      spyOn(solverState, "updateVerificationResults").and.callFake(() => {});
    });

    describe("success", () => {
      beforeEach(() => {
        testSolver.executeNextStep.and.returnValue({
          branches: [Puzzle4x4.COMPLETE],
          status: "COMPLETE",
        });
      });

      it("should determine verification result", () => {
        service.solveNextStep([Puzzle4x4.COMPLETE], solverState);
        expect(solverState.updateVerificationResults).toHaveBeenCalledTimes(1);
      });
    });

    describe("failure", () => {
      beforeEach(() => {
        testSolver.executeNextStep.and.returnValue({
          branches: [Puzzle4x4.INCOMPLETE_INVALID_COLUMN],
          status: "FAILED",
        });
      });

      it("should NOT determine verification result", () => {
        service.solveNextStep([Puzzle4x4.COMPLETE], solverState);
        expect(solverState.updateVerificationResults).not.toHaveBeenCalled();
      });
    });
  });

  describe("solver", () => {
    let solverState: SudokuSolverStateService;
    let service: SudokuSolverService;
    let verify: VerifySolutionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: SOLVER_PROVIDERS,
      });

      service = TestBed.inject(SudokuSolverService);
      solverState = TestBed.inject(SudokuSolverStateService);
      verify = TestBed.inject(VerifySolutionService);
    });

    [
      {
        puzzle: PuzzleSimple.PUZZLE_1.puzzle,
        name: "simple puzzle 1",
        steps: 151,
      },
      {
        puzzle: PuzzleSimple.PUZZLE_2.puzzle,
        name: "simple puzzle 2",
        steps: 154,
      },
      {
        puzzle: PuzzleSimple.PUZZLE_3.puzzle,
        name: "simple puzzle 3",
        steps: 162,
      },
      {
        puzzle: PuzzleSimple.PUZZLE_4.puzzle,
        name: "simple puzzle 4",
        steps: 158,
      },
      {
        puzzle: PuzzleSimple.PUZZLE_5.puzzle,
        name: "simple puzzle 5",
        steps: 154,
      },
      {
        puzzle: PuzzleMedium.PUZZLE_1.puzzle,
        name: "medium puzzle 1",
        steps: 225,
      },
      {
        puzzle: PuzzleAdvanced.PUZZLE_1.puzzle,
        name: "advanced puzzle 1",
        steps: 195,
      },
    ].forEach((params) => {
      it(`should solve ${params.name} in ${params.steps} steps`, () => {
        spyOn(solverState, "finishExecuting").and.callThrough();

        let puzzle: SudokuGrid[] = [SudokuGridUtil.clone(params.puzzle)];
        for (let step = 1; step <= params.steps; step++) {
          puzzle = service.solveNextStep(puzzle, solverState);

          if (step < params.steps) {
            expect(solverState.finishExecuting).not.toHaveBeenCalled();
          } else {
            expect(solverState.finishExecuting).toHaveBeenCalledOnceWith(
              "DONE",
            );
          }
        }
        expect(verify.verify(puzzle[0]).isValid()).toBeTrue();
      });
    });
  });
});
