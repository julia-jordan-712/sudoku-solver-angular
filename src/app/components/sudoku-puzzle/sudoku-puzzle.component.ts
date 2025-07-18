import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Hint } from "@app/components/general/hint-list/hint-list.component";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { SudokuSize } from "@app/types/sudoku-size";
import { isDefined } from "@app/util/is-defined";
import { Store } from "@ngrx/store";
import { Observable, filter } from "rxjs";
import { SectionComponent } from "../general/section/section.component";
import { IconComponent } from "../general/icon/icon.component";
import { SudokuGridComponent } from "../sudoku-grid/sudoku-grid.component";
import { SudokuPuzzleSolverSwitchComponent } from "../sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.component";
import { SudokuSizeSelectionComponent } from "../sudoku-size-selection/sudoku-size-selection.component";
import { HintListComponent } from "../general/hint-list/hint-list.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sudoku-puzzle",
  templateUrl: "./sudoku-puzzle.component.html",
  styleUrl: "./sudoku-puzzle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SectionComponent,
    IconComponent,
    SudokuGridComponent,
    SudokuPuzzleSolverSwitchComponent,
    SudokuSizeSelectionComponent,
    HintListComponent,
    AsyncPipe,
    TranslateModule,
  ],
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

  protected hints: Hint[] = [
    { id: "SET_SIZE", hint: { key: "HINTS.SET_SIZE" } },
    { id: "ENTER_VALUES", hint: { key: "HINTS.ENTER_VALUES" } },
    { id: "USE_KEYBOARD", hint: { key: "HINTS.USE_KEYBOARD" } },
    {
      id: "CONTINUE",
      hint: {
        key: "HINTS.CONTINUE_TO_SOLVER",
        params: { buttonName: { key: "SETTINGS.DONE" } },
      },
    },
  ];

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
