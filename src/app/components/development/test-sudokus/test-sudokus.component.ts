import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DevelopmentActions } from "@app/components/development/state/development.actions";
import { DevelopmentSelectors } from "@app/components/development/state/development.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DropdownComponent } from "../../general/dropdown/dropdown.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-test-sudokus",
  templateUrl: "./test-sudokus.component.html",
  styleUrl: "./test-sudokus.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DropdownComponent, AsyncPipe, TranslateModule],
})
export class TestSudokusComponent {
  private store: Store = inject(Store);

  protected selectionItems$: Observable<SudokuDropdownSelectionItem[]> =
    this.store.select(DevelopmentSelectors.selectTestSudokus);
  protected selectedItem$: Observable<Nullable<SudokuDropdownSelectionItem>> =
    this.store.select(DevelopmentSelectors.selectSelectedTestSudoku);

  protected onSelect(
    dropdownOption: Nullable<SudokuDropdownSelectionItem>,
  ): void {
    this.store.dispatch(
      DevelopmentActions.setTestSudoku({ sudoku: dropdownOption }),
    );
  }
}
