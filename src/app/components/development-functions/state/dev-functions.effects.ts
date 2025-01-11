import { Injectable } from "@angular/core";
import { DevFunctionActions } from "@app/components/development-functions/state/dev-functions.actions";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";

@Injectable()
export class DevFunctionsEffects {
  constructor(private actions$: Actions) {}

  forwardTestSudokuToPuzzleActionsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DevFunctionActions.setTestSudoku),
      map((action) =>
        SudokuPuzzleActions.userSetSelectedOption({ option: action.sudoku }),
      ),
    );
  });
}
