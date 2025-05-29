import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IconComponent } from "../general/icon/icon.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-sudoku-solver-speed",
    templateUrl: "./sudoku-solver-speed.component.html",
    styleUrl: "./sudoku-solver-speed.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        IconComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class SudokuSolverSpeedComponent {
  private store = inject(Store);

  protected isNormalSpeed$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectSpeedIsNormal,
  );
  protected canGoFaster$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectSpeedCanIncrease,
  );

  protected slower(): void {
    this.store.dispatch(SudokuSolverActions.speedSlower({ ms: 200 }));
  }
  protected normal(): void {
    this.store.dispatch(SudokuSolverActions.speedNormal());
  }
  protected faster(): void {
    this.store.dispatch(SudokuSolverActions.speedFaster({ ms: 200 }));
  }
}
