import { Logger } from "@app/core/log/logger";
import { CellPosition } from "@app/shared/types/cell-position";
import { CellPositionMap } from "@app/shared/types/cell-position-map";
import { Nullable } from "@app/shared/types/nullable";
import { StopWatch } from "@app/shared/types/stopwatch";
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";

export class SudokuGridUtil {
  static clone(grid: SudokuGrid): SudokuGrid {
    return StopWatch.monitor(
      () => {
        const result: SudokuGrid = [];
        grid.forEach((row) => {
          result.push(this.cloneRow(row));
        });
        return result;
      },
      new Logger(SudokuGridUtil.name),
      { message: "Cloning Sudoku" },
    );
  }

  static cloneRow(row: SudokuGridRow): SudokuGridRow {
    const newRow: SudokuGridRow = [];
    row.forEach((cell: SudokuGridCell) => newRow.push(cell));
    return newRow;
  }

  static isDone(grid: Nullable<SudokuGrid>): boolean {
    if (!isDefined(grid)) {
      return false;
    }

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const row: SudokuGridRow = grid[rowIndex]!;
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell: SudokuGridCell = row[columnIndex];
        if (isArray(cell) || !isDefined(cell)) {
          return false;
        }
      }
    }
    return true;
  }

  static getRowValues(grid: SudokuGrid, rowIndex: number): number[] {
    const values: number[] = [];
    grid[rowIndex].forEach((cellValue) => {
      if (isNotArray(cellValue) && isDefined(cellValue)) {
        values.push(cellValue);
      }
    });
    return values;
  }

  static getColumnCells(
    grid: SudokuGrid,
    columnIndex: number,
  ): SudokuGridCell[] {
    const values: SudokuGridCell[] = [];
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const row: SudokuGridRow = grid[rowIndex]!;
      values.push(row[columnIndex]);
    }
    return values;
  }

  static getColumnValues(grid: SudokuGrid, columnIndex: number): number[] {
    const values: number[] = [];
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const row: SudokuGridRow = grid[rowIndex]!;
      const cellValue: SudokuGridCell = row[columnIndex];
      if (isNotArray(cellValue) && isDefined(cellValue)) {
        values.push(cellValue);
      }
    }
    return values;
  }

  static getSquareValues(
    grid: SudokuGrid,
    rowIndex: number,
    columnIndex: number,
  ): number[] {
    const values: number[] = [];

    SudokuGridUtil.getCellPositionsOfSquares(grid.length)
      .getForPosition({
        x: rowIndex,
        y: columnIndex,
      })
      .forEach((cellPosition) => {
        const cellValue = grid[cellPosition.x][cellPosition.y];
        if (isNotArray(cellValue) && isDefined(cellValue)) {
          values.push(cellValue);
        }
      });
    return values;
  }

  static getCellPositionsOfSquares(size: number): CellPositionMap {
    const sqrt: number = Math.sqrt(size);
    const cellPositionsInSameSquare: CellPositionMap = new CellPositionMap();
    let squareBaseX = 0;

    for (let i = 0; i < size; i++) {
      const currentSquare: CellPosition[] = [];

      if (i > 0 && i % sqrt === 0) {
        squareBaseX += sqrt;
      }

      for (let j = 0; j < size; j++) {
        const squareX: number = squareBaseX + Math.ceil((1 + j - sqrt) / sqrt);
        const squareY: number = (i % sqrt) * sqrt + (j % sqrt);
        currentSquare.push(new CellPosition(squareX, squareY));
      }

      cellPositionsInSameSquare.set(i, currentSquare);
    }

    return cellPositionsInSameSquare;
  }
}
