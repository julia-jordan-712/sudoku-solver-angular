import { Injectable } from "@angular/core";
import { SudokuPuzzleGridUpdateService } from "@app/components/sudoku-puzzle/services/sudoku-puzzle-grid-update.service";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
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

  initializeSolverOnSubmitSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.submitSettings),
      map(() => SudokuSolverActions.initializeFromPuzzleState()),
    );
  });

  resetSolverOnChangeSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.changeSettings),
      map(() => SudokuSolverActions.solverReset()),
    );
  });

  setGridOnSelectedOptionChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.userSetSelectedOption),
      map((action) =>
        SudokuPuzzleActions.setSudoku({ sudoku: action.option.grid }),
      ),
    );
  });

  setHeightAndWidthOnSelectedOptionChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.userSetSelectedOption),
      map((action) =>
        SudokuPuzzleActions.setSize({
          height: action.option.grid?.length ?? 0,
          width: action.option.grid?.[0]?.length ?? 0,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
