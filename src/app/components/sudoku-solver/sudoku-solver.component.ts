import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Hint } from "@app/components/general/hint-list/hint-list.component";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Nullable } from "@app/types/nullable";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { isDefined } from "@app/util/is-defined";
import { Store } from "@ngrx/store";
import { filter, Observable } from "rxjs";
import { SectionComponent } from "../general/section/section.component";
import { SudokuGridComponent } from "../sudoku-grid/sudoku-grid.component";
import { SudokuPuzzleSolverSwitchComponent } from "../sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.component";
import { SudokuSolverActionsComponent } from "../sudoku-solver-actions/sudoku-solver-actions.component";
import { SudokuSolverSpeedComponent } from "../sudoku-solver-speed/sudoku-solver-speed.component";
import { SudokuSolverStatusComponent } from "../sudoku-solver-status/sudoku-solver-status.component";
import { SudokuSolverBranchesComponent } from "../sudoku-solver-branches/sudoku-solver-branches.component";
import { SudokuSolverStepsComponent } from "../sudoku-solver-steps/sudoku-solver-steps.component";
import { HintListComponent } from "../general/hint-list/hint-list.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrl: "./sudoku-solver.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SectionComponent,
    SudokuGridComponent,
    SudokuPuzzleSolverSwitchComponent,
    SudokuSolverActionsComponent,
    SudokuSolverSpeedComponent,
    SudokuSolverStatusComponent,
    SudokuSolverBranchesComponent,
    SudokuSolverStepsComponent,
    HintListComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class SudokuSolverComponent {
  private store = inject(Store);

  show$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectIsShown,
  );
  currentBranch$: Observable<SudokuGridViewModel> = this.store
    .select(SudokuSolverSelectors.selectCurrentBranchViewModel)
    .pipe(filter(isDefined));
  additionalBranches$: Observable<SudokuGridViewModel[]> = this.store.select(
    SudokuSolverSelectors.selectAdditionalBranchViewModels,
  );
  highlightNumber$: Observable<Nullable<number>> = this.store.select(
    SudokuSolverSelectors.selectHighlightNumber,
  );

  protected hints: Hint[] = [
    {
      id: "ACTION_BUTTONS",
      hint: {
        key: "HINTS.ACTION_BUTTONS",
        params: { name: { key: "SOLVER.ACTIONS.TITLE" } },
      },
    },
    { id: "SEE_CHANGES", hint: { key: "HINTS.SEE_CHANGES" } },
    {
      id: "CHANGE",
      hint: {
        key: "HINTS.CHANGE_PUZZLE",
        params: { buttonName: { key: "SETTINGS.CHANGE" } },
      },
    },
  ];
}
