import { CellPosition } from "@app/shared/types/cell-position";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";

export class ValuePossibleOnce {
  run(grid: SudokuGrid, cellPositions: CellPosition[]): boolean {
    return this.convertValuesWhichArePossibleOnlyOnce(grid, cellPositions);
  }

  private convertValuesWhichArePossibleOnlyOnce(
    grid: SudokuGrid,
    cellPositions: CellPosition[],
  ): boolean {
    const valueToPossiblePositions: Record<number, CellPosition[]> =
      this.collectPossiblePositionsOfValues(cellPositions, grid);

    for (const [key, value] of Object.entries(valueToPossiblePositions)) {
      if (value.length === 1) {
        grid[value[0].x][value[0].y] = Number.parseInt(key);
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
}
