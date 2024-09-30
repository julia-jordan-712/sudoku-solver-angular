import { Component, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Store } from "@ngrx/store";
import { Observable, filter } from "rxjs";

@Component({
  selector: "app-sudoku-puzzle",
  templateUrl: "./sudoku-puzzle.component.html",
  styleUrls: ["./sudoku-puzzle.component.scss"],
})
export class SudokuPuzzleComponent {
  private store: Store = inject(Store);

  confirmEnabled$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsConfirmEnabled,
  );
  confirmed$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsConfirmed,
  );
  size$: Observable<Nullable<number>> = this.store.select(
    SudokuPuzzleSelectors.selectHeight,
  );
  grid$: Observable<SudokuGridViewModel> = this.store
    .select(SudokuPuzzleSelectors.selectViewModel)
    .pipe(filter(isDefined));
  selectionItems$: Observable<SudokuDropdownSelectionItem[]> =
    this.store.select(SudokuPuzzleSelectors.selectSelectionOptions);
  selectedItem$: Observable<Nullable<SudokuDropdownSelectionItem>> =
    this.store.select(SudokuPuzzleSelectors.selectSelectedOption);

  changeSettings(): void {
    this.store.dispatch(SudokuPuzzleActions.setConfirmed({ confirmed: false }));
    this.store.dispatch(SudokuSolverActions.solverReset());
  }

  submit(): void {
    this.store.dispatch(SudokuPuzzleActions.setConfirmed({ confirmed: true }));
    this.store.dispatch(SudokuSolverActions.initializeFromPuzzleState());
  }

  onSelect(option: SudokuDropdownSelectionItem): void {
    this.store.dispatch(SudokuPuzzleActions.setSelectedOption({ option }));
  }

  onCellChange(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  onCellSubmit(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  setSize(size: number): void {
    this.store.dispatch(SudokuPuzzleActions.clearSelectedOption());
    this.store.dispatch(SudokuPuzzleActions.setHeight({ height: size }));
    this.store.dispatch(SudokuPuzzleActions.setWidth({ width: size }));
  }
}