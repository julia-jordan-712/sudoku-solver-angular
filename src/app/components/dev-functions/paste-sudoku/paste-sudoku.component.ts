import { Component, inject } from "@angular/core";
import { ClipboardService } from "@app/components/dev-functions/services/clipboard.service";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { Logger } from "@app/core/log/logger";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map } from "rxjs";

@Component({
  selector: "app-paste-sudoku",
  templateUrl: "./paste-sudoku.component.html",
  styleUrl: "./paste-sudoku.component.scss",
})
export class PasteSudokuComponent {
  private store = inject(Store);
  private clipboard = inject(ClipboardService);

  protected pasteSudoku(): void {
    this.clipboard
      .getValue()
      .pipe(
        map((value) => JSON.parse(value.replaceAll("undefined", "null"))),
        catchError((error) => {
          new Logger(PasteSudokuComponent.name).logError(
            "Could not paste Sudoku from clipboard due to error",
            error,
          );
          return EMPTY;
        }),
      )
      .subscribe((value) =>
        this.store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: value })),
      );
  }
}
