import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IconComponent } from "../general/icon/icon.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sudoku-solver-actions",
  templateUrl: "./sudoku-solver-actions.component.html",
  styleUrl: "./sudoku-solver-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent, AsyncPipe, TranslateModule],
})
export class SudokuSolverActionsComponent {
  private store = inject(Store);
  canStart$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectCanStart,
  );
  canPause$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectCanPause,
  );
  canGoToNext$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectCanGoToNextStep,
  );
  canRestart$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectCanRestart,
  );
  isPaused$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectIsPaused,
  );

  start(): void {
    this.store.dispatch(SudokuSolverActions.solverStart());
  }

  pause(): void {
    this.store.dispatch(SudokuSolverActions.solverPause());
  }

  next(): void {
    this.store.dispatch(SudokuSolverActions.stepExecute());
  }

  restart(): void {
    this.store.dispatch(SudokuSolverActions.solverRestart());
  }
}
