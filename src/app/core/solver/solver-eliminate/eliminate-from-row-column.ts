import { SolverEliminateUtil } from "@app/core/solver/solver-eliminate/solver-eliminate-util";
import { SolverRunnable } from "@app/core/solver/solver-runnable";
import { CellPosition } from "@app/shared/types/cell-position";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

/**
 * Identifies rows/columns where a certain value is possible only at certain positions
 * based on the values in the squares and removes this value from the possible-value-array
 * of the invalid positions inside this row/column.
 * Only one elimination is done and then the solver returns. This solver iterates over
 * all squares of a Sudoku and for each square checks all possible values of this Sudoku
 * (i.e. 1-9 for a 9x9 Sudoku).
 *
 * Example: A square contains [[[1,4,5],[4,5,9],[4,5]], [6,8,[2,5]], [[1,2,7],[7,9],3]].
 * The position of value 4 is not fully determined yet. However it can only appear in the
 * 1st row of this square. Therefore it can be eliminated from all other positions in
 * this row which are part of *another* square.
 */
export class EliminateFromRowOrColumn implements SolverRunnable {
  run(grid: SudokuGrid): boolean {
    return this.eliminateFromRowOrColumnBasedOnSquare(grid);
  }

  private eliminateFromRowOrColumnBasedOnSquare(grid: SudokuGrid): boolean {
    const cellPositionsOfSquares = SudokuGridUtil.getCellPositionsOfSquares(
      grid.length,
    );
    for (let i = 0; i < grid.length; i++) {
      const cellPositionsOfSquare: CellPosition[] =
        cellPositionsOfSquares.getForSquareIndex(i);

      for (let v = 1; v <= grid.length; v++) {
        if (
          this.eliminateFromRowOrColumnForValue(grid, v, cellPositionsOfSquare)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  private eliminateFromRowOrColumnForValue(
    grid: SudokuGrid,
    value: number,
    cellPositionsOfSquare: CellPosition[],
  ): boolean {
    const rowSlices: SudokuGridCell[][] = [];
    const columnSlices: SudokuGridCell[][] = [];
    this.fillRowAndColumnSlices(
      cellPositionsOfSquare,
      grid,
      rowSlices,
      columnSlices,
    );

    let valuesEliminated = false;
    const rowIndexInSquare =
      SolverEliminateUtil.findIndexOfSingleSliceContainingPossibleValue(
        rowSlices,
        value,
      );
    if (rowIndexInSquare >= 0) {
      valuesEliminated = this.eliminateFromRowBasedOnSquare(
        rowIndexInSquare,
        grid,
        value,
        cellPositionsOfSquare,
      );
    }

    const columnIndexInSquare =
      SolverEliminateUtil.findIndexOfSingleSliceContainingPossibleValue(
        columnSlices,
        value,
      );
    if (columnIndexInSquare >= 0) {
      valuesEliminated =
        this.eliminateFromColumnBasedOnSquare(
          columnIndexInSquare,
          grid,
          value,
          cellPositionsOfSquare,
        ) || valuesEliminated;
    }
    if (valuesEliminated) {
      return true;
    }

    return false;
  }

  private fillRowAndColumnSlices(
    cellPositionsOfSquare: CellPosition[],
    grid: SudokuGrid,
    rowSlices: SudokuGridCell[][],
    columnSlices: SudokuGridCell[][],
  ): void {
    const squareCells: SudokuGridCell[] = cellPositionsOfSquare.map(
      (position) => grid[position.x][position.y],
    );
    let rowSlice: SudokuGridCell[] = [];
    let columnSlice: SudokuGridCell[] = [];
    for (let i = 0; i < squareCells.length; i++) {
      rowSlice.push(squareCells[i]);
      columnSlice.push(squareCells[this.toNextColumnIndex(i, squareCells)]);

      if ((i + 1) % Math.sqrt(squareCells.length) === 0) {
        rowSlices.push(rowSlice);
        rowSlice = [];
        columnSlices.push(columnSlice);
        columnSlice = [];
      }
    }
  }

  private toNextColumnIndex(i: number, cells: SudokuGridCell[]): number {
    const sqrt: number = Math.sqrt(cells.length);
    return (i % sqrt) * sqrt + Math.ceil((1 + i - sqrt) / sqrt);
  }

  private eliminateFromRowBasedOnSquare(
    rowIndexInSquare: number,
    grid: SudokuGrid,
    value: number,
    cellPositionsOfSquare: CellPosition[],
  ): boolean {
    const rowIndexInGrid: number =
      cellPositionsOfSquare[
        rowIndexInSquare * Math.sqrt(cellPositionsOfSquare.length)
      ].x;
    const columnPositionsToSkip: number[] = cellPositionsOfSquare.map(
      (p) => p.y,
    );

    let changed = false;
    for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
      if (columnPositionsToSkip.includes(columnIndex)) {
        continue;
      }
      const cell: SudokuGridCell = grid[rowIndexInGrid][columnIndex];
      if (isArray(cell)) {
        const lengthBeforeFilter = cell.length;
        const filteredCell = cell.filter((v) => v != value);
        grid[rowIndexInGrid][columnIndex] = filteredCell;
        changed = changed || lengthBeforeFilter != filteredCell.length;
      }
    }
    return changed;
  }

  private eliminateFromColumnBasedOnSquare(
    columnIndexInSquare: number,
    grid: SudokuGrid,
    value: number,
    cellPositionsOfSquare: CellPosition[],
  ): boolean {
    const columnIndexInGrid: number =
      cellPositionsOfSquare[columnIndexInSquare].y;
    const rowPositionsToSkip: number[] = cellPositionsOfSquare.map((p) => p.x);

    let changed = false;
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      if (rowPositionsToSkip.includes(rowIndex)) {
        continue;
      }
      const cell: SudokuGridCell = grid[rowIndex][columnIndexInGrid];
      if (isArray(cell)) {
        const lengthBeforeFilter = cell.length;
        const filteredCell = cell.filter((v) => v != value);
        grid[rowIndex][columnIndexInGrid] = filteredCell;
        changed = changed || lengthBeforeFilter != filteredCell.length;
      }
    }
    return changed;
  }
}
