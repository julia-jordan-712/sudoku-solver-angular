import { TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridViewModel,
} from "@app/shared/types/sudoku-grid-view-model";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SudokuSolverSpy } from "@app/test/solver/sudoku-solver-spy";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { TestSubscription } from "@app/test/test-subscription";
import { first } from "rxjs";
import { SudokuSolverStateService } from "./sudoku-solver-state.service";

describe(SudokuSolverStateService.name, () => {
  let service: SudokuSolverStateService;
  let solver: SudokuSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SudokuSolverService,
        ...SOLVER_TEST_PROVIDERS,
        SudokuSolverStateService,
        { provide: SUDOKU_SOLVER_STATE, useExisting: SudokuSolverStateService },
      ],
    });
    service = TestBed.inject(SudokuSolverStateService);
    solver = TestBed.inject(SudokuSolverService);
  });

  afterEach(() => {
    service.reset();
  });

  describe("start/pause/next", () => {
    describe("initially", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      });

      it("should have state NOT_STARTED", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("NOT_STARTED");
            done();
          });
      });

      it("should allow to start initially", (done) => {
        service
          .canStartExecuting()
          .pipe(first())
          .subscribe((canStart) => {
            expect(canStart).toBeTrue();
            done();
          });
      });

      it("should not allow to pause initially", (done) => {
        service
          .canPauseExecuting()
          .pipe(first())
          .subscribe((canPause) => {
            expect(canPause).toBeFalse();
            done();
          });
      });

      it("should allow to go to next step initially", (done) => {
        service
          .canGoToNextStep()
          .pipe(first())
          .subscribe((canGoToNext) => {
            expect(canGoToNext).toBeTrue();
            done();
          });
      });

      it("should not allow to restart initially", (done) => {
        service
          .canRestart()
          .pipe(first())
          .subscribe((canRestart) => {
            expect(canRestart).toBeFalse();
            done();
          });
      });
    });

    describe("running", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
        service.startExecuting();
      });

      it("should have state RUNNING", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("RUNNING");
            done();
          });
      });

      it("should not allow to start while running (because it is already started)", (done) => {
        service
          .canStartExecuting()
          .pipe(first())
          .subscribe((canStart) => {
            expect(canStart).toBeFalse();
            done();
          });
      });

      it("should allow to pause while running", (done) => {
        service
          .canPauseExecuting()
          .pipe(first())
          .subscribe((canPause) => {
            expect(canPause).toBeTrue();
            done();
          });
      });

      it("should not allow to go to next step while running", (done) => {
        service
          .canGoToNextStep()
          .pipe(first())
          .subscribe((canGoToNext) => {
            expect(canGoToNext).toBeFalse();
            done();
          });
      });

      it("should not allow to restart while running", (done) => {
        service
          .canRestart()
          .pipe(first())
          .subscribe((canRestart) => {
            expect(canRestart).toBeFalse();
            done();
          });
      });
    });

    describe("paused", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
        service.startExecuting();
        service.pauseExecuting();
      });

      it("should have state PAUSED", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("PAUSED");
            done();
          });
      });

      it("should allow to start while paused", (done) => {
        service
          .canStartExecuting()
          .pipe(first())
          .subscribe((canStart) => {
            expect(canStart).toBeTrue();
            done();
          });
      });

      it("should not allow to pause while paused", (done) => {
        service
          .canPauseExecuting()
          .pipe(first())
          .subscribe((canPause) => {
            expect(canPause).toBeFalse();
            done();
          });
      });

      it("should allow to go to next step while paused", (done) => {
        service
          .canGoToNextStep()
          .pipe(first())
          .subscribe((canGoToNext) => {
            expect(canGoToNext).toBeTrue();
            done();
          });
      });

      it("should not allow to restart while paused", (done) => {
        service
          .canRestart()
          .pipe(first())
          .subscribe((canRestart) => {
            expect(canRestart).toBeFalse();
            done();
          });
      });
    });

    describe("go to next step", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
        service.startExecuting();
        service.pauseExecuting();
        service.executeNextStep();
      });

      it("should have state PAUSED", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("PAUSED");
            done();
          });
      });

      it("should allow to start after going to next step", (done) => {
        service
          .canStartExecuting()
          .pipe(first())
          .subscribe((canStart) => {
            expect(canStart).toBeTrue();
            done();
          });
      });

      it("should allow to go to next step after going to next step", (done) => {
        service
          .canGoToNextStep()
          .pipe(first())
          .subscribe((canGoToNext) => {
            expect(canGoToNext).toBeTrue();
            done();
          });
      });

      it("should not allow to restart after going to next step", (done) => {
        service
          .canRestart()
          .pipe(first())
          .subscribe((canRestart) => {
            expect(canRestart).toBeFalse();
            done();
          });
      });
    });

    describe("continuing after paused", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
        service.startExecuting();
        service.pauseExecuting();
        service.startExecuting();
      });

      it("should have state RUNNING", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("RUNNING");
            done();
          });
      });

      it("should not allow to start after continuing (because it is already running)", (done) => {
        service
          .canStartExecuting()
          .pipe(first())
          .subscribe((canStart) => {
            expect(canStart).toBeFalse();
            done();
          });
      });

      it("should allow to pause after continuing", (done) => {
        service
          .canPauseExecuting()
          .pipe(first())
          .subscribe((canPause) => {
            expect(canPause).toBeTrue();
            done();
          });
      });

      it("should not allow to go to next step after continuing", (done) => {
        service
          .canGoToNextStep()
          .pipe(first())
          .subscribe((canGoToNext) => {
            expect(canGoToNext).toBeFalse();
            done();
          });
      });

      it("should not allow to restart after continuing", (done) => {
        service
          .canRestart()
          .pipe(first())
          .subscribe((canRestart) => {
            expect(canRestart).toBeFalse();
            done();
          });
      });
    });

    describe("finished", () => {
      beforeEach(() => {
        service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.solution);
      });

      describe("success", () => {
        beforeEach(() => {
          SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
          service.startExecuting();
          service.finishExecuting("DONE");
        });

        it("should have state DONE", (done) => {
          service
            .getExecutionState()
            .pipe(first())
            .subscribe((state) => {
              expect(state).toEqual("DONE");
              done();
            });
        });

        it("should not allow to start when done", (done) => {
          service
            .canStartExecuting()
            .pipe(first())
            .subscribe((canStart) => {
              expect(canStart).toBeFalse();
              done();
            });
        });

        it("should not allow to pause when done", (done) => {
          service
            .canPauseExecuting()
            .pipe(first())
            .subscribe((canPause) => {
              expect(canPause).toBeFalse();
              done();
            });
        });

        it("should not allow to go to next step when done", (done) => {
          service
            .canGoToNextStep()
            .pipe(first())
            .subscribe((canGoToNext) => {
              expect(canGoToNext).toBeFalse();
              done();
            });
        });

        it("should allow to restart when done", (done) => {
          service
            .canRestart()
            .pipe(first())
            .subscribe((canRestart) => {
              expect(canRestart).toBeTrue();
              done();
            });
        });
      });

      describe("failure", () => {
        beforeEach(() => {
          SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
          service.startExecuting();
          service.finishExecuting("FAILED");
        });

        it("should have state FAILED", (done) => {
          service
            .getExecutionState()
            .pipe(first())
            .subscribe((state) => {
              expect(state).toEqual("FAILED");
              done();
            });
        });

        it("should not allow to start when failed", (done) => {
          service
            .canStartExecuting()
            .pipe(first())
            .subscribe((canStart) => {
              expect(canStart).toBeFalse();
              done();
            });
        });

        it("should not allow to pause when failed", (done) => {
          service
            .canPauseExecuting()
            .pipe(first())
            .subscribe((canPause) => {
              expect(canPause).toBeFalse();
              done();
            });
        });

        it("should not allow to go to next step when failed", (done) => {
          service
            .canGoToNextStep()
            .pipe(first())
            .subscribe((canGoToNext) => {
              expect(canGoToNext).toBeFalse();
              done();
            });
        });

        it("should allow to restart when failed", (done) => {
          service
            .canRestart()
            .pipe(first())
            .subscribe((canRestart) => {
              expect(canRestart).toBeTrue();
              done();
            });
        });
      });
    });
  });

  describe("calling solver", () => {
    it("should call solver with initial response (contains puzzle to solve) when starting", () => {
      const solverSpy: jasmine.Spy =
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.puzzle);
      expect(solverSpy).not.toHaveBeenCalled();

      service.startExecuting();
      expect(solverSpy).toHaveBeenCalledWith({
        branches: [
          jasmine.objectContaining({ grid: PuzzleSimple.PUZZLE_1.puzzle }),
        ],
        status: "UNKNOWN",
        stepId: "",
      });
    });

    it("should call solver with response from last step when going to next step", () => {
      const solverSpy: jasmine.Spy =
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);

      service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.puzzle);
      service.startExecuting();
      service.pauseExecuting();
      solverSpy.calls.reset();
      expect(solverSpy).not.toHaveBeenCalled();

      service.executeNextStep();
      expect(solverSpy).toHaveBeenCalledWith({
        branches: [
          jasmine.objectContaining({ grid: PuzzleSimple.PUZZLE_1.puzzle }),
        ],
        status: "INCOMPLETE",
        stepId: SudokuSolverSpy.STEP_ID,
      });
    });

    it("should call solver with response from last step while running", fakeAsync(() => {
      const responseGrid: SudokuGrid = PuzzleAdvanced.PUZZLE_1.puzzle;
      const solverSpy: jasmine.Spy =
        SudokuSolverSpy.onSolveNextStepAndReturnGrid(solver, responseGrid);

      service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.puzzle);
      service.setMaximumSteps(3);
      expect(solverSpy).not.toHaveBeenCalled();
      service.executeNextStep();
      expect(solverSpy).toHaveBeenCalledTimes(1);
      solverSpy.calls.reset();
      expect(solverSpy).not.toHaveBeenCalled();

      // start running
      service.startExecuting();
      tick(1);

      // second call with response from previous step
      expect(solverSpy).toHaveBeenCalledTimes(2);
      expect(solver.solveNextStep).toHaveBeenCalledWith({
        branches: [
          jasmine.objectContaining({ grid: PuzzleAdvanced.PUZZLE_1.puzzle }),
        ],
        status: "INCOMPLETE",
        stepId: SudokuSolverSpy.STEP_ID,
      });
    }));
  });

  describe("updating when solver is done", () => {
    describe("success", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnSuccess(solver);
        service.executeNextStep();
      });

      it("should terminate", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("DONE");
            done();
          });
      });

      it("should determine verification result", (done) => {
        service
          .getVerificationResults()
          .pipe(first())
          .subscribe((result) => {
            expect(result).not.toBeNull();
            expect(result?.length).toEqual(1);
            expect(result?.[0].isValid()).toBeTrue();
            done();
          });
      });
    });

    describe("failure", () => {
      beforeEach(() => {
        SudokuSolverSpy.onSolveNextStepAndReturnFailure(solver);
        service.executeNextStep();
      });

      it("should terminate", (done) => {
        service
          .getExecutionState()
          .pipe(first())
          .subscribe((state) => {
            expect(state).toEqual("FAILED");
            done();
          });
      });

      it("should NOT determine verification result", (done) => {
        service
          .getVerificationResults()
          .pipe(first())
          .subscribe((result) => {
            expect(result).toBeUndefined();
            done();
          });
      });
    });
  });

  describe("reset", () => {
    beforeEach(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      spyOn(solver, "reset").and.callFake(() => {});
      service.setInitialPuzzle(PuzzleAdvanced.PUZZLE_1.puzzle);
      service.startExecuting();
      service.pauseExecuting();
      service.executeNextStep();
    });

    it("should have state NOT_STARTED", (done) => {
      service.reset();
      service
        .getExecutionState()
        .pipe(first())
        .subscribe((state) => {
          expect(state).toEqual("NOT_STARTED");
          done();
        });
    });

    it("should allow to start after reset", (done) => {
      service.reset();
      service
        .canStartExecuting()
        .pipe(first())
        .subscribe((canStart) => {
          expect(canStart).toBeTrue();
          done();
        });
    });

    it("should not allow to pause after reset", (done) => {
      service.reset();
      service
        .canPauseExecuting()
        .pipe(first())
        .subscribe((canPause) => {
          expect(canPause).toBeFalse();
          done();
        });
    });

    it("should allow to go to next step after reset", (done) => {
      service.reset();
      service
        .canGoToNextStep()
        .pipe(first())
        .subscribe((canGoToNext) => {
          expect(canGoToNext).toBeTrue();
          done();
        });
    });

    it("should not allow to restart after reset", (done) => {
      service
        .canRestart()
        .pipe(first())
        .subscribe((canRestart) => {
          expect(canRestart).toBeFalse();
          done();
        });
    });

    it("should have no sudoku grid after reset", (done) => {
      service.reset();
      service
        .getViewModels()
        .pipe(first())
        .subscribe((viewModels) => {
          expect(viewModels).toEqual([]);
          done();
        });
    });

    it("should have no verification result after reset", (done) => {
      service.reset();
      service
        .getVerificationResults()
        .pipe(first())
        .subscribe((verification) => {
          expect(verification).toBeUndefined();
          done();
        });
    });

    it("should increase steps while running", (done) => {
      service
        .getStepsExecuted()
        .pipe(first())
        .subscribe((steps) => {
          expect(steps).toBeGreaterThan(0);
          done();
        });
    });

    it("should have no no steps executed after reset", (done) => {
      service.reset();
      service
        .getStepsExecuted()
        .pipe(first())
        .subscribe((steps) => {
          expect(steps).toEqual(0);
          done();
        });
    });

    it("should reset the solver", () => {
      service.reset();
      expect(solver.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe("stopping time for executing the solver", () => {
    beforeEach(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      service.setInitialPuzzle(PuzzleAdvanced.PUZZLE_1.puzzle);
      service.setMaximumSteps(10);
      service.setDelay(100);
    });

    it("should not have any time passed before it is started", fakeAsync(() => {
      tick(100);
      expect(service.getTimeElapsed()).toEqual(0);

      service.startExecuting();
      tick(100);
      expect(service.getTimeElapsed()).toEqual(100);

      tick(100);
      expect(service.getTimeElapsed()).toEqual(200);

      flush();
    }));

    it("should stop when state DONE is reached", fakeAsync(() => {
      service.startExecuting();
      tick(100);
      service.finishExecuting("DONE");
      tick(100);
      expect(service.getTimeElapsed()).toEqual(100);

      flush();
    }));

    it("should stop when state FAILED is reached", fakeAsync(() => {
      service.startExecuting();
      tick(100);
      service.finishExecuting("FAILED");
      tick(100);
      expect(service.getTimeElapsed()).toEqual(100);

      flush();
    }));

    it("should NOT stop when paused", fakeAsync(() => {
      service.startExecuting();
      tick(100);
      service.pauseExecuting();
      tick(100);
      expect(service.getTimeElapsed()).toEqual(200);

      flush();
    }));
  });

  describe("view models", () => {
    it("should create single view model with exactly the same cell values", async () => {
      const testSubscription = TestSubscription.start(service.getViewModels());
      service.setInitialPuzzle([
        [1, 2, 3, 4],
        [3, 4, [1, 2], [1, 2]],
        [2, [1, 3], [1, 4], [1, 3]],
        [4, [1, 3], [1, 2], [1, 2, 3]],
      ]);

      const viewModels: SudokuGridViewModel[] = await testSubscription.value();

      expect(viewModels.length).toEqual(1);
      const viewModel: SudokuGridViewModel = viewModels[0];

      expect(viewModel.rows.length).toEqual(4);
      const row0: SudokuGridCellViewModel[] = viewModel.rows[0].cells;
      expect(row0.length).toEqual(4);
      expect(row0[0].cell).toEqual(1);
      expect(row0[1].cell).toEqual(2);
      expect(row0[2].cell).toEqual(3);
      expect(row0[3].cell).toEqual(4);
      const row1: SudokuGridCellViewModel[] = viewModel.rows[1].cells;
      expect(row1.length).toEqual(4);
      expect(row1[0].cell).toEqual(3);
      expect(row1[1].cell).toEqual(4);
      expect(row1[2].cell).toEqual([1, 2]);
      expect(row1[3].cell).toEqual([1, 2]);
      const row2: SudokuGridCellViewModel[] = viewModel.rows[2].cells;
      expect(row2[0].cell).toEqual(2);
      expect(row2[1].cell).toEqual([1, 3]);
      expect(row2[2].cell).toEqual([1, 4]);
      expect(row2[3].cell).toEqual([1, 3]);
      const row3: SudokuGridCellViewModel[] = viewModel.rows[3].cells;
      expect(row3[0].cell).toEqual(4);
      expect(row3[1].cell).toEqual([1, 3]);
      expect(row3[2].cell).toEqual([1, 2]);
      expect(row3[3].cell).toEqual([1, 2, 3]);
    });

    it("should have correct max value in each cell", async () => {
      const testSubscription = TestSubscription.start(service.getViewModels());
      service.setInitialPuzzle(Puzzle4x4.EMPTY);

      const viewModels: SudokuGridViewModel[] = await testSubscription.value();

      viewModels[0].rows
        .flatMap((row) => row.cells.map((cell) => cell.maxValue))
        .forEach((maxValue) => expect(maxValue).toEqual(4));
    });

    it("should order multiple view models by branches with the current branch at the first position", async () => {
      const initialBranch: SolverBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      const secondBranch: SolverBranch = initialBranch.openBranch(
        { row: 0, column: 0 },
        1,
      );
      const thirdBranch: SolverBranch = secondBranch.openBranch(
        { row: 1, column: 1 },
        2,
      );
      const fourthBranch: SolverBranch = thirdBranch.openBranch(
        { row: 2, column: 3 },
        3,
      );
      const branches: SolverBranch[] = [
        thirdBranch,
        fourthBranch,
        initialBranch,
        secondBranch,
      ];
      SudokuSolverSpy.onSolveNextStepAndReturnBranches(solver, branches);
      service.setInitialPuzzle(Puzzle4x4.EMPTY);

      const testSubscription = TestSubscription.start(
        service.getViewModels(),
        true,
      );
      service.executeNextStep();

      const viewModels: SudokuGridViewModel[] = await testSubscription.value();
      expect(viewModels.length).toEqual(4);

      expect(removeExecutionIdFromViewModelId(viewModels[0])).toEqual(
        "CURRENT",
      );
      expect(removeExecutionIdFromViewModelId(viewModels[0])).not.toEqual(
        fourthBranch.getId(),
      );
      const expectedCurrentBranchInfo: SudokuGridViewModel["branchInfo"] = {
        id: fourthBranch.getId(),
        isCurrent: true,
      };
      expect(viewModels[0].branchInfo).toEqual(expectedCurrentBranchInfo);
      expect(viewModels[0].rows[0].branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );
      expect(viewModels[0].rows[0].cells[0].branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );

      expect(removeExecutionIdFromViewModelId(viewModels[1])).toEqual(
        thirdBranch.getId(),
      );
      expect(removeExecutionIdFromViewModelId(viewModels[2])).toEqual(
        secondBranch.getId(),
      );
      expect(removeExecutionIdFromViewModelId(viewModels[3])).toEqual(
        initialBranch.getId(),
      );
      const expectedInitialBranchInfo: SudokuGridViewModel["branchInfo"] = {
        id: initialBranch.getId(),
        isCurrent: false,
      };
      expect(viewModels[3].branchInfo).toEqual(expectedInitialBranchInfo);
      expect(viewModels[3].rows[0].branchInfo).toEqual(
        expectedInitialBranchInfo,
      );
      expect(viewModels[3].rows[0].cells[0].branchInfo).toEqual(
        expectedInitialBranchInfo,
      );

      testSubscription.destroy();
    });

    function removeExecutionIdFromViewModelId(
      viewModel: SudokuGridViewModel,
    ): string {
      return viewModel.id.substring(viewModel.id.indexOf("_") + 1);
    }
  });
});
