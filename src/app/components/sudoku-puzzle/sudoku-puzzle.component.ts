import { Component, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { SudokuSize } from "@app/types/sudoku-size";
import { isDefined } from "@app/util/is-defined";
import { Store } from "@ngrx/store";
import { Observable, filter } from "rxjs";

@Component({
  selector: "app-sudoku-puzzle",
  templateUrl: "./sudoku-puzzle.component.html",
  styleUrls: ["./sudoku-puzzle.component.scss"],
})
export class SudokuPuzzleComponent {
  private store: Store = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsShown,
  );
  protected size$: Observable<SudokuSize> = this.store.select(
    SudokuPuzzleSelectors.selectSize,
  );
  protected grid$: Observable<SudokuGridViewModel> = this.store
    .select(SudokuPuzzleSelectors.selectViewModel)
    .pipe(filter(isDefined));

  protected onCellChange(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  protected onCellSubmit(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  protected setSize(size: SudokuSize): void {
    this.store.dispatch(SudokuPuzzleActions.userChangeSize(size));
  }
}
