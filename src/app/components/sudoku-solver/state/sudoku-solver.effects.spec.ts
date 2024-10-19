import { TestBed } from "@angular/core/testing";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { AppState } from "@app/state";
import { TestState } from "@app/test/state/test-state";
import { Observable } from "rxjs";

describe(SudokuSolverEffects.name, () => {
  let actions$: Observable<any>;
  let underTest: SudokuSolverEffects;

  function setup(initialState?: AppState): void {
    TestBed.configureTestingModule({
      providers: [
        SudokuSolverService,
        ...SOLVER_PROVIDERS,
        SudokuSolverEffects,
        ...TestState.mockStoreProviders({ initialState, actions$ }),
      ],
    });

    underTest = TestBed.inject(SudokuSolverEffects);
  }

  it("should be created", () => {
    setup(TestState.createTestAppState());
    expect(underTest).toBeTruthy();
  });
});
