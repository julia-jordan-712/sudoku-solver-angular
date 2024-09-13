import { TestBed } from "@angular/core/testing";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { TestState } from "@app/test/state/test-state";
import { Observable } from "rxjs";

describe(SudokuSolverEffects.name, () => {
  let actions$: Observable<any>;
  let effects: SudokuSolverEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SudokuSolverEffects,
        ...TestState.mockStoreProviders({ actions$ }),
      ],
    });

    effects = TestBed.inject(SudokuSolverEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
