import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Nullable } from "@app/shared/types/nullable";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-sudoku-solver-settings",
  templateUrl: "./sudoku-solver-settings.component.html",
  styleUrls: ["./sudoku-solver-settings.component.scss"],
})
export class SudokuSolverSettingsComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  show$: Observable<boolean> = this.state
    .getBranches()
    .pipe(map((branches) => branches.length > 0));
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
}
