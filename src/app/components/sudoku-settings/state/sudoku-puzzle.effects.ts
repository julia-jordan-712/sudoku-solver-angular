import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, Observable } from "rxjs";
import { concatMap } from "rxjs/operators";
import { SudokuPuzzleActions } from "./sudoku-puzzle.actions";

@Injectable()
export class SudokuPuzzleEffects {
  loadSudokuPuzzles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleActions.loadSudokuPuzzles),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>),
    );
  });

  constructor(private actions$: Actions) {}
}
