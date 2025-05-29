import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { I18nKey } from "@app/types/i18n-key";
import { Nullable } from "@app/types/nullable";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SudokuSolverLastStepDescriptionComponent } from "./sudoku-solver-last-step-description/sudoku-solver-last-step-description.component";
import { AsyncPipe } from "@angular/common";
import { I18nKeyPipe } from "@app/pipes/translate-i18n-key/i18n-key.pipe";

@Component({
    selector: "app-sudoku-solver-steps",
    templateUrl: "./sudoku-solver-steps.component.html",
    styleUrl: "./sudoku-solver-steps.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        SudokuSolverLastStepDescriptionComponent,
        AsyncPipe,
        I18nKeyPipe,
    ],
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
