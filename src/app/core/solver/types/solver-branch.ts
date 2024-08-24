import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { v4 as randomUUID } from "uuid";

interface BranchingPoint {
  row: number;
  column: number;
}

export class SolverBranch {
  /** The sudoku of this branch */
  public grid: SudokuGrid;
  /** The id of the branch */
  private readonly id: string;
  /** The id of the branch from which this branch originates */
  private parentId?: string;
  /** The id of the branch from which is created from this branch */
  private childId?: string;

  /** The row and column of the cell where this branch differed from its parent when it was created */
  private branchingPoint?: BranchingPoint;

  private constructor(
    grid: SudokuGrid,
    id: string,
    parentId?: string,
    point?: BranchingPoint,
  ) {
    this.grid = grid;
    this.id = id;
    this.parentId = parentId;
    this.branchingPoint = point;
  }

  public static createInitialBranch(grid: SudokuGrid): SolverBranch {
    return new SolverBranch(grid, randomUUID());
  }

  public static openBranch(
    fromBranch: SolverBranch,
    cell: BranchingPoint,
    value: number,
  ): SolverBranch {
    if (fromBranch.childId) {
      throw new Error(
        "Can not open a branch from a branch which already has a child branch",
      );
    }
    if (fromBranch.grid.length > 0) {
      const sudokuWidth: number = fromBranch.grid.length;
      const sudokuHeight: number = fromBranch.grid[0].length;
      if (cell.row > sudokuWidth - 1 || cell.column > sudokuHeight - 1)
        throw new Error(
          `Can not open a branch because cell [${cell.row},${cell.column}] does not exist in Sudoku of size ${sudokuWidth}x${sudokuHeight}`,
        );
    } else {
      throw new Error("Can not open branch from an empty Sudoku");
    }

    const grid: SudokuGrid = SudokuGridUtil.clone(fromBranch.grid);
    grid[cell.row][cell.column] = value;
    const id = randomUUID();
    fromBranch.childId = id;
    return new SolverBranch(grid, id, fromBranch.id, cell);
  }

  public closeBranch(allBranches: SolverBranch[]): SolverBranch[] {
    if (this.isInitialBranch()) {
      throw new Error("Can not close the initial branch");
    }

    const newBranches: SolverBranch[] = [];
    let removedChild: boolean = false;
    let updatedParent: boolean = false;
    for (let branch of allBranches) {
      if (branch.id === this.id) {
        removedChild = true;
        continue;
      } else if (branch.id === this.parentId) {
        branch.closeFromChildBranch(this);
        updatedParent = true;
        newBranches.push(branch);
      } else {
        newBranches.push(branch);
      }
    }

    if (!removedChild) {
      throw new Error("Failed to find this branch in all branches");
    }
    if (!updatedParent) {
      throw new Error("Failed to update the parent branch");
    }
    return newBranches;
  }

  private closeFromChildBranch(childBranch: SolverBranch): void {
    if (this.isCurrentBranch()) {
      throw new Error("Can not close the current branch");
    }
    if (childBranch.id !== this.childId) {
      throw new Error(
        "Can not close from a branch which is not the child of this branch",
      );
    }
    if (!isDefined(childBranch.branchingPoint)) {
      throw new Error(
        "Can not close branch if there is no branching point in the child",
      );
    }
    if (childBranch.grid.length <= 0 || this.grid.length <= 0) {
      throw new Error("Can not close branch if Sudoku is empty");
    }
    if (
      childBranch.grid.length !== this.grid.length ||
      childBranch.grid[0].length !== this.grid[0].length
    ) {
      throw new Error(
        "Can not close from a branch with a different grid size than this branch",
      );
    }

    const row: number = childBranch.branchingPoint.row;
    const column: number = childBranch.branchingPoint.column;
    const childValue: SudokuGridCell = childBranch.grid[row][column];
    if (isNotArray(childValue)) {
      const possibleValues: SudokuGridCell = this.grid[row][column];
      if (isArray(possibleValues)) {
        this.grid[row][column] = possibleValues.filter((v) => v !== childValue);
        this.childId = undefined;
      } else {
        throw new Error(
          "Can not close branch if the branching point does not contain an array of numbers",
        );
      }
    } else {
      throw new Error(
        "Can not close branch if the branching point of the child does not contain a number",
      );
    }
  }

  public isCurrentBranch(): boolean {
    return this.childId == undefined;
  }

  public isInitialBranch(): boolean {
    return this.parentId == undefined;
  }

  public compareTo(other: SolverBranch): number {
    if (this.id === other.id) {
      return 0;
    }

    // initial branch is always first
    if (this.isInitialBranch()) {
      if (other.isInitialBranch()) {
        throw new Error(
          "two branches with different ids can not both be the initial branch",
        );
      }
      return -1;
    }
    if (other.isInitialBranch()) {
      if (this.isInitialBranch()) {
        throw new Error(
          "two branches with different ids can not both be the initial branch",
        );
      }
      return 1;
    }

    // current branch is always last
    if (this.isCurrentBranch()) {
      if (other.isCurrentBranch()) {
        throw new Error(
          "two branches with different ids can not both be the current branch",
        );
      }
      return 1;
    }
    if (other.isCurrentBranch()) {
      if (this.isCurrentBranch()) {
        throw new Error(
          "two branches with different ids can not both be the current branch",
        );
      }
      return -1;
    }

    if (this.id === other.childId && this.parentId === other.id) {
      // this branch is the child of the other and comes after it
      return 1;
    }
    if (this.id === other.parentId && this.childId === other.id) {
      // this branch is the parent of the other and comes before it
      return -1;
    }
    return 0;
  }
}

export class SolverBranchUtil {
  public static sortingFunction: (a: SolverBranch, b: SolverBranch) => number =
    (a, b) => a.compareTo(b);
}
