import { Component, inject } from "@angular/core";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-steps",
  templateUrl: "./sudoku-solver-steps.component.html",
  styleUrls: ["./sudoku-solver-steps.component.scss"],
})
export class SudokuSolverStepsComponent {
  private store = inject(Store);
  steps$: Observable<number> = this.store.select(
    SudokuSolverSelectors.selectExecutedSteps,
  );
  lastStepI18nKey$: Observable<string> = this.store.select(
    SudokuSolverSelectors.selectLastStepI18nKey,
  );
}
