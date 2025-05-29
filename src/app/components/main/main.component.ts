import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DevelopmentOpenComponent } from "../development/development-open/development-open.component";
import { HelpComponent } from "../help/help.component";
import { LanguageSelectionComponent } from "../language-selection/language-selection.component";
import { SudokuPuzzleComponent } from "../sudoku-puzzle/sudoku-puzzle.component";
import { SudokuSolverComponent } from "../sudoku-solver/sudoku-solver.component";
import { DevelopmentFunctionsComponent } from "../development/development-functions/development-functions.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DevelopmentOpenComponent,
        HelpComponent,
        LanguageSelectionComponent,
        SudokuPuzzleComponent,
        SudokuSolverComponent,
        DevelopmentFunctionsComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class MainComponent {
  private store: Store = inject(Store);

  showPuzzle$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsShown,
  );
}
