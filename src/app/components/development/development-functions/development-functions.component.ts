import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DevelopmentActions } from "../state/development.actions";
import { DevelopmentSelectors } from "../state/development.selectors";
import { SectionComponent } from "../../general/section/section.component";
import { CloseButtonComponent } from "../../general/close-button/close-button.component";
import { SudokuCopyComponent } from "../../sudoku-copy/sudoku-copy.component";
import { SudokuPasteComponent } from "../../sudoku-paste/sudoku-paste.component";
import { RestartComponent } from "../../restart/restart.component";
import { TestSudokusComponent } from "../test-sudokus/test-sudokus.component";
import { SudokuSolverSettingsComponent } from "../../sudoku-solver-settings/sudoku-solver-settings.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-development-functions",
    templateUrl: "./development-functions.component.html",
    styleUrl: "./development-functions.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        SectionComponent,
        CloseButtonComponent,
        SudokuCopyComponent,
        SudokuPasteComponent,
        RestartComponent,
        TestSudokusComponent,
        SudokuSolverSettingsComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class DevelopmentFunctionsComponent {
  private store = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    DevelopmentSelectors.selectShowDevelopmentFunctions,
  );

  protected hideDevFunctions(): void {
    this.store.dispatch(
      DevelopmentActions.showDevelopmentFunctions({ show: false }),
    );
  }
}
