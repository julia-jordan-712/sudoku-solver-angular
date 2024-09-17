import { CellPosition } from "@app/shared/types/cell-position";
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
import { isDefined } from "@app/shared/util/is-defined";

export class SudokuGridViewModelConverter {
  public static createViewModelFromGrid(
    grid: SudokuGrid,
    id: string,
    data: SudokuGridViewModel["data"],
  ): SudokuGridViewModel {
    const branchId: string | undefined = data.branchInfo?.isCurrent
      ? "CURRENT"
      : data.branchInfo?.id;
    const viewModelId: string = [id, branchId].filter(isDefined).join("_");
    return new SudokuGridViewModel(
      viewModelId,
      SudokuGridViewModelConverter.createViewModelsFromRows(grid, id, data),
      data,
    );
  }

  private static createViewModelsFromRows(
    rows: SudokuGridRow[],
    id: string,
    data: SudokuGridViewModel["data"],
  ): SudokuGridRowViewModel[] {
    return rows.map((row, index) =>
      SudokuGridViewModelConverter.createViewModelsFromRow(
        row,
        id,
        index,
        data,
      ),
    );
  }

  private static createViewModelsFromRow(
    row: SudokuGridRow,
    id: string,
    index: number,
    data: SudokuGridViewModel["data"],
  ): SudokuGridRowViewModel {
    return new SudokuGridRowViewModel(
      `${id}_row-${index}`,
      SudokuGridViewModelConverter.createViewModelsFromCells(
        row,
        id,
        index,
        data,
      ),
      data,
    );
  }

  private static createViewModelsFromCells(
    cells: SudokuGridCell[],
    id: string,
    rowIndex: number,
    data: SudokuGridViewModel["data"],
  ): SudokuGridCellViewModel[] {
    const maxValue = cells.length;
    const sqrt = Math.ceil(Math.sqrt(maxValue));
    const size = Math.max(32, 16 + 10 * sqrt);

    return cells.map((cell, index) =>
      SudokuGridViewModelConverter.createViewModelsFromCell(
        cell,
        id,
        data,
        maxValue,
        size,
        rowIndex,
        index,
      ),
    );
  }

  private static createViewModelsFromCell(
    cell: SudokuGridCell,
    id: string,
    data: SudokuGridViewModel["data"],
    maxValue: number,
    size: number,
    rowIndex: number,
    columnIndex: number,
  ): SudokuGridCellViewModel {
    return new SudokuGridCellViewModel(
      `${id}_cell-${rowIndex}-${columnIndex}`,
      cell,
      {
        ...data,
        cellPosition: new CellPosition(rowIndex, columnIndex),
        maxValue,
        widthAndHeight: size,
      },
    );
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
