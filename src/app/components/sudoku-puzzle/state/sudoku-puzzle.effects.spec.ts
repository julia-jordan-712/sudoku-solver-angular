import { TestBed } from "@angular/core/testing";
import { TestState } from "@app/test/state/test-state";
import { Observable } from "rxjs";
import { SudokuPuzzleEffects } from "./sudoku-puzzle.effects";

describe(SudokuPuzzleEffects.name, () => {
  let actions$: Observable<any>;
  let effects: SudokuPuzzleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SudokuPuzzleEffects,
        ...TestState.mockStoreProviders({ actions$ }),
      ],
    });

    effects = TestBed.inject(SudokuPuzzleEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
