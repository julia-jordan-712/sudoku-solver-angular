import { TestBed } from "@angular/core/testing";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import {
  SudokuDropdownSelectionItem,
  SudokuPuzzleState,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { TestState } from "@app/test/state/test-state";

describe(SudokuPuzzleReducer.name, () => {
  let underTest: SudokuPuzzleReducer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    underTest = TestBed.inject(SudokuPuzzleReducer);
  });

  describe("an unknown action", () => {
    it("should return the previous state", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      expect(underTest.getReducer()(testState, {} as any)).toBe(testState);
    });
  });

  [SudokuPuzzleActions.userChangeSize({ height: 7, width: 7 })].forEach(
    (action) => {
      describe(action.type, () => {
        it("should return the previous state", () => {
          const testState: SudokuPuzzleState =
            TestState.createTestSudokuPuzzleState();
          expect(underTest.getReducer()(testState, action)).toBe(testState);
        });
      });
    },
  );

  describe(SudokuPuzzleSolverSwitchActions.changePuzzle.type, () => {
    it("should set to shown", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.show = false;
      const action = SudokuPuzzleSolverSwitchActions.changePuzzle();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        show: true,
      });
      expect(result.show).not.toEqual(testState.show);
    });
  });

  describe(SudokuPuzzleActions.clearSelectedOption.type, () => {
    it("should set the selected option to undefined", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.selectionOptions.selectedId = undefined;
      const action = SudokuPuzzleActions.clearSelectedOption();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        selectionOptions: {
          ...testState.selectionOptions,
          selectedId: null,
        },
      });
      expect(result.selectionOptions.selectedId).not.toEqual(
        testState.selectionOptions.selectedId,
      );
      expect(result.selectionOptions.options.length).toBeGreaterThan(0);
    });
  });

  describe(SudokuPuzzleActions.setSize.type, () => {
    it("should set the width and height to the value from the action", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.height = 3;
      testState.width = 2;
      const action = SudokuPuzzleActions.setSize({ height: 4, width: 4 });

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        height: 4,
        width: 4,
      });
      expect(result.height).not.toEqual(testState.height);
      expect(result.width).not.toEqual(testState.width);
    });

    it("should keep height and width if action does not specify it", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.height = 3;
      testState.width = 2;
      const action = SudokuPuzzleActions.setSize({});

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        height: 3,
        width: 2,
      });
      expect(result.height).toEqual(testState.height);
      expect(result.width).toEqual(testState.width);
    });
  });

  describe(SudokuPuzzleActions.setSudoku.type, () => {
    [null, undefined, Puzzle4x4.COMPLETE].forEach((sudoku) => {
      it(`should set sudoku to ${JSON.stringify(sudoku)}`, () => {
        const testState: SudokuPuzzleState =
          TestState.createTestSudokuPuzzleState();
        testState.sudoku = Puzzle4x4.INCOMPLETE_ALL_VALUES;
        const action = SudokuPuzzleActions.setSudoku({ sudoku: sudoku });

        const result = underTest.getReducer()(testState, action);

        expect(result).toEqual({
          ...testState,
          sudoku: sudoku,
        });
        expect(result.sudoku).not.toEqual(testState.sudoku);
      });
    });
  });

  describe(SudokuPuzzleSolverSwitchActions.submitPuzzle.type, () => {
    it("should set to hidden", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.show = true;
      const action = SudokuPuzzleSolverSwitchActions.submitPuzzle();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        show: false,
      });
      expect(result.show).not.toEqual(testState.show);
    });
  });

  describe(SudokuPuzzleActions.userSetSelectedOption.type, () => {
    it("should set the selected option to the value from the action", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.selectionOptions.selectedId = undefined;
      const newSelectionItem: SudokuDropdownSelectionItem = {
        id: "Puzzle4x4.COMPLETE",
        i18nKey: { key: "PUZZLE.4x4.COMPLETE" },
        data: Puzzle4x4.COMPLETE,
      };
      const action = SudokuPuzzleActions.userSetSelectedOption({
        option: newSelectionItem,
      });

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        selectionOptions: {
          ...testState.selectionOptions,
          selectedId: newSelectionItem.id,
        },
      });
      expect(result.selectionOptions.selectedId).not.toEqual(
        testState.selectionOptions.selectedId,
      );
      expect(result.selectionOptions.options.length).toBeGreaterThan(0);
    });
  });
});
