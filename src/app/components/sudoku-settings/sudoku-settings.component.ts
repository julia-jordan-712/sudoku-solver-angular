import { Component, inject } from "@angular/core";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-settings/services/sudoku-dropdown-selection.service";
import {
  DuplicationColumnIndicesToRowIndices,
  SudokuSettingsStateService,
} from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-settings",
  templateUrl: "./sudoku-settings.component.html",
  styleUrls: ["./sudoku-settings.component.scss"],
})
export class SudokuSettingsComponent {
  private state = inject(SudokuSettingsStateService);

  confirmed$: Observable<boolean> = this.state.isConfirmed();
  size$: Observable<Nullable<number>> = this.state.getHeight();
  grid$: Observable<Nullable<SudokuGrid>> = this.state.getGrid();
  selectionItems: SudokuDropdownSelectionItem[] =
    this.state.getSelectionItems();
  selectedItem$: Observable<SudokuDropdownSelectionItem> =
    this.state.getSelectedItem();
  verification$: Observable<VerificationResult> = this.state.verification$;
  duplications$: Observable<DuplicationColumnIndicesToRowIndices> =
    this.state.duplicationColumnIndicesToRowIndices$;

  changeSettings(): void {
    this.state.setConfirmed(false);
  }

  submit(): void {
    this.state.setConfirmed(true);
  }

  onSelect(option: SudokuDropdownSelectionItem): void {
    this.state.setSelection(option);
  }

  onGridChange(grid: SudokuGrid): void {
    this.state.setGrid(grid);
  }

  setSize(size: number): void {
    this.state.setHeight(size);
    this.state.setWidth(size);
  }
}
