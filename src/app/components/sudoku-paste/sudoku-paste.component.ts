import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { ClipboardService } from "@app/core/clipboard/clipboard.service";
import { Logger } from "@app/core/log/logger";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { isSudoku } from "@app/util/is-sudoku-grid";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, filter, map, Observable } from "rxjs";
import { IconComponent } from "../general/icon/icon.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sudoku-paste",
  templateUrl: "./sudoku-paste.component.html",
  styleUrl: "./sudoku-paste.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent, AsyncPipe, TranslateModule],
})
export class SudokuPasteComponent {
  private logger = new Logger(SudokuPasteComponent.name);
  private store = inject(Store);
  private clipboard = inject(ClipboardService);

  protected disabled$: Observable<boolean> = this.store.select(
    SudokuSolverSelectors.selectIsShown,
  );

  protected pasteSudoku(): void {
    this.clipboard
      .getValue()
      .pipe(
        map((value) => JSON.parse(value)),
        filter(isSudoku),
        catchError((error) => {
          this.logError(error);
          return EMPTY;
        }),
      )
      .subscribe((sudokuGrid: SudokuGrid) => {
        this.store.dispatch(
          SudokuPuzzleActions.userSetSelectedOption({
            option: {
              id: undefined,
              data: sudokuGrid,
            },
          }),
        );
        this.logger.logInfo("Pasted Sudoku from clipboard", sudokuGrid);
      });
  }

  private logError(error: any): void {
    if (this.isError(error)) {
      if (error.name === "SyntaxError") {
        this.logger.logDebug("Could not parse clipboard content");
      } else {
        this.logGeneralError(error);
      }
    } else {
      this.logGeneralError(error);
    }
  }

  private logGeneralError(error: any): void {
    this.logger.logError(
      "Could not paste Sudoku from clipboard due to error",
      error,
    );
  }

  private isError(error: any): error is Error {
    return !!(error as Error).name;
  }
}
