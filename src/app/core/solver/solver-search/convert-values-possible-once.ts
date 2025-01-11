import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { Assert } from "@app/shared/util/assertions";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { CellPosition } from "@app/types/cell-position";
import { CellPositionMap } from "@app/types/cell-position-map";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";

/**
 * Searches the array of possible values in a row/column/square and checks whether
 * one number is possible only once in this row/column/square. If one is found, it
 * will be converted into a *found* value.
 * This solver returns after the first found value.
 *
 * This step should be executed regularly after steps which potentially eliminate possible values.
 */
export class ConvertValuesPossibleOnce implements SolverRunnable {
  private cellPositionsOfSquaresPerGridSize: Record<number, CellPositionMap> =
    {};

  run(grid: SudokuGrid): boolean {
    return this.convertNextValueWhichIsPossibleOnlyOnce(
      grid,
      this.getOrCalculateCellPositionsOfSquares(grid.length),
    );
  }

  private convertNextValueWhichIsPossibleOnlyOnce(
    grid: SudokuGrid,
    cellPositions: CellPositionMap,
  ): boolean {
    for (let i = 0; i < grid.length; i++) {
      if (
        this.convertValuesWhichArePossibleOnlyOnce(
          grid,
          cellPositions.getForSquareIndex(i),
        )
      ) {
        return true;
      }

      const row: CellPosition[] = [];
      const column: CellPosition[] = [];
      for (let j = 0; j < grid.length; j++) {
        row.push(new CellPosition(i, j));
        column.push(new CellPosition(j, i));
      }

      if (this.convertValuesWhichArePossibleOnlyOnce(grid, row)) {
        return true;
      }
      if (this.convertValuesWhichArePossibleOnlyOnce(grid, column)) {
        return true;
      }
    }

    return false;
  }

  private convertValuesWhichArePossibleOnlyOnce(
    grid: SudokuGrid,
    cellPositions: CellPosition[],
  ): boolean {
    const valueToPossiblePositions: Record<number, CellPosition[]> =
      this.collectPossiblePositionsOfValues(cellPositions, grid);

    for (const [key, value] of Object.entries(valueToPossiblePositions)) {
      if (value.length === 1) {
        const onlyValue: CellPosition | undefined = value[0];
        Assert.defined(onlyValue);
        grid[onlyValue.x][onlyValue.y] = Number.parseInt(key);
        return true;
      }
    }

    return false;
  }

  private collectPossiblePositionsOfValues(
    cellPositions: CellPosition[],
    grid: SudokuGrid,
  ): Record<number, CellPosition[]> {
    const valueToPossiblePositions: Record<number, CellPosition[]> = {};
    for (const cellPosition of cellPositions) {
      const squareCell: SudokuGridCell = grid[cellPosition.x][cellPosition.y];
      if (isArray(squareCell)) {
        for (const possibleValue of squareCell) {
          valueToPossiblePositions[possibleValue] = [
            ...(valueToPossiblePositions[possibleValue] ?? []),
            cellPosition,
          ];
        }
      }
    }
    return valueToPossiblePositions;
  }

  private getOrCalculateCellPositionsOfSquares(size: number): CellPositionMap {
    const cellPositions: Nullable<CellPositionMap> =
      this.cellPositionsOfSquaresPerGridSize[size];
    if (cellPositions != undefined) {
      return cellPositions;
    } else {
      const cellPositions: CellPositionMap =
        SudokuGridUtil.getCellPositionsOfSquares(size);
      this.cellPositionsOfSquaresPerGridSize[size] = cellPositions;
      return cellPositions;
    }
  }
}
