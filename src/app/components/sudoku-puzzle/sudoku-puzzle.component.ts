import { Component, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
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

  show$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsShown,
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

  onSelect(option: Nullable<SudokuDropdownSelectionItem>): void {
    this.store.dispatch(SudokuPuzzleActions.userSetSelectedOption({ option }));
  }

  onCellChange(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  onCellSubmit(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  setSize(size: number): void {
    this.store.dispatch(
      SudokuPuzzleActions.userChangeSize({ height: size, width: size }),
    );
  }
}
