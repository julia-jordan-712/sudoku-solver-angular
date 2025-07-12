import { NextMultipleValuesCombination } from "@app/core/solver/solver-eliminate/util/next-multiple-values-combination";
import { CellPositionMap } from "@app/types/cell-position-map";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";

export class PossibleValuesIterator {
  public iterate(
    eliminateFn: (
      grid: SudokuGrid,
      squarePositionsMap: CellPositionMap,
      combinationValues: number[],
    ) => boolean,
    grid: SudokuGrid,
  ): boolean {
    const squarePositionsMap: CellPositionMap =
      SudokuGridUtil.getCellPositionsOfSquares(grid.length);
    return this.iteratePossibleMultiples(
      eliminateFn,
      grid,
      squarePositionsMap,
      2,
    );
  }

  private iteratePossibleMultiples(
    eliminateFn: (
      grid: SudokuGrid,
      squarePositionsMap: CellPositionMap,
      combinationValues: number[],
    ) => boolean,
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
    amountOfValuesInCombination: number,
  ): boolean {
    const amount = Math.min(
      grid.length,
      Math.max(amountOfValuesInCombination, 2),
    );
    const nextMultipleValuesCombination: NextMultipleValuesCombination =
      new NextMultipleValuesCombination(amount, grid.length);
    let combinationValues: number[] | null =
      nextMultipleValuesCombination.get();
    while (combinationValues != null) {
      if (eliminateFn(grid, squarePositionsMap, combinationValues)) {
        return true;
      }
      combinationValues = nextMultipleValuesCombination.get();
    }
    if (amount >= grid.length) {
      // end recursive calls
      return false;
    } else {
      return this.iteratePossibleMultiples(
        eliminateFn,
        grid,
        squarePositionsMap,
        amount + 1,
      );
    }
  }
}
