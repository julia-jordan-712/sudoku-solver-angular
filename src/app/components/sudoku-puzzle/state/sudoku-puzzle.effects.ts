import { Injectable } from "@angular/core";
import { SudokuPuzzleGridUpdateService } from "@app/components/sudoku-puzzle/services/sudoku-puzzle-grid-update.service";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Injectable()
export class SudokuPuzzleEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private gridUpdate: SudokuPuzzleGridUpdateService,
  ) {}

  clearSelectedOptionOnSizeChangeByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.userChangeSize),
      map(() => SudokuPuzzleActions.clearSelectedOption()),
    );
  });

  setGridOnSelectedOptionChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.userSetSelectedOption),
      map((action) =>
        SudokuPuzzleActions.setSudoku({ sudoku: action.option?.data }),
      ),
    );
  });

  setHeightAndWidthOnSelectedOptionChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.userSetSelectedOption),
      map((action) =>
        SudokuPuzzleActions.setSize({
          height: action.option?.data?.length ?? 0,
          width: action.option?.data?.[0]?.length ?? 0,
        }),
      ),
    );
  });

  setHeightAndWidthOnSizeChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.userChangeSize),
      map((action) =>
        SudokuPuzzleActions.setSize({
          height: action.height,
          width: action.width,
        }),
      ),
    );
  });

  updateGridOnHeightOrWidthChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.setSize),
      concatLatestFrom(() =>
        this.store.select(SudokuPuzzleSelectors.selectState),
      ),
      map(([_, state]) => {
        return SudokuPuzzleActions.setSudoku({
          sudoku: this.gridUpdate.updateGrid(
            state.sudoku ?? [],
            state.height,
            state.width,
          ),
        });
      }),
    );
  });
}
