import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SolverExecution } from "@app/types/solver-execution";
import { Store } from "@ngrx/store";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AsyncPipe, DecimalPipe } from "@angular/common";

@Component({
    selector: "app-sudoku-solver-status",
    templateUrl: "./sudoku-solver-status.component.html",
    styleUrl: "./sudoku-solver-status.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AsyncPipe,
        DecimalPipe,
        TranslateModule,
    ],
})
export class SudokuSolverStatusComponent {
  translate = inject(TranslateService);

  private store = inject(Store);
  state$: Observable<SolverExecution> = this.store.select(
    SudokuSolverSelectors.selectExecutionStatus,
  );
  time$: Observable<number> = this.store.select(
    SudokuSolverSelectors.selectTimeElapsedSeconds,
  );
}
