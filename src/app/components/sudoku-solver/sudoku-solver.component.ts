import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Hint } from "@app/components/general/hint-list/hint-list.component";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Nullable } from "@app/types/nullable";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { isDefined } from "@app/util/is-defined";
import { Store } from "@ngrx/store";
import { filter, Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrl: "./sudoku-solver.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SudokuSolverComponent {
  private store = inject(Store);

  show$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectIsShown,
  );
  currentBranch$: Observable<SudokuGridViewModel> = this.store
    .select(SudokuSolverSelectors.selectCurrentBranchViewModel)
    .pipe(filter(isDefined));
  additionalBranches$: Observable<SudokuGridViewModel[]> = this.store.select(
    SudokuSolverSelectors.selectAdditionalBranchViewModels,
  );
  highlightNumber$: Observable<Nullable<number>> = this.store.select(
    SudokuSolverSelectors.selectHighlightNumber,
  );

  protected hints: Hint[] = [
    {
      id: "ACTION_BUTTONS",
      hint: {
        key: "HINTS.ACTION_BUTTONS",
        params: { name: { key: "SOLVER.ACTIONS.TITLE" } },
      },
    },
    { id: "SEE_CHANGES", hint: { key: "HINTS.SEE_CHANGES" } },
    {
      id: "CHANGE",
      hint: {
        key: "HINTS.CHANGE_PUZZLE",
        params: { buttonName: { key: "SETTINGS.CHANGE" } },
      },
    },
  ];
}
