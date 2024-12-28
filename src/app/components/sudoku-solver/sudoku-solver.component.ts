import { Component, inject } from "@angular/core";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Store } from "@ngrx/store";
import { filter, Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrls: ["./sudoku-solver.component.scss"],
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
  hideVerification$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectHideVerification,
  );
}
