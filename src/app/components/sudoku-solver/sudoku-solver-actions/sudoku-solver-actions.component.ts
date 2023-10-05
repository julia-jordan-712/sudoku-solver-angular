import { Component, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-actions",
  templateUrl: "./sudoku-solver-actions.component.html",
  styleUrls: ["./sudoku-solver-actions.component.scss"],
})
export class SudokuSolverActionsComponent {
  translate = inject(TranslateService);

  private state = inject(SudokuSolverStateService);
  canStart$: Observable<boolean> = this.state.canStartExecuting();
  canPause$: Observable<boolean> = this.state.canPauseExecuting();
  canGoToNext$: Observable<boolean> = this.state.canGoToNextStep();
  state$: Observable<SolverExecution> = this.state.getExecutionState();
  maxSteps$: Observable<number> = this.state.getMaximumSteps();
  steps$: Observable<number> = this.state.getStepsExecuted();

  start(): void {
    this.state.startExecuting();
  }

  pause(): void {
    this.state.pauseExecuting();
  }

  next(): void {
    this.state.executeNextStep();
  }

  setMaxSteps(max: number): void {
    this.state.setMaxSteps(max);
  }

  getTime(): number {
    return this.state.getTimeElapsed() / 1000;
  }
}
