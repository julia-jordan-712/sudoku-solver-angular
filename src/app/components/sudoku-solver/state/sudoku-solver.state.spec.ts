import {
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from "@angular/core/testing";
import { appStoreImports } from "@app/app.module";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";
import { Store } from "@ngrx/store";
import { PuzzleAdvanced } from "@test/puzzles/puzzle-advanced";
import { PuzzleSimple } from "@test/puzzles/puzzle-simple";
import { SudokuSolverSpy } from "@test/solver/sudoku-solver-spy";
import { SOLVER_TEST_PROVIDERS } from "@test/solver/sudoku-solver-test.provider";

describe("SudokuSolverState", () => {
  let solver: SudokuSolverService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: appStoreImports,
      providers: [...SOLVER_TEST_PROVIDERS],
    });

    solver = TestBed.inject(SudokuSolverService);
    store = TestBed.inject(Store);
    store.dispatch(SudokuSolverActions.setDelay({ delay: 0 }));
  });

  describe("calling solver", () => {
    it("should call solver with initial response (contains puzzle to solve) when starting", () => {
      // arrange
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      store.dispatch(
        SudokuPuzzleActions.setSudoku({
          sudoku: SudokuGridUtil.clone(PuzzleAdvanced.PUZZLE_4.puzzle),
        }),
      );
      store.dispatch(SudokuPuzzleSolverSwitchActions.submitPuzzle());
      store.dispatch(SudokuSolverActions.setMaximumSteps({ maxSteps: 1 }));

      // act
      store.dispatch(SudokuSolverActions.stepExecute());

      // assert
      expect(solver.solveNextStep).toHaveBeenCalledOnceWith({
        branches: [
          jasmine.objectContaining({ grid: PuzzleAdvanced.PUZZLE_4.puzzle }),
        ],
        status: "UNKNOWN",
        stepId: "",
      });
    });

    it("should call solver with response from last step while running", fakeAsync(() => {
      // arrange
      const spy = SudokuSolverSpy.onSolveNextStepAndReturnGrid(
        solver,
        PuzzleAdvanced.PUZZLE_1.puzzle,
      );
      store.dispatch(
        SudokuPuzzleActions.setSudoku({
          sudoku: SudokuGridUtil.clone(PuzzleAdvanced.PUZZLE_2.puzzle),
        }),
      );
      store.dispatch(SudokuPuzzleSolverSwitchActions.submitPuzzle());
      store.dispatch(SudokuSolverActions.setMaximumSteps({ maxSteps: 3 }));

      // act
      store.dispatch(SudokuSolverActions.solverStart());
      tick(1);

      // assert
      expect(spy).toHaveBeenCalledTimes(3);
      // first call with initial puzzle
      expect(spy).toHaveBeenCalledWith({
        branches: [
          jasmine.objectContaining({ grid: PuzzleAdvanced.PUZZLE_2.puzzle }),
        ],
        status: "UNKNOWN",
        stepId: "",
      });
      // afterwards with response from previous step
      expect(spy).toHaveBeenCalledWith({
        branches: [
          jasmine.objectContaining({ grid: PuzzleAdvanced.PUZZLE_1.puzzle }),
        ],
        status: "INCOMPLETE",
        stepId: "TEST",
      });
    }));
  });

  describe("after reset", () => {
    beforeEach(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      spyOn(solver, "reset").and.callFake(() => {});

      store.dispatch(
        SudokuPuzzleActions.setSudoku({
          sudoku: SudokuGridUtil.clone(PuzzleSimple.PUZZLE_1.puzzle),
        }),
      );
      store.dispatch(SudokuPuzzleSolverSwitchActions.submitPuzzle());
      store.dispatch(SudokuSolverActions.setMaximumSteps({ maxSteps: 10 }));
      store.dispatch(SudokuSolverActions.setDelay({ delay: 1 }));
    });

    it("should have state NOT_STARTED", () => {
      const status = store.selectSignal(
        SudokuSolverSelectors.selectExecutionStatus,
      );
      store.dispatch(SudokuSolverActions.solverStart());
      expect(status()).toEqual("RUNNING");

      store.dispatch(SudokuSolverActions.solverReset());

      expect(status()).toEqual("NOT_STARTED");
    });

    it("should allow to start", () => {
      const canStart = store.selectSignal(SudokuSolverSelectors.selectCanStart);
      store.dispatch(SudokuSolverActions.solverStart());
      expect(canStart()).toBeFalse();

      store.dispatch(SudokuSolverActions.solverReset());

      expect(canStart()).toBeTrue();
    });

    it("should allow to go to next step", () => {
      const canGoToNext = store.selectSignal(
        SudokuSolverSelectors.selectCanGoToNextStep,
      );
      store.dispatch(SudokuSolverActions.solverStart());
      expect(canGoToNext()).toBeFalse();

      store.dispatch(SudokuSolverActions.solverReset());

      expect(canGoToNext()).toBeTrue();
    });

    it("should NOT allow to pause", () => {
      const canPause = store.selectSignal(SudokuSolverSelectors.selectCanPause);
      store.dispatch(SudokuSolverActions.solverStart());
      expect(canPause()).toBeTrue();

      store.dispatch(SudokuSolverActions.solverReset());

      expect(canPause()).toBeFalse();
    });

    it("should NOT allow to restart", () => {
      const canRestart = store.selectSignal(
        SudokuSolverSelectors.selectCanRestart,
      );
      store.dispatch(SudokuSolverActions.solverStart());
      expect(canRestart()).toBeFalse();

      store.dispatch(SudokuSolverActions.solverReset());

      expect(canRestart()).toBeFalse();
    });

    it("should have no sudoku grid", () => {
      const viewModel = store.selectSignal(
        SudokuSolverSelectors.selectResponse,
      );
      store.dispatch(SudokuSolverActions.solverStart());
      expect(viewModel().branches[0].grid).toEqual(
        PuzzleSimple.PUZZLE_1.puzzle,
      );

      store.dispatch(SudokuSolverActions.solverReset());

      expect(viewModel().branches.length).toBe(0);
    });

    it("should have no steps executed", () => {
      const stepsExecuted = store.selectSignal(
        SudokuSolverSelectors.selectExecutedSteps,
      );
      store.dispatch(SudokuSolverActions.solverPause());
      store.dispatch(SudokuSolverActions.stepExecute());
      store.dispatch(SudokuSolverActions.stepExecute());
      store.dispatch(SudokuSolverActions.stepExecute());
      expect(stepsExecuted()).toBe(3);

      store.dispatch(SudokuSolverActions.solverReset());

      expect(stepsExecuted()).toBe(0);
    });

    it("should reset the solver", () => {
      expect(solver.reset).not.toHaveBeenCalled();

      store.dispatch(SudokuSolverActions.solverStart());
      expect(solver.reset).not.toHaveBeenCalled();

      store.dispatch(SudokuSolverActions.solverPause());
      expect(solver.reset).not.toHaveBeenCalled();

      store.dispatch(SudokuSolverActions.stepExecute());
      expect(solver.reset).not.toHaveBeenCalled();

      store.dispatch(SudokuSolverActions.solverReset());
      expect(solver.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe("stopping time for executing the solver", () => {
    beforeEach(() => {
      store.dispatch(SudokuSolverActions.setMaximumSteps({ maxSteps: 10 }));
      store.dispatch(SudokuSolverActions.setDelay({ delay: 1 }));
    });

    it("should not have any time passed before it is started", fakeAsync(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      const time = store.selectSignal(
        SudokuSolverSelectors.selectTimeElapsedMilliseconds,
      );
      expect(time()).toBe(0);

      store.dispatch(SudokuSolverActions.solverStart());
      expect(time()).toBe(0);

      tick(1);
      expect(time()).toBe(1);

      discardPeriodicTasks();
      flush();
    }));

    it("should increase as time passes on", fakeAsync(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      const time = store.selectSignal(
        SudokuSolverSelectors.selectTimeElapsedMilliseconds,
      );
      store.dispatch(SudokuSolverActions.solverStart());

      tick(1);
      expect(time()).toBe(1);

      tick(2);
      expect(time()).toBe(3);

      discardPeriodicTasks();
      flush();
    }));

    it("should still increase while paused", fakeAsync(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      const time = store.selectSignal(
        SudokuSolverSelectors.selectTimeElapsedMilliseconds,
      );
      store.dispatch(SudokuSolverActions.solverStart());
      tick(1);
      expect(time()).toBe(1);

      store.dispatch(SudokuSolverActions.solverPause());
      tick(5);
      store.dispatch(SudokuSolverActions.stepExecute());

      expect(time()).toBe(6);

      discardPeriodicTasks();
      flush();
    }));

    it("should stop on success", fakeAsync(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnSuccess(solver);
      const time = store.selectSignal(
        SudokuSolverSelectors.selectTimeElapsedMilliseconds,
      );
      store.dispatch(SudokuSolverActions.solverStart());

      tick(10);
      expect(time()).toBe(0); // because succeeded immediately

      discardPeriodicTasks();
      flush();
    }));

    it("should stop on failure", fakeAsync(() => {
      SudokuSolverSpy.onSolveNextStepAndReturnFailure(solver);
      const time = store.selectSignal(
        SudokuSolverSelectors.selectTimeElapsedMilliseconds,
      );
      store.dispatch(SudokuSolverActions.solverStart());

      tick(10);
      expect(time()).toBe(0); // because failed immediately

      discardPeriodicTasks();
      flush();
    }));
  });

  describe("scheduling next solver step", () => {
    it("should wait for the 'delay' in milliseconds between steps while running", fakeAsync(() => {
      // arrange
      const spy = SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      store.dispatch(SudokuSolverActions.setMaximumSteps({ maxSteps: 3 }));
      store.dispatch(SudokuSolverActions.setDelay({ delay: 100 }));

      // act & assert
      store.dispatch(SudokuSolverActions.solverStart());
      expect(spy).toHaveBeenCalledTimes(1);
      spy.calls.reset();

      // act & assert
      tick(1);
      expect(spy).not.toHaveBeenCalled();
      tick(98);
      expect(spy).not.toHaveBeenCalled();
      tick(1);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.calls.reset();

      // act & assert
      tick(100);
      expect(spy).toHaveBeenCalledTimes(1);

      // cleanup
      discardPeriodicTasks();
      flush();
    }));

    it("should not schedule another step when pausing", fakeAsync(() => {
      // arrange
      const spy = SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      store.dispatch(SudokuSolverActions.setMaximumSteps({ maxSteps: 3 }));
      store.dispatch(SudokuSolverActions.setDelay({ delay: 10 }));

      // pre-assert
      store.dispatch(SudokuSolverActions.solverStart());
      tick(10);
      expect(spy).toHaveBeenCalledTimes(2);
      spy.calls.reset();

      // act
      store.dispatch(SudokuSolverActions.solverPause());

      // assert
      tick(100);
      expect(spy).not.toHaveBeenCalled();

      // cleanup
      discardPeriodicTasks();
      flush();
    }));
  });
});
