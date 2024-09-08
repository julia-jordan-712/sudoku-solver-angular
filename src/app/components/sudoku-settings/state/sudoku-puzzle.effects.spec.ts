import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";
import { SudokuPuzzleEffects } from "./sudoku-puzzle.effects";

describe(SudokuPuzzleEffects.name, () => {
  let actions$: Observable<any>;
  let effects: SudokuPuzzleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuPuzzleEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SudokuPuzzleEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
