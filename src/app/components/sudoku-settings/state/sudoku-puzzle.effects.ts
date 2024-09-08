import { Injectable } from "@angular/core";
import { SudokuSettingsGridUpdateService } from "@app/components/sudoku-settings/services/sudoku-settings-grid-update.service";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-settings/state/sudoku-puzzle.selectors";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { SudokuPuzzleActions } from "./sudoku-puzzle.actions";

@Injectable()
export class SudokuPuzzleEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private gridUpdate: SudokuSettingsGridUpdateService,
  ) {}

  setGridOnSelectedOptionChangeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuPuzzleActions.setSelectedOption),
      map((action) =>
        SudokuPuzzleActions.setSudoku({ sudoku: action.option.grid }),
      ),
    ),
  );

  setHeightAndWidthOnSelectedOptionChangeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuPuzzleActions.setSelectedOption),
      switchMap((action) => [
        SudokuPuzzleActions.setHeight({
          height: action.option.grid?.length ?? 0,
        }),
        SudokuPuzzleActions.setWidth({
          width: action.option.grid?.[0]?.length ?? 0,
        }),
      ]),
    ),
  );

  updateGridOnHeightOrWidthChangeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuPuzzleActions.setHeight, SudokuPuzzleActions.setWidth),
      withLatestFrom(this.store.select(SudokuPuzzleSelectors.selectState)),
      map(([_, state]) => {
        return SudokuPuzzleActions.setSudoku({
          sudoku: this.gridUpdate.updateGrid(
            state.sudoku ?? [],
            state.height,
            state.width,
          ),
        });
      }),
    ),
  );
}
