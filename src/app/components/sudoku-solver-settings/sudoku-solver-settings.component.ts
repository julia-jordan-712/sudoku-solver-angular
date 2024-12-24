import { Component, inject } from "@angular/core";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Nullable } from "@app/shared/types/nullable";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-settings",
  templateUrl: "./sudoku-solver-settings.component.html",
  styleUrls: ["./sudoku-solver-settings.component.scss"],
})
export class SudokuSolverSettingsComponent {
  private store = inject(Store);

  show$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectHasCurrentBranch,
  );
  delay$: Observable<number> = this.store.select(
    SudokuSolverSelectors.selectDelay,
  );
  maxSteps$: Observable<number> = this.store.select(
    SudokuSolverSelectors.selectMaxSteps,
  );
  pauseAfterStep$: Observable<Nullable<number>> = this.store.select(
    SudokuSolverSelectors.selectStepToBePausedAfter,
  );
  highlightNumber$: Observable<Nullable<number>> = this.store.select(
    SudokuSolverSelectors.selectHighlightNumber,
  );

  setDelay(ms: Nullable<number>): void {
    this.store.dispatch(SudokuSolverActions.setDelay({ delay: ms ?? 0 }));
  }

  setMaxSteps(max: Nullable<number>): void {
    this.store.dispatch(
      SudokuSolverActions.setMaximumSteps({ maxSteps: max ?? 0 }),
    );
  }

  setPauseAfterStep(step: Nullable<number>): void {
    this.store.dispatch(
      SudokuSolverActions.setStepToBePausedAfter({ pauseStep: step }),
    );
  }

  setHighlightNumber(highlight: Nullable<number>): void {
    this.store.dispatch(
      SudokuSolverActions.setNumberToBeHighlighted({ highlight: highlight }),
    );
  }
}
