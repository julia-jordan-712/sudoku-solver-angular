import { SolverRunnable } from "@app/core/solver/solver-runnable";
import { CellPosition } from "@app/shared/types/cell-position";
import { CellPositionMap } from "@app/shared/types/cell-position-map";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

interface PossiblePairResult {
  v1: number;
  v2: number;
  row?: number;
  column?: number;
  square?: number;
}

/**
 * Identifies pairs of possible values which can only occur in two cells of a row/column/square
 * and eliminates other possible values from these cells.
 *
 * Only one elimination is done and then the solver returns. The first checked pair
 * is [1,2] and the next is [1,3] and so on until the last pair ([8,9] for a 9x9 Sudoku).
 *
 * Example: A row contains [1,4], [1,3,5], [2,4], [3,4,5] as possible values. Since
 * the numbers 3 and 5 occur as a pair [3,5] exactly twice, this means that no other values
 * are possible in these cells and the possible values can be reduced
 * to [1,4], [3,5], [2,4], [3,5].
 */
export class EliminateOtherValuesFromPossiblePair implements SolverRunnable {
  run(grid: SudokuGrid): boolean {
    return this.eliminateNextPossiblePair(grid);
  }

  private eliminateNextPossiblePair(grid: SudokuGrid): boolean {
    const squarePositionsMap: CellPositionMap =
      SudokuGridUtil.getCellPositionsOfSquares(grid.length);

    for (let v1 = 1; v1 <= grid.length; v1++) {
      for (let v2 = v1 + 1; v2 <= grid.length; v2++) {
        const possiblePairResult: PossiblePairResult = this.isPossiblePair(
          v1,
          v2,
          grid,
          squarePositionsMap,
        );
        let valuesEliminated = this.eliminateRows(
          possiblePairResult,
          v1,
          v2,
          grid,
        );
        valuesEliminated =
          this.eliminateColumns(possiblePairResult, v1, v2, grid) ||
          valuesEliminated;
        valuesEliminated =
          this.eliminateSquares(
            squarePositionsMap,
            possiblePairResult,
            v1,
            v2,
            grid,
          ) || valuesEliminated;
        if (valuesEliminated) {
          return true;
        }
      }
    }
    return false;
  }

  private isPossiblePair(
    v1: number,
    v2: number,
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
  ): PossiblePairResult {
    for (let i = 0; i < grid.length; i++) {
      const rowPositionsContainingPair: CellPosition[] = [];
      const rowPositionsContainingOneOfBothValues: CellPosition[] = [];
      const columnPositionsContainingPair: CellPosition[] = [];
      const columnPositionsContainingOneOfBothValues: CellPosition[] = [];

      const rowCells: SudokuGridCell[] = grid[i];
      const columnCells: SudokuGridCell[] = SudokuGridUtil.getColumnCells(
        grid,
        i,
      );
      for (let j = 0; j < grid.length; j++) {
        if (this.containsSearchedPair(v1, v2, rowCells[j])) {
          rowPositionsContainingPair.push(new CellPosition(i, j));
        } else if (this.containsOneButNotTheOther(v1, v2, rowCells[j])) {
          rowPositionsContainingOneOfBothValues.push(new CellPosition(i, j));
        }
        if (this.containsSearchedPair(v1, v2, columnCells[j])) {
          columnPositionsContainingPair.push(new CellPosition(j, i));
        } else if (this.containsOneButNotTheOther(v1, v2, columnCells[j])) {
          columnPositionsContainingOneOfBothValues.push(new CellPosition(i, j));
        }
      }

      const squarePositionsContainingPair: CellPosition[] = [];
      const squarePositionsContainingOneOfBothValues: CellPosition[] = [];
      squarePositionsMap.getForSquareIndex(i).forEach((position) => {
        if (this.containsSearchedPair(v1, v2, grid[position.x][position.y])) {
          squarePositionsContainingPair.push(position);
        } else if (
          this.containsOneButNotTheOther(v1, v2, grid[position.x][position.y])
        ) {
          squarePositionsContainingOneOfBothValues.push(position);
        }
      });

      const row =
        rowPositionsContainingPair.length === 2 &&
        rowPositionsContainingOneOfBothValues.length === 0
          ? i
          : undefined;
      const column =
        columnPositionsContainingPair.length === 2 &&
        columnPositionsContainingOneOfBothValues.length === 0
          ? i
          : undefined;
      const square =
        squarePositionsContainingPair.length === 2 &&
        squarePositionsContainingOneOfBothValues.length === 0
          ? i
          : undefined;

      if (row != undefined || column != undefined || square != undefined) {
        return { v1, v2, row, column, square };
      }
    }
    return { v1, v2 };
  }

  private containsSearchedPair(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): boolean {
    return isArray(cell) && cell.includes(v1) && cell.includes(v2);
  }

  private containsOneButNotTheOther(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): boolean {
    return (
      isArray(cell) &&
      ((cell.includes(v1) && !cell.includes(v2)) ||
        (cell.includes(v2) && !cell.includes(v1)))
    );
  }

  private eliminateRows(
    possiblePairResult: PossiblePairResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    if (possiblePairResult.row != undefined) {
      for (let i = 0; i < grid.length; i++) {
        const keptPairValues = this.keepOnlyPairValuesInCell(
          v1,
          v2,
          grid[possiblePairResult.row][i],
        );
        grid[possiblePairResult.row][i] = keptPairValues.cell;
        valuesEliminated = valuesEliminated || keptPairValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateColumns(
    possiblePairResult: PossiblePairResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    if (possiblePairResult.column != undefined) {
      for (let i = 0; i < grid.length; i++) {
        const keptPairValues = this.keepOnlyPairValuesInCell(
          v1,
          v2,
          grid[i][possiblePairResult.column],
        );
        grid[i][possiblePairResult.column] = keptPairValues.cell;
        valuesEliminated = valuesEliminated || keptPairValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateSquares(
    squarePositionsMap: CellPositionMap,
    possiblePairResult: PossiblePairResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    if (possiblePairResult.square != undefined) {
      squarePositionsMap
        .getForSquareIndex(possiblePairResult.square)
        .forEach((cellPosition) => {
          const keptPairValues = this.keepOnlyPairValuesInCell(
            v1,
            v2,
            grid[cellPosition.x][cellPosition.y],
          );
          grid[cellPosition.x][cellPosition.y] = keptPairValues.cell;
          valuesEliminated =
            valuesEliminated || keptPairValues.valuesEliminated;
        });
    }
    return valuesEliminated;
  }

  private keepOnlyPairValuesInCell(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): { cell: SudokuGridCell; valuesEliminated: boolean } {
    if (isArray(cell)) {
      if (this.containsSearchedPair(v1, v2, cell)) {
        const lengthBeforeFilter = cell.length;
        const filteredCell = cell.filter((v) => v === v1 || v === v2);
        return {
          cell: filteredCell,
          valuesEliminated: lengthBeforeFilter !== filteredCell.length,
        };
      }
    }
    return { cell, valuesEliminated: false };
  }
}
