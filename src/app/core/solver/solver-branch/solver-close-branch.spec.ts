import { TestBed } from "@angular/core/testing";
import { SolverCloseBranch } from "@app/core/solver/solver-branch/solver-close-branch";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";
import { Puzzle4x4 } from "src/test/puzzles/puzzle-4x4";

describe(SolverCloseBranch.name, () => {
  let underTest: SolverCloseBranch;
  let verifyService: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    underTest = TestBed.inject(SolverCloseBranch);
    verifyService = TestBed.inject(VerifySolutionService);
    spyOn(verifyService, "verify").and.callThrough();
  });

  it("should do nothing if there is no current branch", () => {
    const result: SolverResponse = underTest.executeNextStep({
      branches: [],
      status: "INCOMPLETE",
      stepId: "",
    });

    expect(result.status).toEqual("FAILED");
    expect(result.branches).toEqual([]);
  });

  it("should do nothing if the current branch is valid", () => {
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

  [
    {
      title: "the Sudoku contains duplicate values",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      makeSudokuInvalid: (grid: SudokuGrid) => {
        grid[1][0] = 1;
        grid[1][1] = 1;
      },
    },
    {
      title: "a cell is undefined",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      makeSudokuInvalid: (grid: SudokuGrid) => {
        grid[2][1] = undefined;
      },
    },
    {
      title: "a cell contains no possible values anymore",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      makeSudokuInvalid: (grid: SudokuGrid) => {
        grid[2][1] = [];
      },
    },
  ].forEach((params) => {
    it(`should close current branch if ${params.title}`, () => {
      const initialBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      const secondBranch = initialBranch.openBranch({ row: 0, column: 0 }, 2);
      params.makeSudokuInvalid(secondBranch.grid);

      const result: SolverResponse = underTest.executeNextStep({
        branches: [initialBranch, secondBranch],
        status: "INCOMPLETE",
        stepId: "",
      });

      expect(result.status).toEqual("INCOMPLETE");
      const expectedGrid: SudokuGrid = SudokuGridUtil.clone(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      // remove branching value from branching point
      expectedGrid[0][0] = [1, 3, 4];
      expect(result.branches.length).toEqual(1);
      expect(result.branches[0].getId()).toEqual(initialBranch.getId());
      expect(result.branches[0].grid).toEqual(expectedGrid);
      expect(verifyService.verify).toHaveBeenCalledOnceWith(secondBranch.grid, {
        size: 4,
        allowEmptyCells: false,
      });
    });
  });
});
