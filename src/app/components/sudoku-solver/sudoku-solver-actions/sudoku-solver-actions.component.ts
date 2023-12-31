import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-actions",
  templateUrl: "./sudoku-solver-actions.component.html",
  styleUrls: ["./sudoku-solver-actions.component.scss"],
})
export class SudokuSolverActionsComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  canStart$: Observable<boolean> = this.state.canStartExecuting();
  canPause$: Observable<boolean> = this.state.canPauseExecuting();
  canGoToNext$: Observable<boolean> = this.state.canGoToNextStep();
  canRestart$: Observable<boolean> = this.state.canRestart();

  start(): void {
    this.state.startExecuting();
  }

  pause(): void {
    this.state.pauseExecuting();
  }

  next(): void {
    this.state.executeNextStep();
  }

  restart(): void {
    this.state.restart();
  }
}
