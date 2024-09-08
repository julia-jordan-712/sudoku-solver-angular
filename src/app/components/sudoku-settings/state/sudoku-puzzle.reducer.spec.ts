import { SudokuPuzzleReducer } from "@app/components/sudoku-settings/state/sudoku-puzzle.reducer";

describe(SudokuPuzzleReducer.name, () => {
  describe("an unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result = SudokuPuzzleReducer.reducer(
        SudokuPuzzleReducer.initialState,
        action,
      );

      expect(result).toBe(SudokuPuzzleReducer.initialState);
    });
  });
});
