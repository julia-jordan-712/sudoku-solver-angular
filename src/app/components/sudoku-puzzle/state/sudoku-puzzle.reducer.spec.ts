import { TestBed } from "@angular/core/testing";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
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

  describe(SudokuPuzzleActions.changeSettings.type, () => {
    it("should set to unconfirmed", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.isConfirmed = true;
      const action = SudokuPuzzleActions.changeSettings();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        isConfirmed: false,
      });
      expect(result.isConfirmed).not.toEqual(testState.isConfirmed);
    });
  });

  describe(SudokuPuzzleActions.clearSelectedOption.type, () => {
    it("should set the selected option to undefined", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.selectionOptions.selected =
        SudokuPuzzleSelectionTestData.NO_SELECTION_ITEM;
      const action = SudokuPuzzleActions.clearSelectedOption();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        selectionOptions: {
          ...testState.selectionOptions,
          selected: undefined,
        },
      });
      expect(result.selectionOptions.selected).not.toEqual(
        testState.selectionOptions.selected,
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

  describe(SudokuPuzzleActions.submitSettings.type, () => {
    it("should set to confirmed", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.isConfirmed = false;
      const action = SudokuPuzzleActions.submitSettings();

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        isConfirmed: true,
      });
      expect(result.isConfirmed).not.toEqual(testState.isConfirmed);
    });
  });

  describe(SudokuPuzzleActions.userSetSelectedOption.type, () => {
    it("should set the selected option to the value from the action", () => {
      const testState: SudokuPuzzleState =
        TestState.createTestSudokuPuzzleState();
      testState.selectionOptions.selected =
        SudokuPuzzleSelectionTestData.NO_SELECTION_ITEM;
      const action = SudokuPuzzleActions.userSetSelectedOption({
        option: SudokuPuzzleSelectionTestData.ITEMS[2],
      });

      const result = underTest.getReducer()(testState, action);

      expect(result).toEqual({
        ...testState,
        selectionOptions: {
          ...testState.selectionOptions,
          selected: SudokuPuzzleSelectionTestData.ITEMS[2],
        },
      });
      expect(result.selectionOptions.selected).not.toEqual(
        testState.selectionOptions.selected,
      );
      expect(result.selectionOptions.options.length).toBeGreaterThan(0);
    });
  });
});
