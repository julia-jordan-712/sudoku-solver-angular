import { SolverEliminateUtil } from "@app/core/solver/solver-eliminate/solver-eliminate-util";
import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { CellPosition } from "@app/types/cell-position";
import { CellPositionMap } from "@app/types/cell-position-map";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";

/**
 * Identifies squares where a certain value is possible only inside one row/column and
 * removes this value from the possible-value-array of the other rows/columns inside
 * this square.
 * Only one elimination is done and then the solver returns. This solver iterates over
 * all rows/columns of a Sudoku and for each row/column checks all possible values of
 * this Sudoku (i.e. 1-9 for a 9x9 Sudoku).
 *
 * Example: A row contains [3, [1,5,9], 8, 7, 2, 6, [1,4,5], [4,5,9], [4,5]]. The
 * position of value 4 is not fully determined yet. However it can only appear in the
 * 3rd square of this row. Therefore it can be eliminated from the *other rows* in the
 * *same square*.
 */
export class EliminateFromSquare implements SolverRunnable {
  run(grid: SudokuGrid): boolean {
    return this.eliminateFromSquareBasedOnRowOrColumn(grid);
  }

  private eliminateFromSquareBasedOnRowOrColumn(grid: SudokuGrid): boolean {
    const cellPositionsOfSquares = SudokuGridUtil.getCellPositionsOfSquares(
      grid.length,
    );
    for (let i = 0; i < grid.length; i++) {
      const rowSlices: SudokuGridCell[][] = this.toSlices(grid[i]!, grid);
      const columnSlices: SudokuGridCell[][] = this.toSlices(
        SudokuGridUtil.getColumnCells(grid, i),
        grid,
      );

      if (
        this.eliminateFromSquareForValue(
          grid,
          rowSlices,
          columnSlices,
          i,
          cellPositionsOfSquares,
        )
      ) {
        return true;
      }
    }
    return false;
  }

  private eliminateFromSquareForValue(
    grid: SudokuGrid,
    rowSlices: SudokuGridCell[][],
    columnSlices: SudokuGridCell[][],
    index: number,
    cellPositionsOfSquares: CellPositionMap,
  ): boolean {
    for (let v = 1; v <= grid.length; v++) {
      let valuesEliminated = false;
      const squareIndexInRow =
        SolverEliminateUtil.findIndexOfSingleSliceContainingPossibleValue(
          rowSlices,
          v,
        );
      if (squareIndexInRow >= 0) {
        valuesEliminated = this.eliminateFromSquareBasedOnRow(
          grid,
          v,
          index,
          squareIndexInRow,
          cellPositionsOfSquares,
        );
      }

      const squareIndexInColumn =
        SolverEliminateUtil.findIndexOfSingleSliceContainingPossibleValue(
          columnSlices,
          v,
        );
      if (squareIndexInColumn >= 0) {
        valuesEliminated =
          this.eliminateFromSquareBasedOnColumn(
            grid,
            v,
            index,
            squareIndexInColumn,
            cellPositionsOfSquares,
          ) || valuesEliminated;
      }
      if (valuesEliminated) {
        return true;
      }
    }
    return false;
  }

  private toSlices(
    rowOrColumn: SudokuGridCell[],
    grid: SudokuGrid,
  ): SudokuGridCell[][] {
    const cells: SudokuGridCell[] = SudokuGridUtil.cloneRow(rowOrColumn);
    const slices: SudokuGridCell[][] = [];
    const sqrt: number = Math.sqrt(grid.length);
    while (cells.length > 0) {
      slices.push(cells.splice(0, sqrt));
    }
    return slices;
  }

  private eliminateFromSquareBasedOnRow(
    grid: SudokuGrid,
    value: number,
    rowIndex: number,
    squareIndexInRow: number,
    cellPositionsOfSquares: CellPositionMap,
  ): boolean {
    const square: CellPosition[] = cellPositionsOfSquares.getForPosition(
      new CellPosition(rowIndex, squareIndexInRow * Math.sqrt(grid.length)),
    );
    return this.eliminateFromSquare(
      grid,
      value,
      square,
      (position) => position.x !== rowIndex,
    );
  }

  private eliminateFromSquareBasedOnColumn(
    grid: SudokuGrid,
    value: number,
    columnIndex: number,
    squareIndexInColumn: number,
    cellPositionsOfSquares: CellPositionMap,
  ): boolean {
    const square: CellPosition[] = cellPositionsOfSquares.getForPosition(
      new CellPosition(
        squareIndexInColumn * Math.sqrt(grid.length),
        columnIndex,
      ),
    );
    return this.eliminateFromSquare(
      grid,
      value,
      square,
      (position) => position.y !== columnIndex,
    );
  }

  private eliminateFromSquare(
    grid: SudokuGrid,
    value: number,
    square: CellPosition[],
    shouldConsiderCell: (position: CellPosition) => boolean,
  ): boolean {
    let changed = false;
    square.forEach((position) => {
      if (shouldConsiderCell(position)) {
        const cell: SudokuGridCell = grid[position.x][position.y];
        if (isArray(cell)) {
          const lengthBeforeFilter = cell.length;
          const filteredCell = cell.filter((v) => v != value);
          grid[position.x][position.y] = filteredCell;
          changed = changed || lengthBeforeFilter != filteredCell.length;
        }
      }
    });
    return changed;
  }
}
