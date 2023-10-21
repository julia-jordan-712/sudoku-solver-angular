import { Component, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
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

  private state = inject(SudokuSolverStateService);
  state$: Observable<SolverExecution> = this.state.getExecutionState();

  getTime(): number {
    return this.state.getTimeElapsed() / 1000;
  }
}
