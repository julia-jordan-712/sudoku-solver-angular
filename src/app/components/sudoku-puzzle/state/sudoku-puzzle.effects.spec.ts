import { TestBed } from "@angular/core/testing";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { AppState } from "@app/state/app-state";
import { TestState } from "@app/test/state/test-state";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable } from "rxjs";

describe(SudokuPuzzleEffects.name, () => {
  let actions$: Observable<any>;
  let underTest: SudokuPuzzleEffects;

  function setup(initialState?: AppState): void {
    TestBed.configureTestingModule({
      providers: [
        SudokuPuzzleEffects,
        provideMockStore({
          initialState: initialState ?? TestState.createEmptyAppState(),
        }),
        provideMockActions(() => actions$),
      ],
    });

    underTest = TestBed.inject(SudokuPuzzleEffects);
  }

  it("should be created", () => {
    setup();
    expect(underTest).toBeTruthy();
  });
});
