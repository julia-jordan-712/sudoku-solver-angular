import { Component, inject } from "@angular/core";
import { ClipboardService } from "@app/components/dev-functions/services/clipboard.service";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Store } from "@ngrx/store";
import { filter, first, Observable } from "rxjs";

@Component({
  selector: "app-copy-sudoku",
  templateUrl: "./copy-sudoku.component.html",
  styleUrl: "./copy-sudoku.component.scss",
})
export class CopySudokuComponent {
  private store = inject(Store);
  private clipboard = inject(ClipboardService);

  protected show$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsConfirmed,
  );

  copyCurrentSudoku(): void {
    this.store
      .select(SudokuSolverSelectors.selectCurrentBranchViewModel)
      .pipe(first(), filter(isDefined))
      .subscribe((grid: SudokuGridViewModel) => this.clipboard.copy(grid));
  }
}
