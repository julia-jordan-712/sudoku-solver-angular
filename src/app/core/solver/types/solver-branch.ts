import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { v4 as randomUUID } from "uuid";

export interface BranchingPoint {
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
  /** The id of the branch which is created from this branch */
  private childId?: string;

  /** The row and column of the cell where this branch differed from its parent when it was created */
  private branchingPoint?: BranchingPoint;

  /** Whether this branch is open. Set to false when closing a branch */
  private isOpen: boolean;

  private constructor(
    grid: SudokuGrid,
    id: string,
    parentId?: string,
    point?: BranchingPoint,
  ) {
    this.grid = grid;
    this.id = id;
    this.parentId = parentId;
    this.childId = undefined;
    this.branchingPoint = point;
    this.isOpen = true;
  }

  public static createInitialBranch(grid: SudokuGrid): SolverBranch {
    return new SolverBranch(SudokuGridUtil.clone(grid), randomUUID());
  }

  public static cloneBranch(branch: SolverBranch): SolverBranch {
    const clonedBranch: SolverBranch = new SolverBranch(
      SudokuGridUtil.clone(branch.grid),
      branch.id,
      branch.parentId,
      branch.branchingPoint,
    );
    clonedBranch.childId = branch.childId;
    clonedBranch.isOpen = branch.isOpen;
    return clonedBranch;
  }

  public openBranch(cell: BranchingPoint, value: number): SolverBranch {
    if (this.isClosedBranch()) {
      throw new Error("Can not open a branch from a closed branch");
    }
    if (this.getChildId()) {
      throw new Error(
        "Can not open a branch from a branch which already has a child branch",
      );
    }
    if (this.grid.length > 0) {
      const sudokuWidth: number = this.grid.length;
      const sudokuHeight: number = this.grid[0].length;
      if (cell.row > sudokuWidth - 1 || cell.column > sudokuHeight - 1) {
        throw new Error(
          `Can not open a branch because cell [${cell.row},${cell.column}] does not exist in Sudoku of size ${sudokuWidth}x${sudokuHeight}`,
        );
      }
      const cellValue: SudokuGridCell = this.grid[cell.row][cell.column];
      if (isNotArray(cellValue) && isDefined(cellValue)) {
        throw new Error(
          "There is no point in opening a branch from a cell which already has a definite value",
        );
      } else if (isArray(cellValue) && !cellValue.includes(value)) {
        throw new Error(
          "Can not open branch if the branching value is not contained in the list of possible values at the branching point",
        );
      }
    } else {
      throw new Error("Can not open branch from an empty Sudoku");
    }

    const grid: SudokuGrid = SudokuGridUtil.clone(this.grid);
    grid[cell.row][cell.column] = value;
    const id = randomUUID();
    this.childId = id;
    return new SolverBranch(grid, id, this.getId(), cell);
  }

  public closeBranch(allBranches: SolverBranch[]): SolverBranch[] {
    let newBranches: SolverBranch[] = [];
    let closedSuccessfully = false;
    for (const branch of allBranches) {
      if (branch.getId() === this.getParentId()) {
        closedSuccessfully = branch.closeFromChildBranch(this);
        newBranches.push(branch);
      } else {
        newBranches.push(branch);
      }
    }
    if (!closedSuccessfully) {
      throw new Error(`Failed to properly close branch with id ${this.id}`);
    }

    newBranches = newBranches.filter((branch) => branch.isOpenBranch());
    const removedChild: boolean = newBranches.length === allBranches.length - 1;
    if (!removedChild) {
      throw new Error(`Failed to properly close branch with id ${this.id}`);
    }
    return newBranches;
  }

  private closeFromChildBranch(childBranchToBeClosed: SolverBranch): boolean {
    if (childBranchToBeClosed.isClosedBranch()) {
      throw new Error("The branch to be closed can not be closed already");
    }
    if (childBranchToBeClosed.isInitialBranch()) {
      throw new Error("Can not close the initial branch");
    }
    if (!childBranchToBeClosed.isCurrentBranch()) {
      throw new Error("The branch to be closed has to be the current branch");
    }

    if (this.isClosedBranch()) {
      throw new Error(
        "The parent branch of the branch to be closed can not be closed",
      );
    }
    if (this.isCurrentBranch()) {
      throw new Error(
        "The parent branch of the branch to be closed can not be the current branch",
      );
    }

    if (
      childBranchToBeClosed.getId() !== this.getChildId() ||
      childBranchToBeClosed.getParentId() !== this.getId()
    ) {
      throw new Error(
        "Can not close from a branch which is not the child of this branch",
      );
    }

    if (!isDefined(childBranchToBeClosed.branchingPoint)) {
      throw new Error(
        "Can not close branch if there is no branching point in the branch to be closed",
      );
    }
    if (childBranchToBeClosed.grid.length <= 0 || this.grid.length <= 0) {
      throw new Error("Can not close branch if Sudoku grid is empty");
    }
    if (
      childBranchToBeClosed.grid.length !== this.grid.length ||
      childBranchToBeClosed.grid[0].length !== this.grid[0].length
    ) {
      throw new Error(
        "Can not close from a branch with a different grid size than this branch",
      );
    }

    const row: number = childBranchToBeClosed.branchingPoint.row;
    const column: number = childBranchToBeClosed.branchingPoint.column;
    const childValue: SudokuGridCell = childBranchToBeClosed.grid[row][column];
    if (isNotArray(childValue)) {
      const possibleValues: SudokuGridCell = this.grid[row][column];
      if (isArray(possibleValues)) {
        if (!possibleValues.includes(childValue)) {
          throw new Error(
            "Can not close branch because branching value was not found in the possible values at the branching point - so it can not be removed there",
          );
        }
        this.grid = SudokuGridUtil.clone(this.grid);
        this.grid[row][column] = possibleValues.filter((v) => v !== childValue);
        this.childId = undefined;
        childBranchToBeClosed.parentId = undefined;
        childBranchToBeClosed.isOpen = false;
        return true;
      } else {
        throw new Error(
          "Can not close branch if the branching point of the parent branch does not contain an array of numbers",
        );
      }
    } else {
      throw new Error(
        "Can not close branch if the branching point of the child branch does not contain a number",
      );
    }
  }

  public getId(): string {
    return this.id;
  }

  public getParentId(): Nullable<string> {
    return this.parentId;
  }

  public getChildId(): Nullable<string> {
    return this.childId;
  }

  public isClosedBranch(): boolean {
    return !this.isOpenBranch();
  }

  public isCurrentBranch(): boolean {
    return this.isOpenBranch() && this.getChildId() == undefined;
  }

  public isInitialBranch(): boolean {
    return this.isOpenBranch() && this.getParentId() == undefined;
  }

  public isOpenBranch(): boolean {
    return this.isOpen;
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

    if (
      this.getId() === other.getChildId() &&
      this.getParentId() === other.getId()
    ) {
      // this branch is the child of the other and comes after it
      return 1;
    }
    if (
      this.getId() === other.getParentId() &&
      this.getChildId() === other.getId()
    ) {
      // this branch is the parent of the other and comes before it
      return -1;
    }
    return 0;
  }
}
