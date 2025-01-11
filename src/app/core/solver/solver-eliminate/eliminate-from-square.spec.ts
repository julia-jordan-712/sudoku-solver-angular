import { EliminateFromSquare } from "@app/core/solver/solver-eliminate/eliminate-from-square";
import { SolverEliminateUtil } from "@app/core/solver/solver-eliminate/solver-eliminate-util";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGrid } from "@app/types/sudoku-grid";

describe(EliminateFromSquare.name, () => {
  const all = [1, 2, 3, 4];

  [
    ...SolverEliminateUtil.commonTestData(),
    {
      title: "should eliminate from square based on row/column",
      input: [
        [[1], 2, 3, [4]],
        [3, 4, 1, 2],
        [[1, 2], 3, [2, 4], [1, 4]],
        [all, all, all, all],
      ],
      expected: [
        [[1], 2, 3, [4]],
        [3, 4, 1, 2],
        [[1, 2], 3, [2, 4], [1, 4]],
        [all, [1, 3, 4], all, all],
      ],
      changed: true,
    },
  ].forEach((params) => {
    it(params.title, () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(params.input);
      expect(new EliminateFromSquare().run(grid)).toEqual(params.changed);
      expect(grid).toEqual(params.expected);
    });
  });
});
