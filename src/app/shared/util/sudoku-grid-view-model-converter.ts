import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
  SudokuGridViewModel,
} from "@app/shared/types/sudoku-grid-view-model";

export class SudokuGridViewModelConverter {
  public static createViewModelsFromGrids(
    grids: SudokuGrid[],
    id = "",
  ): SudokuGridViewModel[] {
    return grids.map((grid, index) =>
      SudokuGridViewModelConverter.createViewModelFromGrid(grid, id, index),
    );
  }

  public static createViewModelFromGrid(
    grid: SudokuGrid,
    id = "",
    index = 0,
  ): SudokuGridViewModel {
    return {
      id: `${id}-grid-${index}`,
      rows: SudokuGridViewModelConverter.createViewModelsFromRows(grid, id),
    } satisfies SudokuGridViewModel;
  }

  private static createViewModelsFromRows(
    rows: SudokuGridRow[],
    id = "",
  ): SudokuGridRowViewModel[] {
    return rows.map((row, index) =>
      SudokuGridViewModelConverter.createViewModelsFromRow(row, id, index),
    );
  }

  private static createViewModelsFromRow(
    row: SudokuGridRow,
    id = "",
    index = 0,
  ): SudokuGridRowViewModel {
    return {
      id: `${id}-row-${index}`,
      cells: SudokuGridViewModelConverter.createViewModelsFromCells(
        row,
        id,
        index,
      ),
    } satisfies SudokuGridRowViewModel;
  }

  private static createViewModelsFromCells(
    cells: SudokuGridCell[],
    id = "",
    rowIndex = 0,
  ): SudokuGridCellViewModel[] {
    return cells.map((cell, index) =>
      SudokuGridViewModelConverter.createViewModelsFromCell(
        cell,
        rowIndex,
        index,
        id,
      ),
    );
  }

  private static createViewModelsFromCell(
    cell: SudokuGridCell,
    rowIndex = 0,
    columnIndex = 0,
    id = "",
  ): SudokuGridCellViewModel {
    return {
      id: `${id}-cell-${rowIndex}-${columnIndex}`,
      cell,
    } satisfies SudokuGridCellViewModel;
  }

  public static createGridFromViewModel(
    viewModel: SudokuGridViewModel,
  ): SudokuGrid {
    return SudokuGridViewModelConverter.createRowsFromViewModels(
      viewModel.rows,
    );
  }

  private static createRowsFromViewModels(
    viewModels: SudokuGridRowViewModel[],
  ): SudokuGridRow[] {
    return viewModels.map((viewModel) =>
      SudokuGridViewModelConverter.createRowFromViewModel(viewModel),
    );
  }

  public static createRowFromViewModel(
    viewModel: SudokuGridRowViewModel,
  ): SudokuGridRow {
    return SudokuGridViewModelConverter.createCellsFromViewModels(
      viewModel.cells,
    );
  }

  private static createCellsFromViewModels(
    viewModels: SudokuGridCellViewModel[],
  ): SudokuGridCell[] {
    return viewModels.map((viewModel) =>
      SudokuGridViewModelConverter.createCellFromViewModel(viewModel),
    );
  }

  private static createCellFromViewModel(
    viewModel: SudokuGridCellViewModel,
  ): SudokuGridCell {
    return viewModel.cell;
  }
}
