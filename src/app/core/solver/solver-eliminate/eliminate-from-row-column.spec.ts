import { EliminateFromRowOrColumn } from "@app/core/solver/solver-eliminate/eliminate-from-row-column";
import { SolverEliminateUtil } from "@app/core/solver/solver-eliminate/solver-eliminate-util";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGrid } from "@app/types/sudoku-grid";

describe(EliminateFromRowOrColumn.name, () => {
  const all = [1, 2, 3, 4];

  [
    ...SolverEliminateUtil.commonTestData(),
    {
      title: "should eliminate from row/column based on square",
      input: [
        [[1], 2, 3, [4]],
        [3, 4, 1, 2],
        [[1, 2], 3, [2, 4], [1, 4]],
        [all, all, all, all],
      ],
      expected: [
        [[1], 2, 3, [4]],
        [3, 4, 1, 2],
        [[2], 3, [2, 4], [1, 4]],
        [[2, 3, 4], all, all, all],
      ],
      changed: true,
    },
  ].forEach((params) => {
    it(params.title, () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(params.input);
      expect(new EliminateFromRowOrColumn().run(grid)).toEqual(params.changed);
      expect(grid).toEqual(params.expected);
    });
  });
});
