import { Injectable } from "@angular/core";
import { DevelopmentActions } from "@app/components/development/state/development.actions";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";

@Injectable()
export class DevelopmentEffects {
  constructor(private actions$: Actions) {}

  forwardTestSudokuToPuzzleActionsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DevelopmentActions.setTestSudoku),
      map((action) =>
        SudokuPuzzleActions.userSetSelectedOption({ option: action.sudoku }),
      ),
    );
  });
}
