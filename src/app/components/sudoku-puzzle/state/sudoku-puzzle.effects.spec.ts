import { TestBed } from "@angular/core/testing";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { TestState } from "@app/test/state/test-state";
import { Observable } from "rxjs";

describe(SudokuPuzzleEffects.name, () => {
  let actions$: Observable<any>;
  let effects: SudokuPuzzleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SudokuPuzzleEffects,
        ...TestState.mockStateProviders({ actions$ }),
      ],
    });

    effects = TestBed.inject(SudokuPuzzleEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
