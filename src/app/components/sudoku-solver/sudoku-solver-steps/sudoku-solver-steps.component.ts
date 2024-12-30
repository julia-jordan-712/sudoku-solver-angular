import { Component, inject } from "@angular/core";
import { smoothHeightAnimation } from "@app/animations/smooth-height.directive";
import { smoothWidthAnimation } from "@app/animations/smooth-width.directive";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { I18nKey } from "@app/shared/types/i18n-key";
import { Nullable } from "@app/shared/types/nullable";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-steps",
  templateUrl: "./sudoku-solver-steps.component.html",
  styleUrls: ["./sudoku-solver-steps.component.scss"],
  animations: [smoothHeightAnimation, smoothWidthAnimation],
})
export class SudokuSolverStepsComponent {
  private store = inject(Store);
  steps$: Observable<number> = this.store.select(
    SudokuSolverSelectors.selectExecutedSteps,
  );
  lastStepI18nKey$: Observable<Nullable<I18nKey>> = this.store.select(
    SudokuSolverSelectors.selectLastStepI18nKey,
  );
}
