import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SectionComponent } from "../general/section/section.component";
import { IconComponent } from "../general/icon/icon.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sudoku-puzzle-solver-switch",
  templateUrl: "./sudoku-puzzle-solver-switch.component.html",
  styleUrl: "./sudoku-puzzle-solver-switch.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SectionComponent, IconComponent, AsyncPipe, TranslateModule],
})
export class SudokuPuzzleSolverSwitchComponent {
  private store: Store = inject(Store);

  submitPuzzleEnabled$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsConfirmEnabled,
  );
  showSubmitButton$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsShown,
  );

  changeSettings(): void {
    this.store.dispatch(SudokuPuzzleSolverSwitchActions.changePuzzle());
  }

  submit(): void {
    this.store.dispatch(SudokuPuzzleSolverSwitchActions.submitPuzzle());
  }
}
