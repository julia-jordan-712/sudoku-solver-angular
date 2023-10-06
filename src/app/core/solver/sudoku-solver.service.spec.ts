import { TestBed } from "@angular/core/testing";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Solver } from "@app/core/solver/solver";
import { SOLVER_TOKEN } from "@app/core/solver/sudoku-solver.provider";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { SudokuSolverService } from "./sudoku-solver.service";

describe(SudokuSolverService.name, () => {
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

  describe("finished", () => {
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
});
