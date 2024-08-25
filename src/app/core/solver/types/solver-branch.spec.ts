import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";

describe(SolverBranch.name, () => {
  describe("initial branch", () => {
    const branch: SolverBranch = SolverBranch.createInitialBranch(
      PuzzleAdvanced.PUZZLE_3.puzzle,
    );

    it("should contain the passed grid", () => {
      expect(branch.grid).toEqual(PuzzleAdvanced.PUZZLE_3.puzzle);
    });

    it("should not reuse the reference of the referenced grid but copy it", () => {
      expect(branch.grid).toEqual(PuzzleAdvanced.PUZZLE_3.puzzle);
      expect(branch.grid).not.toBe(PuzzleAdvanced.PUZZLE_3.puzzle);
    });

    it("should be the initial branch", () => {
      expect(branch.isInitialBranch()).toBeTrue();
    });

    it("should be the current branch", () => {
      expect(branch.isCurrentBranch()).toBeTrue();
    });

    it("should have an id", () => {
      expect(branch.getId()).toBeDefined();
    });

    it("should not have any parent", () => {
      expect(branch.getParentId()).toBeUndefined();
    });

    it("should not have any child", () => {
      expect(branch.getChildId()).toBeUndefined();
    });
  });

  describe("open branch", () => {
    describe("success", () => {
      let initialBranch: SolverBranch;
      let newBranch: SolverBranch;

      beforeEach(() => {
        initialBranch = SolverBranch.createInitialBranch(
          Puzzle4x4.INCOMPLETE_ALL_VALUES,
        );
        newBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
      });

      it("should differ only in the branching point", () => {
        expect(initialBranch.grid).toEqual(Puzzle4x4.INCOMPLETE_ALL_VALUES);

        const expectedNewBranchGrid = SudokuGridUtil.clone(
          Puzzle4x4.INCOMPLETE_ALL_VALUES,
        );
        expectedNewBranchGrid[0][0] = 1;
        expect(newBranch.grid).toEqual(expectedNewBranchGrid);
      });

      it("should not modify the grid of the branches directly but replace them", () => {
        expect(initialBranch.grid).toEqual(Puzzle4x4.INCOMPLETE_ALL_VALUES);
        expect(initialBranch.grid).not.toBe(Puzzle4x4.INCOMPLETE_ALL_VALUES);

        const expectedNewBranchGrid = SudokuGridUtil.clone(
          Puzzle4x4.INCOMPLETE_ALL_VALUES,
        );
        expectedNewBranchGrid[0][0] = 1;
        expect(newBranch.grid).toEqual(expectedNewBranchGrid);
        expect(newBranch.grid).not.toBe(expectedNewBranchGrid);
        expect(newBranch.grid).not.toBe(Puzzle4x4.INCOMPLETE_ALL_VALUES);
      });

      it("should mark the new branch as 'open'", () => {
        expect(initialBranch.isOpenBranch()).toBeTrue();
        expect(initialBranch.isClosedBranch()).toBeFalse();
        expect(newBranch.isOpenBranch()).toBeTrue();
        expect(newBranch.isClosedBranch()).toBeFalse();
      });

      it("should make the new branch the current branch", () => {
        expect(initialBranch.isCurrentBranch()).toBeFalse();
        expect(newBranch.isCurrentBranch()).toBeTrue();
      });

      it("should not change which branch is the initial branch", () => {
        expect(initialBranch.isInitialBranch()).toBeTrue();
        expect(newBranch.isInitialBranch()).toBeFalse();
      });

      it("should have different ids", () => {
        expect(initialBranch.getId()).not.toEqual(newBranch.getId());
      });

      it("should reference each other", () => {
        expect(initialBranch.getChildId()).toEqual(newBranch.getId());
        expect(newBranch.getParentId()).toEqual(initialBranch.getId());
      });
    });

    describe("failure", () => {
      let initialBranch: SolverBranch;

      beforeEach(() => {
        initialBranch = SolverBranch.createInitialBranch(
          Puzzle4x4.INCOMPLETE_ALL_VALUES,
        );
      });

      it("should not open a branch from the same branch twice until the current child has been closed", () => {
        const secondBranch: SolverBranch = initialBranch.openBranch(
          { row: 0, column: 0 },
          1,
        );
        expect(() =>
          initialBranch.openBranch({ row: 1, column: 1 }, 2),
        ).toThrowError();

        secondBranch.closeBranch([initialBranch, secondBranch]);
        expect(() =>
          initialBranch.openBranch({ row: 1, column: 1 }, 2),
        ).not.toThrowError();
      });

      it("should not open a branch from a closed branch", () => {
        const secondBranch: SolverBranch = initialBranch.openBranch(
          { row: 0, column: 0 },
          1,
        );
        secondBranch.closeBranch([initialBranch, secondBranch]);
        expect(() =>
          secondBranch.openBranch({ row: 1, column: 1 }, 2),
        ).toThrowError();
      });

      it("should not open a branch if the branching point does not contain multiple possible values", () => {
        const completeBranch: SolverBranch = SolverBranch.createInitialBranch(
          Puzzle4x4.COMPLETE,
        );
        expect(() =>
          completeBranch.openBranch({ row: 0, column: 0 }, 1),
        ).toThrowError();
      });

      it("should not open a branch if the branching value is not contained in the possible values of the branching point", () => {
        const branch: SolverBranch = SolverBranch.createInitialBranch([
          [[1, 2, 4], 2, 3, 4],
          [3, 4, 1, 2],
          [2, 3, 4, 1],
          [4, 1, 2, 3],
        ]);
        expect(() =>
          branch.openBranch({ row: 0, column: 0 }, 3),
        ).toThrowError();
      });

      it("should not open a branch if the row of the branching point is invalid based on the size of Sudoku grid", () => {
        expect(() =>
          initialBranch.openBranch({ row: 1000, column: 0 }, 1),
        ).toThrowError();
      });

      it("should not open a branch if the column of the branching point is invalid based on the size of Sudoku grid", () => {
        expect(() =>
          initialBranch.openBranch({ row: 0, column: 500 }, 1),
        ).toThrowError();
      });
    });
  });

  describe("close branch", () => {
    describe("success", () => {
      let initialBranch: SolverBranch;
      let parentBranch: SolverBranch;
      let childBranch: SolverBranch;

      beforeEach(() => {
        initialBranch = SolverBranch.createInitialBranch(
          Puzzle4x4.INCOMPLETE_ALL_VALUES,
        );
        parentBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
        childBranch = parentBranch.openBranch({ row: 1, column: 1 }, 2);
        expect(childBranch.isCurrentBranch()).toBeTrue();
        expect(childBranch.isOpenBranch()).toBeTrue();
      });

      function closeChildBranch(): SolverBranch[] {
        return childBranch.closeBranch([
          childBranch,
          initialBranch,
          parentBranch,
        ]);
      }

      it("mark the closed branch as 'closed'", () => {
        closeChildBranch();
        expect(initialBranch.isOpenBranch()).toBeTrue();
        expect(initialBranch.isClosedBranch()).toBeFalse();
        expect(parentBranch.isOpenBranch()).toBeTrue();
        expect(parentBranch.isClosedBranch()).toBeFalse();
        expect(childBranch.isOpenBranch()).toBeFalse();
        expect(childBranch.isClosedBranch()).toBeTrue();
      });

      it("should not return the closed branch", () => {
        const branchesAfterClosing: SolverBranch[] = closeChildBranch();

        expect(branchesAfterClosing.length).toEqual(2);
        expect(
          branchesAfterClosing.some(
            (branch) => branch.getId() === initialBranch.getId(),
          ),
        ).toBeTrue();
        expect(
          branchesAfterClosing.some(
            (branch) => branch.getId() === parentBranch.getId(),
          ),
        ).toBeTrue();
        expect(branchesAfterClosing).not.toContain(childBranch);
      });

      it("should make the parent branch the current branch", () => {
        closeChildBranch();
        expect(initialBranch.isCurrentBranch()).toBeFalse();
        expect(parentBranch.isCurrentBranch()).toBeTrue();
        expect(childBranch.isCurrentBranch()).toBeFalse();
      });

      it("should not change which branch is the initial branch", () => {
        closeChildBranch();
        expect(initialBranch.isInitialBranch()).toBeTrue();
        expect(parentBranch.isInitialBranch()).toBeFalse();
        expect(childBranch.isInitialBranch()).toBeFalse();
      });

      it("should remove the reference to the child from the parent", () => {
        closeChildBranch();
        expect(initialBranch.getParentId()).toBeUndefined();
        expect(initialBranch.getChildId()).toEqual(parentBranch.getId());
        expect(parentBranch.getParentId()).toEqual(initialBranch.getId());
        expect(parentBranch.getChildId()).toBeUndefined();
        expect(childBranch.getParentId()).toBeUndefined();
        expect(childBranch.getChildId()).toBeUndefined();
      });

      it("should remove the value of the child branch at the branching point from the possible values of the parent branch", () => {
        closeChildBranch();
        expect(parentBranch.grid[1][1]).toEqual([1, 3, 4]);
      });

      it("should not modify the grid of the parent branch directly but replace it", () => {
        const parentBranchGridReference = parentBranch.grid;
        const branchesAfterClosing: SolverBranch[] = closeChildBranch();

        expect(branchesAfterClosing[0].getId()).toEqual(initialBranch.getId());
        expect(branchesAfterClosing[0]).toEqual(initialBranch);
        expect(branchesAfterClosing[0]).toBe(initialBranch);

        expect(branchesAfterClosing[1].getId()).toEqual(parentBranch.getId());
        expect(branchesAfterClosing[1]).toEqual(parentBranch);
        expect(branchesAfterClosing[1]).toBe(parentBranch);
        expect(branchesAfterClosing[1].grid).not.toBe(
          parentBranchGridReference,
        );
        expect(branchesAfterClosing[1].grid[1][1]).not.toBe(
          parentBranchGridReference[1][1],
        );
      });
    });

    describe("failure", () => {
      let initialBranch: SolverBranch;
      let parentBranch: SolverBranch;
      let childBranch: SolverBranch;

      beforeEach(() => {
        initialBranch = SolverBranch.createInitialBranch(
          Puzzle4x4.INCOMPLETE_ALL_VALUES,
        );
        parentBranch = initialBranch.openBranch({ row: 0, column: 0 }, 1);
        childBranch = parentBranch.openBranch({ row: 1, column: 1 }, 2);
        expect(childBranch.isCurrentBranch()).toBeTrue();
        expect(childBranch.isOpenBranch()).toBeTrue();
      });

      function expectCloseChildBranchThrowsError(): void {
        expect(() =>
          childBranch.closeBranch([initialBranch, parentBranch, childBranch]),
        ).toThrowError();
      }

      it("should not close a branch if it is missing in the list of all branches", () => {
        expect(() =>
          childBranch.closeBranch([initialBranch, parentBranch]),
        ).toThrowError();
      });

      it("should not close a branch if its parent is missing in the list of all branches", () => {
        expect(() =>
          childBranch.closeBranch([initialBranch, childBranch]),
        ).toThrowError();
      });

      it("should not close the branch if it is not the current branch", () => {
        expect(() =>
          parentBranch.closeBranch([initialBranch, parentBranch, childBranch]),
        ).toThrowError();
      });

      it("should not close the branch if its parent is the current branch", () => {
        spyOn(parentBranch, "getChildId").and.returnValue(undefined);
        expectCloseChildBranchThrowsError();
      });

      it("should never close the initial branch", () => {
        expect(() =>
          initialBranch.closeBranch([initialBranch, parentBranch, childBranch]),
        ).toThrowError();
        expect(() => initialBranch.closeBranch([initialBranch])).toThrowError();
        expect(() => initialBranch.closeBranch([])).toThrowError();
      });

      it("should not close a closed branch", () => {
        const isOpenBranchSpy = spyOn(childBranch, "isOpenBranch");
        isOpenBranchSpy.and.returnValue(false);
        expectCloseChildBranchThrowsError();

        isOpenBranchSpy.and.callThrough();
        expect(() =>
          childBranch.closeBranch([initialBranch, parentBranch, childBranch]),
        ).not.toThrowError();
        expectCloseChildBranchThrowsError();
      });

      it("should not close the child of a closed branch", () => {
        spyOn(parentBranch, "isOpenBranch").and.returnValue(false);
        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch with an empty grid", () => {
        childBranch.grid = [];
        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch if its parent has an empty grid", () => {
        parentBranch.grid = [];
        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch if the grid sizes of parent and child do not match", () => {
        // child has size 4 and was branched at point (1,1) -> remove first and last column
        const grid = childBranch.grid;
        childBranch.grid = [
          [grid[0][0], grid[0][1], grid[0][2]],
          [grid[1][0], grid[1][1], grid[1][2]],
          [grid[2][0], grid[2][1], grid[2][2]],
        ];

        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch if the row of the branching point is invalid based on the size of the parents Sudoku grid", () => {
        // @ts-expect-error modifying private field for test
        childBranch.branchingPoint.row = 1000;
        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch if the column of the branching point is invalid based on the size of the parents Sudoku grid", () => {
        // @ts-expect-error modifying private field for test
        childBranch.branchingPoint.column = 1000;
        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch if the branching point of the child does not contain a specific value", () => {
        // branching point is (1,1)
        childBranch.grid[1][1] = [1, 2, 3, 4];
        expectCloseChildBranchThrowsError();
      });

      it("should not close a branch if the value of the child branch at the branching point is not contained in the possible values of the parent branch", () => {
        // branching point is (1,1), branching value is 2
        parentBranch.grid[1][1] = [1, 3, 4];
        expectCloseChildBranchThrowsError();
      });
    });
  });
});
