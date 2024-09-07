import { Component, inject } from "@angular/core";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-settings/services/sudoku-dropdown-selection.service";
import {
  DuplicationColumnIndicesToRowIndices,
  SudokuSettingsStateService,
} from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Observable, filter, first } from "rxjs";

@Component({
  selector: "app-sudoku-settings",
  templateUrl: "./sudoku-settings.component.html",
  styleUrls: ["./sudoku-settings.component.scss"],
})
export class SudokuSettingsComponent {
  private settingState = inject(SudokuSettingsStateService);
  private solverState = inject(SUDOKU_SOLVER_STATE);

  confirmEnabled$: Observable<boolean> = this.settingState.isConfirmEnabled();
  confirmed$: Observable<boolean> = this.settingState.isConfirmed();
  size$: Observable<Nullable<number>> = this.settingState.getHeight();
  grid$: Observable<SudokuGridViewModel> = this.settingState.getViewModel();
  selectionItems: SudokuDropdownSelectionItem[] =
    this.settingState.getSelectionItems();
  selectedItem$: Observable<SudokuDropdownSelectionItem> =
    this.settingState.getSelectedItem();
  duplications$: Observable<DuplicationColumnIndicesToRowIndices> =
    this.settingState.duplicationColumnIndicesToRowIndices$;

  changeSettings(): void {
    this.settingState.setConfirmed(false);
    this.solverState.reset();
  }

  submit(): void {
    this.settingState.setConfirmed(true);
    this.settingState
      .getGrid()
      .pipe(first(), filter(isDefined))
      .subscribe((puzzle: SudokuGrid) =>
        this.solverState.setInitialPuzzle(puzzle),
      );
  }

  onSelect(option: SudokuDropdownSelectionItem): void {
    this.settingState.setSelection(option);
  }

  onCellChange(grid: SudokuGrid): void {
    this.settingState.verifyGrid(grid);
  }

  onCellSubmit(grid: SudokuGrid): void {
    this.settingState.setGrid(grid);
  }

  setSize(size: number): void {
    this.settingState.clearSelection();
    this.settingState.setHeightAndWidth(size, size);
  }
}
