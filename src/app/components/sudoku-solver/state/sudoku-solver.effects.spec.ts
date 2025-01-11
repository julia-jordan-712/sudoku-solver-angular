import { TestBed } from "@angular/core/testing";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import {
  SudokuSolverStateExecutionInfo,
  SudokuSolverStateSettings,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import {
  SolverResponse,
  SolverResponseStatus,
} from "@app/core/solver/types/solver-response";
import { AppState } from "@app/state/app-state";
import { SolverExecution } from "@app/types/solver-execution";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { PuzzleSimple } from "@test/puzzles/puzzle-simple";
import { SudokuSolverSpy } from "@test/solver/sudoku-solver-spy";
import { SOLVER_TEST_PROVIDERS } from "@test/solver/sudoku-solver-test.provider";
import { TestState } from "@test/state/test-state";
import { getTestScheduler, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

describe(SudokuSolverEffects.name, () => {
  let actions$: Observable<any>;
  let solver: SudokuSolverService;
  let underTest: SudokuSolverEffects;

  function setup(
    initialState: AppState = TestState.createTestAppState(),
  ): void {
    TestBed.configureTestingModule({
      providers: [
        SudokuSolverEffects,
        SudokuSolverService,
        ...SOLVER_TEST_PROVIDERS,
        provideMockStore({
          initialState: initialState,
        }),
        provideMockActions(() => actions$),
      ],
    });

    solver = TestBed.inject(SudokuSolverService);
    underTest = TestBed.inject(SudokuSolverEffects);
  }

  describe("scheduleNextStepOnStepResult$", () => {
    [
      {
        title: "should schedule the next step when running",
        status: "RUNNING" satisfies SolverExecution,
        expectedAction: SudokuSolverActions.stepExecute(),
      },
      {
        title: "should NOT schedule the next step when not started",
        status: "NOT_STARTED" satisfies SolverExecution,
        expectedAction: SudokuSolverActions.stepDoNothing(),
      },
      {
        title: "should NOT schedule the next step when paused",
        status: "PAUSED" satisfies SolverExecution,
        expectedAction: SudokuSolverActions.stepDoNothing(),
      },
      {
        title: "should NOT schedule the next step when done",
        status: "DONE" satisfies SolverExecution,
        expectedAction: SudokuSolverActions.stepDoNothing(),
      },
      {
        title: "should NOT schedule the next step when failed",
        status: "FAILED" satisfies SolverExecution,
        expectedAction: SudokuSolverActions.stepDoNothing(),
      },
    ].forEach((params) => {
      it(params.title, () => {
        // arrange
        const testState = TestState.createEmptyAppState();
        testState.sudokuSolver.executionInfo.status =
          params.status as SolverExecution;
        testState.sudokuSolver.settings.delay = 0;
        setup(testState);

        // https://stackoverflow.com/questions/77367841/how-to-unit-test-timer-observable-with-jasmine-marbels
        getTestScheduler().run(() => {
          // act
          actions$ = hot("a", {
            a: { type: SudokuSolverActions.stepResult.type },
          });

          // assert
          expect(underTest.scheduleNextStepOnStepResult$).toBeObservable(
            hot("r", { r: params.expectedAction }),
          );
        });
      });
    });
  });

  describe("executeNextStep$", () => {
    it("should call the solver", () => {
      // arrange
      const testState: AppState = TestState.createTestAppState();
      setup(testState);
      const spy = SudokuSolverSpy.onSolveNextStepAndReturnPreviousGrid(solver);
      expect(spy).not.toHaveBeenCalled();

      // act
      actions$ = hot("a", {
        a: { type: SudokuSolverActions.stepExecute.type },
      });

      // assert
      expect(underTest.executeNextStep$).toBeObservable(
        hot("r", {
          r: jasmine.objectContaining({
            type: SudokuSolverActions.stepResult.type,
          }),
        }),
      );
      expect(spy).toHaveBeenCalledOnceWith(testState.sudokuSolver.response);
    });

    it("should return the response from the solver", () => {
      // arrange
      const testState: AppState = TestState.createTestAppState();
      setup(testState);
      SudokuSolverSpy.onSolveNextStepAndReturnSuccess(solver);

      // act
      actions$ = hot("a", {
        a: { type: SudokuSolverActions.stepExecute.type },
      });

      // assert
      const expectedResponse = {
        status: "COMPLETE",
        stepId: "TEST",
        branches: [
          jasmine.objectContaining({
            grid: PuzzleSimple.PUZZLE_1.solution,
          } as Partial<SolverBranch>),
        ],
      };
      expect(underTest.executeNextStep$).toBeObservable(
        hot("r", {
          r: jasmine.objectContaining({
            type: SudokuSolverActions.stepResult.type,
            response: expectedResponse,
          }),
        }),
      );
      expect(testState.sudokuSolver.response.status).not.toEqual(
        expectedResponse.status,
      );
      expect(testState.sudokuSolver.response.stepId).not.toEqual(
        expectedResponse.stepId,
      );
    });

    it("should return the amount of opened branches", () => {
      // arrange
      const testState: AppState = TestState.createTestAppState();
      const initialBranch: SolverBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      testState.sudokuSolver.response = {
        branches: [initialBranch],
        status: "INCOMPLETE",
        stepId: "",
      };
      setup(testState);
      const secondBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
      const thirdBranch = secondBranch.openBranch({ row: 1, column: 1 }, 2);
      spyOn(solver, "solveNextStep").and.callFake(
        (response: SolverResponse) => {
          return {
            branches: [initialBranch, secondBranch, thirdBranch],
            status: "INCOMPLETE",
            stepId: response.stepId,
          } satisfies SolverResponse;
        },
      );

      // act
      actions$ = hot("a", {
        a: { type: SudokuSolverActions.stepExecute.type },
      });

      // assert
      expect(underTest.executeNextStep$).toBeObservable(
        hot("r", {
          r: jasmine.objectContaining({
            response: jasmine.objectContaining({
              branches: jasmine.arrayWithExactContents([
                initialBranch,
                secondBranch,
                thirdBranch,
              ]),
            }),
            numberOfNewBranchesCreated: 2,
          }),
        }),
      );
    });

    it("should NOT return a negative number if branches were closed", () => {
      // arrange
      const testState: AppState = TestState.createTestAppState();
      const initialBranch: SolverBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      const secondBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
      testState.sudokuSolver.response = {
        branches: [initialBranch, secondBranch],
        status: "INCOMPLETE",
        stepId: "",
      };
      setup(testState);
      spyOn(solver, "solveNextStep").and.callFake(
        (response: SolverResponse) => {
          return {
            branches: secondBranch.closeBranch([initialBranch, secondBranch]),
            status: "INCOMPLETE",
            stepId: response.stepId,
          } satisfies SolverResponse;
        },
      );

      // act
      actions$ = hot("a", {
        a: { type: SudokuSolverActions.stepExecute.type },
      });

      // assert
      expect(underTest.executeNextStep$).toBeObservable(
        hot("r", {
          r: jasmine.objectContaining({
            response: jasmine.objectContaining({
              branches: jasmine.arrayWithExactContents([initialBranch]),
            }),
            numberOfNewBranchesCreated: 0,
          }),
        }),
      );
    });
  });

  [
    {
      title: "should be done when the solver completes while running",
      state: { executionInfo: { status: "RUNNING" } },
      solver: "COMPLETE",
      expected: "DONE",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be done when the solver completes while paused",
      state: { executionInfo: { status: "PAUSED" } },
      solver: "COMPLETE",
      expected: "DONE",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be done when the solver completes while not started",
      state: { executionInfo: { status: "NOT_STARTED" } },
      solver: "COMPLETE",
      expected: "DONE",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should remain done when the solver completes while done",
      state: { executionInfo: { status: "DONE" } },
      solver: "COMPLETE",
      expected: "DONE",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be done when the solver completes while failed",
      state: { executionInfo: { status: "FAILED" } },
      solver: "COMPLETE",
      expected: "DONE",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be done when the solver completes - even if the max steps get reached",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "RUNNING" },
      },
      solver: "COMPLETE",
      expected: "DONE",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be failed when the solver fails while running",
      state: { executionInfo: { status: "RUNNING" } },
      solver: "FAILED",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be failed when the solver fails while paused",
      state: { executionInfo: { status: "PAUSED" } },
      solver: "FAILED",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be failed when the solver fails while not started",
      state: { executionInfo: { status: "NOT_STARTED" } },
      solver: "FAILED",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be failed when the solver fails while done",
      state: { executionInfo: { status: "DONE" } },
      solver: "FAILED",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should remain failed when the solver fails while failed",
      state: { executionInfo: { status: "FAILED" } },
      solver: "FAILED",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached while running and there is no solution",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "RUNNING" },
      },
      solver: "INCOMPLETE",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached while paused and there is no solution",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "PAUSED" },
      },
      solver: "INCOMPLETE",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached while not started and there is no solution",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "NOT_STARTED" },
      },
      solver: "INCOMPLETE",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached while running and the solution is unknown",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "RUNNING" },
      },
      solver: "UNKNOWN",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached while paused and the solution is unknown",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "PAUSED" },
      },
      solver: "UNKNOWN",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached while not started and the solution is unknown",
      state: {
        settings: { maxSteps: 10 },
        executionInfo: { stepsExecuted: 9, status: "NOT_STARTED" },
      },
      solver: "UNKNOWN",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should pause when running and the specified step to pause at is reached",
      state: {
        settings: { pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 9, status: "RUNNING" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain paused when paused and the specified step to pause at is reached",
      state: {
        settings: { pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 9, status: "PAUSED" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should be failed when the max steps get reached and they are equal to the step to be paused at",
      state: {
        settings: { maxSteps: 10, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 9 },
      },
      solver: "INCOMPLETE",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title: "should be failed when the max steps are exceeded",
      state: {
        settings: { maxSteps: 10, pauseAfterStep: 100 },
        executionInfo: { stepsExecuted: 11 },
      },
      solver: "INCOMPLETE",
      expected: "FAILED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain running if there is no solution and the current step is far below the specified thresholds",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 50 },
        executionInfo: { stepsExecuted: 1, status: "RUNNING" },
      },
      solver: "INCOMPLETE",
      expected: "RUNNING",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain running if there is no solution and the current step is above the step to be paused at",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 50, status: "RUNNING" },
      },
      solver: "INCOMPLETE",
      expected: "RUNNING",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain running if the solver status is unknown and the current step is far below the specified thresholds",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 50 },
        executionInfo: { stepsExecuted: 1, status: "RUNNING" },
      },
      solver: "UNKNOWN",
      expected: "RUNNING",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain running if the solver status is unknown and the current step is above the step to be paused at",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 50, status: "RUNNING" },
      },
      solver: "UNKNOWN",
      expected: "RUNNING",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain paused if there is no solution and the current step is far below the specified thresholds",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 50 },
        executionInfo: { stepsExecuted: 1, status: "PAUSED" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain paused if there is no solution and the current step is above the step to be paused at",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 50, status: "PAUSED" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain paused if the solver status is unknown and the current step is far below the specified thresholds",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 50 },
        executionInfo: { stepsExecuted: 1, status: "PAUSED" },
      },
      solver: "UNKNOWN",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should remain paused if the solver status is unknown and the current step is above the step to be paused at",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 50, status: "PAUSED" },
      },
      solver: "UNKNOWN",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should transition from 'not started' to 'paused' if there is no solution and the current step is far below the specified thresholds",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 50 },
        executionInfo: { stepsExecuted: 12, status: "NOT_STARTED" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should transition from 'not started' to 'paused' if solver status is unknown and the current step is far below the specified thresholds",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 50 },
        executionInfo: { stepsExecuted: 12, status: "NOT_STARTED" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should transition from 'not started' to 'paused' if there is no solution and the current step is above the step to be paused at",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 50, status: "NOT_STARTED" },
      },
      solver: "INCOMPLETE",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
    {
      title:
        "should transition from 'not started' to 'paused' if the solver status is unknown and the current step is above the step to be paused at",
      state: {
        settings: { maxSteps: 100, pauseAfterStep: 10 },
        executionInfo: { stepsExecuted: 50, status: "NOT_STARTED" },
      },
      solver: "UNKNOWN",
      expected: "PAUSED",
    } satisfies TestNextExecutionStatusParams,
  ].forEach((params: TestNextExecutionStatusParams) => {
    it(params.title, () => {
      // arrange
      const testState: AppState = TestState.createTestAppState();
      testState.sudokuSolver.response = {
        branches: [],
        status: testState.sudokuSolver.response.status,
        stepId: "TEST-STEP",
      };
      testState.sudokuSolver.executionInfo = {
        ...testState.sudokuSolver.executionInfo,
        ...(params.state?.executionInfo ?? {}),
      };
      testState.sudokuSolver.settings = {
        ...testState.sudokuSolver.settings,
        ...(params.state?.settings ?? {}),
      };
      setup(testState);
      spyOn(solver, "solveNextStep").and.callFake(
        () =>
          ({
            branches: [],
            status: params.solver,
            stepId: "TEST-STEP",
          }) satisfies SolverResponse,
      );

      // act
      actions$ = hot("a", {
        a: { type: SudokuSolverActions.stepExecute.type },
      });

      // assert
      expect(underTest.executeNextStep$).toBeObservable(
        hot("r", {
          r: jasmine.objectContaining({
            status: params.expected,
          }),
        }),
      );
    });
  });
});

interface TestNextExecutionStatusParams {
  title: string;
  state?: {
    executionInfo?: Partial<SudokuSolverStateExecutionInfo>;
    settings?: Partial<SudokuSolverStateSettings>;
  };
  solver: SolverResponseStatus;
  expected: SolverExecution;
}
