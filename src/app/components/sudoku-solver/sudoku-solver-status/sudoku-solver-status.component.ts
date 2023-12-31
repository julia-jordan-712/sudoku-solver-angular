import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-status",
  templateUrl: "./sudoku-solver-status.component.html",
  styleUrls: ["./sudoku-solver-status.component.scss"],
})
export class SudokuSolverStatusComponent {
  translate = inject(TranslateService);

  private state = inject(SUDOKU_SOLVER_STATE);
  state$: Observable<SolverExecution> = this.state.getExecutionState();

  getTime(): number {
    return this.state.getTimeElapsed() / 1000;
  }
}
