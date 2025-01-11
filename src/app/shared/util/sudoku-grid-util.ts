import { Logger } from "@app/core/log/logger";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { CellPositionMap } from "@app/types/cell-position-map";
import { Nullable } from "@app/types/nullable";
import { StopWatch } from "@app/types/stopwatch";
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/types/sudoku-grid";

export class SudokuGridUtil {
  private static cellPositionMaps: Record<number, CellPositionMap> = {};

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
    grid[rowIndex]?.forEach((cellValue) => {
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
    let cellPositionMap: CellPositionMap | undefined =
      SudokuGridUtil.cellPositionMaps[size];
    if (!cellPositionMap) {
      cellPositionMap = new CellPositionMap(size);
      SudokuGridUtil.cellPositionMaps[size] = cellPositionMap;
    }
    return cellPositionMap;
  }
}
