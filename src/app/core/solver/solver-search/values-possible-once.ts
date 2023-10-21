import { ValuePossibleOnce } from "@app/core/solver/solver-search/value-possible-once";
import { CellPosition } from "@app/shared/types/cell-position";
import { CellPositionMap } from "@app/shared/types/cell-position-map";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

export class ValuesPossibleOnce {
  private cellPositionsOfSquaresPerGridSize: Record<number, CellPositionMap> =
    {};

  run(grid: SudokuGrid): boolean {
    return this.convertValuesWhichArePossibleOnlyOnce(
      grid,
      this.getOrCalculateCellPositionsOfSquares(grid.length),
    );
  }

  private convertValuesWhichArePossibleOnlyOnce(
    grid: SudokuGrid,
    cellPositions: CellPositionMap,
  ): boolean {
    for (let i = 0; i < grid.length; i++) {
      if (
        new ValuePossibleOnce().run(grid, cellPositions.getForSquareIndex(i))
      ) {
        return true;
      }

      const row: CellPosition[] = [];
      const column: CellPosition[] = [];
      for (let j = 0; j < grid.length; j++) {
        row.push(new CellPosition(i, j));
        column.push(new CellPosition(j, i));
      }

      if (new ValuePossibleOnce().run(grid, row)) {
        return true;
      }
      if (new ValuePossibleOnce().run(grid, column)) {
        return true;
      }
    }

    return false;
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
