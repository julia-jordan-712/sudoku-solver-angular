import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";

describe(SudokuPuzzleReducer.name, () => {
  describe("an unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result: SudokuPuzzleState = SudokuPuzzleReducer.reducer(
        SudokuPuzzleReducer.initialState,
        action,
      );

      expect(result).toBe(SudokuPuzzleReducer.initialState);
    });
  });
});
