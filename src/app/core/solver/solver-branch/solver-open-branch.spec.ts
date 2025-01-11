import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "src/test/puzzles/puzzle-4x4";
import { SolverOpenBranch } from "./solver-open-branch";

describe(SolverOpenBranch.name, () => {
  let underTest: SolverOpenBranch;

  beforeEach(() => {
    underTest = new SolverOpenBranch();
  });

  it("should do nothing if the last step did not fail", () => {
    const branches: SolverBranch[] = [
      SolverBranch.createInitialBranch(Puzzle4x4.INCOMPLETE_ALL_VALUES),
    ];

    const result: SolverResponse = underTest.executeNextStep({
      branches: branches,
      status: "INCOMPLETE",
      stepId: "",
    });

    expect(result.status).toEqual("FAILED");
    expect(result.branches).toBe(branches);
  });

  it("should do nothing if there is no current branch", () => {
    const result: SolverResponse = underTest.executeNextStep({
      branches: [],
      status: "FAILED",
      stepId: "",
    });

    expect(result.status).toEqual("FAILED");
    expect(result.branches).toEqual([]);
  });

  it("should do nothing if no branching point can be found", () => {
    const branches: SolverBranch[] = [
      SolverBranch.createInitialBranch(Puzzle4x4.EMPTY),
    ];

    const result: SolverResponse = underTest.executeNextStep({
      branches: branches,
      status: "FAILED",
      stepId: "",
    });

    expect(result.status).toEqual("FAILED");
    expect(result.branches).toEqual(branches);
  });

  it("should not find a branching point if there is only one value possible in a cell", () => {
    const initialGrid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.EMPTY);
    initialGrid[0][0] = [1];
    const branches: SolverBranch[] = [
      SolverBranch.createInitialBranch(initialGrid),
    ];

    const result: SolverResponse = underTest.executeNextStep({
      branches: branches,
      status: "FAILED",
      stepId: "",
    });

    expect(result.status).toEqual("FAILED");
    expect(result.branches).toEqual(branches);
  });

  [
    {
      title: "should open a new branch at the only possible branching point",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      modifySudoku: (grid: SudokuGrid) => {
        grid[2][1] = [1, 2, 3, 4];
      },
      expected: { row: 2, column: 1, value: 1 },
    },
    {
      title: "should open a new branch at the first possible branching point",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      modifySudoku: (grid: SudokuGrid) => {
        grid[1][1] = [1, 2, 3, 4];
        grid[1][2] = [1, 2, 3, 4];
      },
      expected: { row: 1, column: 1, value: 1 },
    },
    {
      title:
        "should use the first possible value at the branching point as branching value",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      modifySudoku: (grid: SudokuGrid) => {
        grid[3][3] = [3, 2, 4, 1];
      },
      expected: { row: 3, column: 3, value: 3 },
    },
    {
      title:
        "should prefer pairs over triples etc when looking for the branching point",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      modifySudoku: (grid: SudokuGrid) => {
        grid[0][0] = [1, 2, 3, 4];
        grid[1][1] = [2, 3, 4];
        grid[2][2] = [3, 4];
      },
      expected: { row: 2, column: 2, value: 3 },
    },
  ].forEach((params) => {
    it(params.title, () => {
      const initialGrid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
      params.modifySudoku(initialGrid);
      const initialBranch = SolverBranch.createInitialBranch(initialGrid);

      const result: SolverResponse = underTest.executeNextStep({
        branches: [initialBranch],
        status: "FAILED",
        stepId: "",
      });

      expect(result.status).toEqual("INCOMPLETE");
      const expectedGrid: SudokuGrid = SudokuGridUtil.clone(initialGrid);
      // create expected grid from expected branching point and value
      expectedGrid[params.expected.row][params.expected.column] =
        params.expected.value;
      expect(result.branches.length).toEqual(2);
      expect(result.branches[0].getId()).toEqual(initialBranch.getId());
      expect(result.branches[1].getId()).not.toEqual(initialBranch.getId());
      expect(result.branches[1].grid).toEqual(expectedGrid);
    });
  });
});
