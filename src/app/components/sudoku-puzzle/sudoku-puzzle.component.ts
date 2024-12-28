import { Component, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/shared/types/nullable";
import { SingleSelectionInputOption } from "@app/shared/types/single-selection-input-option";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Store } from "@ngrx/store";
import { Observable, filter, map } from "rxjs";

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
  size$: Observable<Nullable<SudokuSizeSelectionItem>> = this.store
    .select(SudokuPuzzleSelectors.selectHeight)
    .pipe(map((size: number) => this.toSizeSelectionItem(size)));
  grid$: Observable<SudokuGridViewModel> = this.store
    .select(SudokuPuzzleSelectors.selectViewModel)
    .pipe(filter(isDefined));
  selectionItems$: Observable<SudokuDropdownSelectionItem[]> =
    this.store.select(SudokuPuzzleSelectors.selectSelectionOptions);
  selectedItem$: Observable<Nullable<SudokuDropdownSelectionItem>> =
    this.store.select(SudokuPuzzleSelectors.selectSelectedOption);

  protected selectionSizes: SudokuSizeSelectionItem[] = [4, 9, 16, 25].map(
    (size: number) => this.toSizeSelectionItem(size),
  );

  private toSizeSelectionItem(size: number): SudokuSizeSelectionItem {
    return {
      id: size.toString(),
      data: size,
      name: `${size}\u2009\u00d7\u2009${size}`,
    };
  }

  onSelect(dropdownOption: Nullable<SudokuDropdownSelectionItem>): void {
    this.store.dispatch(
      SudokuPuzzleActions.userSetSelectedOption({ option: dropdownOption }),
    );
  }

  onCellChange(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  onCellSubmit(grid: SudokuGrid): void {
    this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: grid }));
  }

  setSize(size: SudokuSizeSelectionItem): void {
    const newSize = size.data;
    if (newSize != undefined) {
      this.store.dispatch(
        SudokuPuzzleActions.userChangeSize({ height: newSize, width: newSize }),
      );
    }
  }
}

type SudokuSizeSelectionItem = SingleSelectionInputOption<number>;
