import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
  SudokuGridViewModel,
  SudokuGridViewModelBranchInfo,
} from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";

export class SudokuGridViewModelConverter {
  public static createViewModelFromGrid(
    grid: SudokuGrid,
    id: string,
    branchInfo: SudokuGridViewModelBranchInfo,
    verificationResult: Nullable<VerificationResult>,
  ): SudokuGridViewModel {
    const branchId: string | undefined = branchInfo?.isCurrent
      ? "CURRENT"
      : branchInfo?.id;
    const viewModelId: string = [id, branchId].filter(isDefined).join("_");
    return new SudokuGridViewModel(
      viewModelId,
      SudokuGridViewModelConverter.createViewModelsFromRows(
        grid,
        id,
        branchInfo,
        verificationResult,
      ),
      branchInfo,
      verificationResult,
    );
  }

  private static createViewModelsFromRows(
    rows: SudokuGridRow[],
    id: string,
    branchInfo: SudokuGridViewModelBranchInfo,
    verificationResult: Nullable<VerificationResult>,
  ): SudokuGridRowViewModel[] {
    return rows.map((row, index) =>
      SudokuGridViewModelConverter.createViewModelsFromRow(
        row,
        id,
        index,
        branchInfo,
        verificationResult,
      ),
    );
  }

  private static createViewModelsFromRow(
    row: SudokuGridRow,
    id: string,
    index: number,
    branchInfo: SudokuGridViewModelBranchInfo,
    verificationResult: Nullable<VerificationResult>,
  ): SudokuGridRowViewModel {
    return new SudokuGridRowViewModel(
      `${id}_row-${index}`,
      SudokuGridViewModelConverter.createViewModelsFromCells(
        row,
        id,
        index,
        branchInfo,
        verificationResult,
      ),
      branchInfo,
      verificationResult,
    );
  }

  private static createViewModelsFromCells(
    cells: SudokuGridCell[],
    id: string,
    rowIndex: number,
    branchInfo: SudokuGridViewModelBranchInfo,
    verificationResult: Nullable<VerificationResult>,
  ): SudokuGridCellViewModel[] {
    const maxValue = cells.length;
    const sqrt = Math.ceil(Math.sqrt(maxValue));
    const size = Math.max(32, 16 + 10 * sqrt);

    return cells.map((cell, index) =>
      SudokuGridViewModelConverter.createViewModelsFromCell(
        cell,
        maxValue,
        size,
        rowIndex,
        index,
        id,
        branchInfo,
        verificationResult,
      ),
    );
  }

  private static createViewModelsFromCell(
    cell: SudokuGridCell,
    maxValue: number,
    size: number,
    rowIndex: number,
    columnIndex: number,
    id: string,
    branchInfo: SudokuGridViewModelBranchInfo,
    verificationResult: Nullable<VerificationResult>,
  ): SudokuGridCellViewModel {
    return new SudokuGridCellViewModel(
      `${id}_cell-${rowIndex}-${columnIndex}`,
      cell,
      maxValue,
      size,
      branchInfo,
      verificationResult,
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
