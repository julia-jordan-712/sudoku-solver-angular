import { TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SudokuSolverSpy } from "@app/test/solver/sudoku-solver-spy";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
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
    it("should call solver with puzzle to solve when starting", () => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.puzzle);
      expect(solver.solveNextStep).not.toHaveBeenCalled();

      service.startExecuting();
      expect(solver.solveNextStep).toHaveBeenCalledWith([
        PuzzleSimple.PUZZLE_1.puzzle,
      ]);
    });

    it("should call solver again with puzzle from last step while running", fakeAsync(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnGrid(solver, [
        PuzzleAdvanced.PUZZLE_1.puzzle,
      ]);

      service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.puzzle);
      service.setMaximumSteps(3);
      expect(solver.solveNextStep).not.toHaveBeenCalled();

      service.startExecuting();
      tick(1);

      expect(solver.solveNextStep).toHaveBeenCalledWith([
        PuzzleSimple.PUZZLE_1.puzzle,
      ]);
      expect(solver.solveNextStep).toHaveBeenCalledWith([
        PuzzleAdvanced.PUZZLE_1.puzzle,
      ]);
    }));

    it("should call solver with puzzle to solve when going to next step", () => {
      const solverSpy: jasmine.Spy =
        SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);

      service.setInitialPuzzle(PuzzleSimple.PUZZLE_1.puzzle);
      service.startExecuting();
      service.pauseExecuting();
      solverSpy.calls.reset();
      expect(solverSpy).not.toHaveBeenCalled();

      service.executeNextStep();
      expect(solverSpy).toHaveBeenCalledWith([PuzzleSimple.PUZZLE_1.puzzle]);
    });
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
});
