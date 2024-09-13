import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";

describe(SudokuSolverReducer.name, () => {
  describe("an unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result: SudokuSolverState = SudokuSolverReducer.reducer(
        SudokuSolverReducer.initialState,
        action,
      );

      expect(result).toBe(SudokuSolverReducer.initialState);
    });
  });
});
