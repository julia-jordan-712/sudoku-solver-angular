import { TestBed } from "@angular/core/testing";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import {
  SudokuSolverActions,
  SudokuSolverActionStepResultExecutionStatus,
} from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { SOLVER_EXECUTION } from "@app/types/solver-execution";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { PuzzleExtreme } from "@test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@test/puzzles/puzzle-hard";
import { TestState } from "@test/state/test-state";

describe(SudokuSolverReducer.name, () => {
  let underTest: SudokuSolverReducer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    underTest = TestBed.inject(SudokuSolverReducer);
  });

  describe("an unknown action", () => {
    it("should return the previous state", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      expect(underTest.getReducer()(testState, {} as any)).toBe(testState);
    });
  });

  [SudokuSolverActions.stepDoNothing()].forEach((action) => {
    describe(action.type, () => {
      it("should return the previous state", () => {
        const testState: SudokuSolverState =
          TestState.createTestSudokuSolverState();
        expect(underTest.getReducer()(testState, action)).toBe(testState);
      });
    });
  });

  describe(SudokuPuzzleSolverSwitchActions.changePuzzle.type, () => {
    it("should set to hidden", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      testState.show = true;
      const action = SudokuPuzzleSolverSwitchActions.changePuzzle();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        show: false,
      });
      expect(result.show).not.toEqual(testState.show);
    });
  });

  describe(SudokuPuzzleSolverSwitchActions.submitPuzzle.type, () => {
    it("should set to shown", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      testState.show = false;
      const action = SudokuPuzzleSolverSwitchActions.submitPuzzle();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        show: true,
      });
      expect(result.show).not.toEqual(testState.show);
    });
  });

  describe(SudokuSolverActions.setDelay.type, () => {
    it("should set the delay to the value from the action", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      const action = SudokuSolverActions.setDelay({ delay: 123 });
      const expectedState: SudokuSolverState = {
        ...testState,
        settings: { ...testState.settings, delay: 123 },
      };

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual(expectedState);
      expect(result.settings.delay).not.toEqual(testState.settings.delay);
    });
  });

  describe(SudokuSolverActions.setInitialPuzzle.type, () => {
    const action = SudokuSolverActions.setInitialPuzzle({
      puzzle: PuzzleExtreme.PUZZLE_7.puzzle,
    });
    const testState: SudokuSolverState =
      TestState.createTestSudokuSolverState();

    beforeEach(() => {
      expect(testState.puzzle).not.toEqual(PuzzleExtreme.PUZZLE_7.puzzle);
      expect(testState.response.branches[0].grid).not.toEqual(
        PuzzleExtreme.PUZZLE_7.puzzle,
      );
      expect(testState.response.status).not.toEqual("UNKNOWN");
      expect(testState.response.stepId).not.toEqual("");
    });

    it("should set the puzzle to the value from the action", () => {
      expect(underTest.getReducer()(testState, action).puzzle).toEqual(
        PuzzleExtreme.PUZZLE_7.puzzle,
      );
    });

    it("should adapt the response to the value from the action", () => {
      const result: SudokuSolverState = underTest.getReducer()(
        testState,
        action,
      );

      expectResponseToBeResetTo(
        PuzzleExtreme.PUZZLE_7.puzzle,
        result,
        testState,
      );
    });

    it("should reset the execution info", () => {
      const result: SudokuSolverState = underTest.getReducer()(
        testState,
        action,
      );

      expectExecutionInfoToBeReset(result, testState);
    });

    it("should not change the settings", () => {
      expect(underTest.getReducer()(testState, action).settings).toEqual(
        testState.settings,
      );
    });
  });

  describe(SudokuSolverActions.setMaximumSteps.type, () => {
    it("should set the maximum steps to the value from the action", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      const action = SudokuSolverActions.setMaximumSteps({ maxSteps: 777 });
      const expectedState: SudokuSolverState = {
        ...testState,
        settings: { ...testState.settings, maxSteps: 777 },
      };

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual(expectedState);
      expect(result.settings.maxSteps).not.toEqual(testState.settings.maxSteps);
    });
  });

  describe(SudokuSolverActions.setNumberToBeHighlighted.type, () => {
    it("should set the number to be highlighted to the value from the action", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      const action = SudokuSolverActions.setNumberToBeHighlighted({
        highlight: 4,
      });
      const expectedState: SudokuSolverState = {
        ...testState,
        settings: { ...testState.settings, highlightNumber: 4 },
      };

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual(expectedState);
      expect(result.settings.highlightNumber).not.toEqual(
        testState.settings.highlightNumber,
      );
    });
  });

  describe(SudokuSolverActions.setStepToBePausedAfter.type, () => {
    it("should set the step to be paused after to the value from the action", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      const action = SudokuSolverActions.setStepToBePausedAfter({
        pauseStep: 987,
      });
      const expectedState: SudokuSolverState = {
        ...testState,
        settings: { ...testState.settings, pauseAfterStep: 987 },
      };

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual(expectedState);
      expect(result.settings.pauseAfterStep).not.toEqual(
        testState.settings.pauseAfterStep,
      );
    });
  });

  describe(SudokuSolverActions.solverCancel.type, () => {
    const testState: SudokuSolverState =
      TestState.createTestSudokuSolverState();
    const action = SudokuSolverActions.solverCancel();

    it("should clear the initial puzzle", () => {
      expect(underTest.getReducer()(testState, action).puzzle).toBeUndefined();
    });

    it("should clear the response", () => {
      expectResponseToBeCleared(
        underTest.getReducer()(testState, action),
        testState,
      );
    });

    it("should clear the execution status", () => {
      expectExecutionInfoToBeReset(
        underTest.getReducer()(testState, action),
        testState,
      );
    });

    it("should keep the settings unchanged", () => {
      expect(underTest.getReducer()(testState, action).settings).toEqual(
        testState.settings,
      );
    });
  });

  describe(SudokuSolverActions.solverPause.type, () => {
    it("should change only the execution status", () => {
      const testState: SudokuSolverState =
        TestState.createTestSudokuSolverState();
      testState.executionInfo.status = "RUNNING";

      const action = SudokuSolverActions.solverPause();

      expect(underTest.getReducer()(testState, action)).toEqual({
        ...testState,
        executionInfo: { ...testState.executionInfo, status: "PAUSED" },
      });
    });
  });

  describe(SudokuSolverActions.solverReset.type, () => {
    const testState: SudokuSolverState =
      TestState.createTestSudokuSolverState();
    const action = SudokuSolverActions.solverReset();

    it("should clear the initial puzzle", () => {
      expect(underTest.getReducer()(testState, action).puzzle).toBeUndefined();
    });

    it("should clear the response", () => {
      expectResponseToBeCleared(
        underTest.getReducer()(testState, action),
        testState,
      );
    });

    it("should clear the execution status", () => {
      expectExecutionInfoToBeReset(
        underTest.getReducer()(testState, action),
        testState,
      );
    });

    it("should keep the settings unchanged", () => {
      expect(underTest.getReducer()(testState, action).settings).toEqual(
        testState.settings,
      );
    });
  });

  describe(SudokuSolverActions.solverRestart.type, () => {
    const testState: SudokuSolverState = TestState.createTestSudokuSolverState(
      PuzzleHard.PUZZLE_3.puzzle,
    );
    const action = SudokuSolverActions.solverRestart();

    it("should clear the execution status", () => {
      expectExecutionInfoToBeReset(
        underTest.getReducer()(testState, action),
        testState,
      );
    });

    it("should reset the response to the initial puzzle", () => {
      const result = underTest.getReducer()(testState, action);

      expect(result.puzzle).toEqual(PuzzleHard.PUZZLE_3.puzzle);
      expectResponseToBeResetTo(PuzzleHard.PUZZLE_3.puzzle, result, testState);
    });

    it("should keep the settings unchanged", () => {
      expect(underTest.getReducer()(testState, action).settings).toEqual(
        testState.settings,
      );
    });
  });

  describe(SudokuSolverActions.solverStart.type, () => {
    const testState: SudokuSolverState =
      TestState.createTestSudokuSolverState();
    testState.executionInfo = {
      status: "NOT_STARTED",
      time: { started: null, stopped: null, lastStep: null },
      amountOfBranches: 7,
      id: "my-execution-id",
      stepsExecuted: 238,
    };

    it("should change the execution status", () => {
      expect(testState.executionInfo.status).not.toEqual("RUNNING");
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.solverStart())
          .executionInfo.status,
      ).toEqual("RUNNING");
    });

    it(`should not start the timer because that is handled by '${SudokuSolverActions.stepExecute.type}' because it is also possible to execute the first step while paused`, () => {
      expect(testState.executionInfo.time).toEqual({
        started: null,
        stopped: null,
        lastStep: null,
      });

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.solverStart(),
      );

      expect(result.executionInfo.time.started).toBeNull();
      expect(result.executionInfo.time.stopped).toBeNull();
      expect(result.executionInfo.time.lastStep).toBeNull();
    });

    it("should not change the execution info regarding branches and steps", () => {
      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.solverStart(),
      );

      expect(result.executionInfo.id).toEqual(testState.executionInfo.id);
      expect(result.executionInfo.amountOfBranches).toEqual(
        testState.executionInfo.amountOfBranches,
      );
      expect(result.executionInfo.stepsExecuted).toEqual(
        testState.executionInfo.stepsExecuted,
      );
    });

    it("should keep the settings unchanged", () => {
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.solverStart())
          .settings,
      ).toEqual(testState.settings);
    });

    it("should keep the puzzle unchanged", () => {
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.solverStart())
          .puzzle,
      ).toEqual(testState.puzzle);
    });

    it("should keep the response unchanged", () => {
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.solverStart())
          .response,
      ).toEqual(testState.response);
    });
  });

  describe(SudokuSolverActions.stepExecute.type, () => {
    const testState: SudokuSolverState =
      TestState.createTestSudokuSolverState();
    testState.executionInfo = {
      status: "NOT_STARTED",
      time: { started: null, stopped: null, lastStep: null },
      amountOfBranches: 7,
      id: "my-execution-id",
      stepsExecuted: 238,
    };

    SOLVER_EXECUTION.forEach((executionStatus) => {
      it(`should not change the execution status ${executionStatus}`, () => {
        testState.executionInfo.status = executionStatus;
        expect(
          underTest.getReducer()(testState, SudokuSolverActions.stepExecute())
            .executionInfo.status,
        ).toEqual(executionStatus);
      });
    });

    it("should start the timer - if it is not started yet", () => {
      testState.executionInfo.time.started = null;

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepExecute(),
      );

      expect(result.executionInfo.time.started).not.toBeNull();
      expect(result.executionInfo.time.stopped).toBeNull();
      expect(result.executionInfo.time.lastStep).toBeNull();
    });

    it("should leave the timer unchanged - if it is started", () => {
      testState.executionInfo.time.started = 123456;

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepExecute(),
      );

      expect(result.executionInfo.time.started).toEqual(123456);
      expect(result.executionInfo.time.stopped).toBeNull();
      expect(result.executionInfo.time.lastStep).toBeNull();
    });

    it("should not change the execution info regarding branches and steps", () => {
      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepExecute(),
      );

      expect(result.executionInfo.id).toEqual(testState.executionInfo.id);
      expect(result.executionInfo.amountOfBranches).toEqual(
        testState.executionInfo.amountOfBranches,
      );
      expect(result.executionInfo.stepsExecuted).toEqual(
        testState.executionInfo.stepsExecuted,
      );
    });

    it("should keep the settings unchanged", () => {
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.stepExecute())
          .settings,
      ).toEqual(testState.settings);
    });

    it("should keep the puzzle unchanged", () => {
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.stepExecute())
          .puzzle,
      ).toEqual(testState.puzzle);
    });

    it("should keep the response unchanged", () => {
      expect(
        underTest.getReducer()(testState, SudokuSolverActions.stepExecute())
          .response,
      ).toEqual(testState.response);
    });
  });

  describe(SudokuSolverActions.stepResult.type, () => {
    const testState: SudokuSolverState = TestState.createTestSudokuSolverState(
      PuzzleHard.PUZZLE_3.puzzle,
    );
    const emptySolverResponse: SolverResponse = {
      status: "UNKNOWN",
      stepId: "",
      branches: [],
    };

    it("should set the response to the one from the action", () => {
      testState.response = emptySolverResponse;
      const initialBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      const currentBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
      const newResponse: SolverResponse = {
        status: "INCOMPLETE",
        stepId: "my-test-step-id",
        branches: [initialBranch, currentBranch],
      };

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepResult({
          response: newResponse,
          numberOfNewBranchesCreated: 0,
          status: "RUNNING",
        }),
      );

      expect(result.response).toEqual(newResponse);
    });

    it("should copy the grid from the current branch of the response", () => {
      const initialBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      const currentBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
      const response: SolverResponse = {
        status: "INCOMPLETE",
        stepId: "my-test-step-id",
        branches: [initialBranch, currentBranch],
      };
      testState.response = response;
      testState.previousCurrentGrid = undefined;
      expect(testState.previousCurrentGrid).toBeUndefined();

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepResult({
          response: emptySolverResponse,
          numberOfNewBranchesCreated: 0,
          status: "RUNNING",
        }),
      );

      expect(result.previousCurrentGrid).toEqual(currentBranch.grid);
    });

    describe("timer", () => {
      ["RUNNING", "PAUSED", "DONE", "FAILED"].forEach((executionStatus) => {
        it(`should update the time of the last step (for ${executionStatus})`, () => {
          testState.executionInfo.time = {
            started: null,
            stopped: null,
            lastStep: null,
          };

          expect(
            underTest.getReducer()(
              testState,
              SudokuSolverActions.stepResult({
                response: emptySolverResponse,
                numberOfNewBranchesCreated: 0,
                status:
                  executionStatus as SudokuSolverActionStepResultExecutionStatus,
              }),
            ).executionInfo.time.lastStep,
          ).not.toBeNull();
        });

        it(`should NOT update the 'started' time (for ${executionStatus})`, () => {
          testState.executionInfo.time = {
            started: 36424,
            stopped: null,
            lastStep: null,
          };

          expect(
            underTest.getReducer()(
              testState,
              SudokuSolverActions.stepResult({
                response: emptySolverResponse,
                numberOfNewBranchesCreated: 0,
                status:
                  executionStatus as SudokuSolverActionStepResultExecutionStatus,
              }),
            ).executionInfo.time.started,
          ).toEqual(36424);
        });
      });

      ["RUNNING", "PAUSED"].forEach((runningStatus) => {
        it(`should NOT stop while running with status ${runningStatus}`, () => {
          testState.executionInfo.time = {
            started: null,
            stopped: null,
            lastStep: null,
          };

          expect(
            underTest.getReducer()(
              testState,
              SudokuSolverActions.stepResult({
                response: emptySolverResponse,
                numberOfNewBranchesCreated: 0,
                status:
                  runningStatus as SudokuSolverActionStepResultExecutionStatus,
              }),
            ).executionInfo.time.stopped,
          ).toBeNull();
        });
      });

      ["DONE", "FAILED"].forEach((stopStatus) => {
        it(`should stop when stopping with status ${stopStatus}`, () => {
          testState.executionInfo.time = {
            started: null,
            stopped: null,
            lastStep: null,
          };

          expect(
            underTest.getReducer()(
              testState,
              SudokuSolverActions.stepResult({
                response: emptySolverResponse,
                numberOfNewBranchesCreated: 0,
                status:
                  stopStatus as SudokuSolverActionStepResultExecutionStatus,
              }),
            ).executionInfo.time.stopped,
          ).not.toBeNull();
        });
      });
    });

    ["RUNNING", "PAUSED", "DONE", "FAILED"].forEach((executionStatus) => {
      const action = SudokuSolverActions.stepResult({
        response: emptySolverResponse,
        numberOfNewBranchesCreated: 0,
        status: executionStatus as SudokuSolverActionStepResultExecutionStatus,
      });

      it(`should set the execution status to ${executionStatus} from the action`, () => {
        testState.executionInfo.status = "NOT_STARTED";
        expect(
          underTest.getReducer()(testState, action).executionInfo.status,
        ).toEqual(executionStatus);
      });

      it(`should not change the execution id (for execution status ${executionStatus})`, () => {
        expect(
          underTest.getReducer()(testState, action).executionInfo.id,
        ).toEqual(testState.executionInfo.id);
      });
    });

    it("should increase the amount of steps by one", () => {
      testState.executionInfo.stepsExecuted = 8;

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepResult({
          response: emptySolverResponse,
          numberOfNewBranchesCreated: 3,
          status: "RUNNING",
        }),
      );

      expect(result.executionInfo.stepsExecuted).toEqual(9);
    });

    it("should increase the amount of branches by the new created branches from the response", () => {
      testState.executionInfo.amountOfBranches = 4;

      const result = underTest.getReducer()(
        testState,
        SudokuSolverActions.stepResult({
          response: emptySolverResponse,
          numberOfNewBranchesCreated: 2,
          status: "RUNNING",
        }),
      );

      expect(result.executionInfo.amountOfBranches).toEqual(6);
    });

    it("should keep the puzzle unchanged", () => {
      expect(
        underTest.getReducer()(
          testState,
          SudokuSolverActions.stepResult({
            response: emptySolverResponse,
            numberOfNewBranchesCreated: 0,
            status: "RUNNING",
          }),
        ).puzzle,
      ).toEqual(testState.puzzle);
    });

    it("should keep the settings unchanged", () => {
      expect(
        underTest.getReducer()(
          testState,
          SudokuSolverActions.stepResult({
            response: emptySolverResponse,
            numberOfNewBranchesCreated: 0,
            status: "RUNNING",
          }),
        ).settings,
      ).toEqual(testState.settings);
    });
  });

  function expectExecutionInfoToBeReset(
    result: SudokuSolverState,
    testState: SudokuSolverState,
  ): void {
    expect(result.executionInfo).not.toEqual(testState.executionInfo);
    expect(result.executionInfo.amountOfBranches).toEqual(1);
    expect(result.executionInfo.status).toEqual("NOT_STARTED");
    expect(result.executionInfo.stepsExecuted).toEqual(0);
    expect(result.executionInfo.time).toEqual({
      started: null,
      stopped: null,
      lastStep: null,
    });
  }

  function expectResponseToBeCleared(
    result: SudokuSolverState,
    testState: SudokuSolverState,
  ): void {
    expect(result.response).not.toEqual(testState.response);
    expect(result.response.branches.length).toEqual(0);
    expect(result.response.status).toEqual("UNKNOWN");
    expect(result.response.stepId).toEqual("");
  }

  function expectResponseToBeResetTo(
    grid: SudokuGrid,
    result: SudokuSolverState,
    testState: SudokuSolverState,
  ): void {
    expect(result.response).not.toEqual(testState.response);
    expect(result.response.branches.length).toEqual(1);
    expect(result.response.branches[0].grid).toEqual(grid);
    expect(result.response.status).toEqual("UNKNOWN");
    expect(result.response.stepId).toEqual("");
  }
});
