import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { ClipboardService } from "@app/shared/util/clipboard-service";
import { isDefined } from "@app/shared/util/is-defined";
import { Observable, filter, first, map } from "rxjs";

@Component({
  selector: "app-sudoku-solver-settings",
  templateUrl: "./sudoku-solver-settings.component.html",
  styleUrls: ["./sudoku-solver-settings.component.scss"],
})
export class SudokuSolverSettingsComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  private clipboard = inject(ClipboardService);

  show$: Observable<boolean> = this.state
    .getCurrentBranch()
    .pipe(map(isDefined));
  delay$: Observable<number> = this.state.getDelay();
  maxSteps$: Observable<number> = this.state.getMaximumSteps();
  pauseAfterStep$: Observable<Nullable<number>> =
    this.state.getPauseAfterStep();
  highlightNumber$: Observable<Nullable<number>> =
    this.state.getHighlightNumber();

  setDelay(ms: Nullable<number>): void {
    this.state.setDelay(ms ?? 0);
  }

  setMaxSteps(max: Nullable<number>): void {
    this.state.setMaximumSteps(max ?? 0);
  }

  setPauseAfterStep(step: Nullable<number>): void {
    this.state.setPauseAfterStep(step);
  }

  setHighlightNumber(step: Nullable<number>): void {
    this.state.setHighlightNumber(step);
  }

  copyCurrentSudoku(): void {
    this.state
      .getCurrentBranch()
      .pipe(first(), filter(isDefined))
      .subscribe((grid: SudokuGridViewModel) =>
        this.clipboard.copyToClipboard(grid),
      );
  }
}
