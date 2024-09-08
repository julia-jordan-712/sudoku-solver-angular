import { Injectable, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-settings/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-settings/state/sudoku-puzzle.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Store } from "@ngrx/store";
import { Observable, filter } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SudokuSettingsStateService {
  private store: Store = inject(Store);

  clearSelection(): void {
    this.store.dispatch(SudokuPuzzleActions.clearSelectedOption());
  }

  isConfirmEnabled(): Observable<boolean> {
    return this.store.select(SudokuPuzzleSelectors.selectIsConfirmEnabled);
  }

  isConfirmed(): Observable<boolean> {
    return this.store.select(SudokuPuzzleSelectors.selectIsConfirmed);
  }

  getHeight(): Observable<Nullable<number>> {
    return this.store.select(SudokuPuzzleSelectors.selectHeight);
  }

  getWidth(): Observable<Nullable<number>> {
    return this.store.select(SudokuPuzzleSelectors.selectWidth);
  }

  getGrid(): Observable<Nullable<SudokuGrid>> {
    return this.store.select(SudokuPuzzleSelectors.selectSudoku);
  }

  getViewModel(): Observable<SudokuGridViewModel> {
    return this.store
      .select(SudokuPuzzleSelectors.selectViewModel)
      .pipe(filter(isDefined));
  }

  getSelectionItems(): Observable<SudokuDropdownSelectionItem[]> {
    return this.store.select(SudokuPuzzleSelectors.selectSelectionOptions);
  }

  getSelectedItem(): Observable<Nullable<SudokuDropdownSelectionItem>> {
    return this.store.select(SudokuPuzzleSelectors.selectSelectedOption);
  }

  setConfirmed(confirmed: boolean): void {
    this.store.dispatch(SudokuPuzzleActions.setConfirmed({ confirmed }));
  }

  setSelection(item: SudokuDropdownSelectionItem): void {
    this.store.dispatch(
      SudokuPuzzleActions.setSelectedOption({ option: item }),
    );
  }

  setGrid(grid: Nullable<SudokuGrid>): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  verifyGrid(grid: Nullable<SudokuGrid>): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  setHeightAndWidth(height: number, width: number): void {
    this.store.dispatch(SudokuPuzzleActions.setHeight({ height }));
    this.store.dispatch(SudokuPuzzleActions.setWidth({ width }));
  }
}
