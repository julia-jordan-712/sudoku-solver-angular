import { Component, inject } from "@angular/core";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-settings/services/sudoku-dropdown-selection.service";
import {
  DuplicationColumnIndicesToRowIndices,
  SudokuSettingsStateService,
} from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Observable, filter, first, map } from "rxjs";
import { v4 as randomUUID } from "uuid";

@Component({
  selector: "app-sudoku-settings",
  templateUrl: "./sudoku-settings.component.html",
  styleUrls: ["./sudoku-settings.component.scss"],
})
export class SudokuSettingsComponent {
  private settingState = inject(SudokuSettingsStateService);
  private solverState = inject(SUDOKU_SOLVER_STATE);

  confirmed$: Observable<boolean> = this.settingState.isConfirmed();
  size$: Observable<Nullable<number>> = this.settingState.getHeight();
  grid$: Observable<Nullable<SudokuGridViewModel>> = this.settingState
    .getGrid()
    .pipe(
      filter(isDefined),
      map((grid) =>
        SudokuGridViewModelConverter.createViewModelFromGrid(
          grid,
          randomUUID(),
        ),
      ),
    );
  selectionItems: SudokuDropdownSelectionItem[] =
    this.settingState.getSelectionItems();
  selectedItem$: Observable<SudokuDropdownSelectionItem> =
    this.settingState.getSelectedItem();
  verification$: Observable<VerificationResult> =
    this.settingState.verification$;
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
      .subscribe((puzzle) => this.solverState.setInitialPuzzle(puzzle));
  }

  onSelect(option: SudokuDropdownSelectionItem): void {
    this.settingState.setSelection(option);
  }

  onGridChange(grid: SudokuGrid): void {
    this.settingState.setGrid(grid);
  }

  setSize(size: number): void {
    this.settingState.clearSelection();
    this.settingState.setHeightAndWidth(size, size);
  }
}
