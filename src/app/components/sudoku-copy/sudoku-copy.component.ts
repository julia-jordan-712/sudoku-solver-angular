import { Component, inject } from "@angular/core";
import { ClipboardService } from "@app/components/development-functions/services/clipboard.service";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Store } from "@ngrx/store";
import { take, withLatestFrom } from "rxjs";

@Component({
  selector: "app-sudoku-copy",
  templateUrl: "./sudoku-copy.component.html",
  styleUrl: "./sudoku-copy.component.scss",
})
export class SudokuCopyComponent {
  private store = inject(Store);
  private clipboard = inject(ClipboardService);

  protected copyCurrentSudoku(): void {
    this.store
      .select(SudokuSolverSelectors.selectIsShown)
      .pipe(
        withLatestFrom(
          this.store.select(SudokuPuzzleSelectors.selectViewModel),
          this.store.select(SudokuSolverSelectors.selectCurrentBranchViewModel),
        ),
        take(1),
      )
      .subscribe(([isSolving, puzzleViewModel, solverViewModel]) => {
        if (isSolving && solverViewModel) {
          this.clipboard.copy(solverViewModel);
        } else if (puzzleViewModel) {
          this.clipboard.copy(puzzleViewModel);
        }
      });
  }
}
