import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";

describe("SudokuSolver Selectors", () => {
  it("should select the feature state", () => {
    const result: SudokuSolverState = SudokuSolverSelectors.selectState({
      [SudokuSolverReducer.featureKey]: {},
    });

    expect(result).toEqual({} as SudokuSolverState);
  });
});
