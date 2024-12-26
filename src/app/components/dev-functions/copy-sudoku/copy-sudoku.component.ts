import { Component, inject } from "@angular/core";
import { ClipboardService } from "@app/components/dev-functions/services/clipboard.service";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Store } from "@ngrx/store";
import { take, withLatestFrom } from "rxjs";

@Component({
  selector: "app-copy-sudoku",
  templateUrl: "./copy-sudoku.component.html",
  styleUrl: "./copy-sudoku.component.scss",
})
export class CopySudokuComponent {
  private store = inject(Store);
  private clipboard = inject(ClipboardService);

  protected copyCurrentSudoku(): void {
    this.store
      .select(SudokuPuzzleSelectors.selectIsConfirmed)
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
