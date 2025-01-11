import { Component, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-test-sudokus",
  templateUrl: "./test-sudokus.component.html",
  styleUrl: "./test-sudokus.component.scss",
})
export class TestSudokusComponent {
  private store: Store = inject(Store);

  protected selectionItems$: Observable<SudokuDropdownSelectionItem[]> =
    this.store.select(SudokuPuzzleSelectors.selectSelectionOptions);
  protected selectedItem$: Observable<Nullable<SudokuDropdownSelectionItem>> =
    this.store.select(SudokuPuzzleSelectors.selectSelectedOption);

  protected onSelect(
    dropdownOption: Nullable<SudokuDropdownSelectionItem>,
  ): void {
    this.store.dispatch(
      SudokuPuzzleActions.userSetSelectedOption({ option: dropdownOption }),
    );
  }
}
