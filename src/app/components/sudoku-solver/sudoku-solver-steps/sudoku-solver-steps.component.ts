import { Component, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-sudoku-solver-steps",
  templateUrl: "./sudoku-solver-steps.component.html",
  styleUrls: ["./sudoku-solver-steps.component.scss"],
})
export class SudokuSolverStepsComponent {
  private state = inject(SudokuSolverStateService);
  steps$: Observable<number> = this.state.getStepsExecuted();
  lastStep$: Observable<string> = this.state.getLastStep();
  lastStepI18nKey$: Observable<string> = this.lastStep$.pipe(
    map((step) => `SOLVER.STEPS.STEP.${step}`),
  );
}
