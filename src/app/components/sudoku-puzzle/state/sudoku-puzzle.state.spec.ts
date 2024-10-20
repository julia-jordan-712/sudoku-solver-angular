import { Signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { appStoreImports } from "@app/app.module";
import { SudokuPuzzleGridUpdateService } from "@app/components/sudoku-puzzle/services/sudoku-puzzle-grid-update.service";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { EffectsModule } from "@ngrx/effects";
import { Store } from "@ngrx/store";

describe("SudokuPuzzleState", () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...appStoreImports,
        EffectsModule.forFeature([SudokuPuzzleEffects]),
        EffectsModule.forFeature([SudokuSolverEffects]),
      ],
      providers: [...SOLVER_TEST_PROVIDERS],
    });

    store = TestBed.inject(Store);
  });

  describe("dependency between sudoku, selected option and size", () => {
    let height: Signal<Nullable<number>>;
    let width: Signal<Nullable<number>>;
    let selectedOption: Signal<Nullable<SudokuDropdownSelectionItem>>;
    let sudoku: Signal<Nullable<SudokuGrid>>;

    beforeEach(() => {
      height = store.selectSignal(SudokuPuzzleSelectors.selectHeight);
      width = store.selectSignal(SudokuPuzzleSelectors.selectWidth);
      selectedOption = store.selectSignal(
        SudokuPuzzleSelectors.selectSelectedOption,
      );
      sudoku = store.selectSignal(SudokuPuzzleSelectors.selectSudoku);

      store.dispatch(SudokuPuzzleActions.clearSelectedOption());
      store.dispatch(SudokuPuzzleActions.setSudoku({ sudoku: undefined }));

      expect(height()).toBeUndefined();
      expect(width()).toBeUndefined();
      expect(selectedOption()).toBeUndefined();
      expect(sudoku()).toBeUndefined();
    });

    it("should set sudoku and size to the grid from the selected option", () => {
      const newSelectedOption = { id: "", grid: PuzzleSimple.PUZZLE_5.puzzle };
      store.dispatch(
        SudokuPuzzleActions.userSetSelectedOption({
          option: newSelectedOption,
        }),
      );

      expect(height()).toEqual(9);
      expect(width()).toEqual(9);
      expect(selectedOption()).toEqual(newSelectedOption);
      expect(sudoku()).toEqual(newSelectedOption.grid);
    });

    it("should set sudoku and size to the grid from the selected option - also if it is the 'no selection' option", () => {
      store.dispatch(
        SudokuPuzzleActions.userSetSelectedOption({
          option: { id: "", grid: PuzzleSimple.PUZZLE_5.puzzle },
        }),
      );
      store.dispatch(
        SudokuPuzzleActions.userSetSelectedOption({
          option: SudokuPuzzleSelectionTestData.NO_SELECTION_ITEM,
        }),
      );

      expect(height()).toEqual(0);
      expect(width()).toEqual(0);
      expect(selectedOption()).toEqual(
        SudokuPuzzleSelectionTestData.NO_SELECTION_ITEM,
      );
      expect(sudoku()).toEqual([]);
    });

    it("should set sudoku to the size", () => {
      store.dispatch(
        SudokuPuzzleActions.userChangeSize({ height: 4, width: 4 }),
      );

      expect(height()).toEqual(4);
      expect(width()).toEqual(4);
      expect(selectedOption()).toBeUndefined();
      expect(sudoku()).toEqual(Puzzle4x4.EMPTY);
    });

    describe("calling service to update the grid", () => {
      let gridUpdateSpy: jasmine.Spy;

      beforeEach(() => {
        gridUpdateSpy = spyOn(
          TestBed.inject(SudokuPuzzleGridUpdateService),
          "updateGrid",
        ).and.callThrough();
      });

      it("should be called when user changes size", () => {
        // arrange
        store.dispatch(
          SudokuPuzzleActions.setSudoku({
            sudoku: PuzzleSimple.PUZZLE_2.solution,
          }),
        );
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(
          SudokuPuzzleActions.userChangeSize({ height: 4, width: 4 }),
        );

        // assert
        expect(gridUpdateSpy).toHaveBeenCalledOnceWith(
          PuzzleSimple.PUZZLE_2.solution,
          4,
          4,
        );
      });

      it("should be called when user changes selection", () => {
        // arrange
        store.dispatch(
          SudokuPuzzleActions.setSudoku({ sudoku: Puzzle4x4.COMPLETE }),
        );
        store.dispatch(SudokuPuzzleActions.setSize({ height: 4, width: 4 }));
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(
          SudokuPuzzleActions.userSetSelectedOption({
            option: { id: "TEST-ID", grid: PuzzleSimple.PUZZLE_1.puzzle },
          }),
        );

        // assert
        expect(gridUpdateSpy).toHaveBeenCalledOnceWith(
          PuzzleSimple.PUZZLE_1.puzzle,
          9,
          9,
        );
      });

      it("should be called when size is set", () => {
        // arrange
        store.dispatch(
          SudokuPuzzleActions.setSudoku({ sudoku: Puzzle4x4.COMPLETE }),
        );
        store.dispatch(SudokuPuzzleActions.setSize({ height: 4, width: 4 }));
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(SudokuPuzzleActions.setSize({ height: 7, width: 7 }));

        // assert
        expect(gridUpdateSpy).toHaveBeenCalledOnceWith(
          Puzzle4x4.COMPLETE,
          7,
          7,
        );
      });

      it("should NOT be called when selection is cleared", () => {
        // arrange
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(SudokuPuzzleActions.clearSelectedOption());

        // assert
        expect(gridUpdateSpy).not.toHaveBeenCalled();
      });

      it("should NOT be called when sudoku is updated", () => {
        // arrange
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(
          SudokuPuzzleActions.setSudoku({ sudoku: Puzzle4x4.COMPLETE }),
        );

        // assert
        expect(gridUpdateSpy).not.toHaveBeenCalled();
      });

      it("should NOT be called when settings are changed", () => {
        // arrange
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(SudokuPuzzleActions.changeSettings());

        // assert
        expect(gridUpdateSpy).not.toHaveBeenCalled();
      });

      it("should NOT be called when settings are submitted", () => {
        // arrange
        gridUpdateSpy.calls.reset();

        // act
        store.dispatch(SudokuPuzzleActions.submitSettings());

        // assert
        expect(gridUpdateSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("interaction with solver state", () => {
    it("should initialize the solver with this state when settings are submitted", () => {
      // arrange
      store.dispatch(
        SudokuPuzzleActions.setSudoku({
          sudoku: PuzzleSimple.PUZZLE_2.puzzle,
        }),
      );
      const initialPuzzle = store.selectSignal(
        SudokuSolverSelectors.selectInitialPuzzle,
      );
      const currentBranch = store.selectSignal(
        SudokuSolverSelectors.selectCurrentBranchViewModel,
      );
      expect(initialPuzzle()).toBeUndefined();
      expect(currentBranch()).toBeNull();

      // act
      store.dispatch(SudokuPuzzleActions.submitSettings());

      // assert
      expect(initialPuzzle()).toEqual(PuzzleSimple.PUZZLE_2.puzzle);
      expect(currentBranch()).toBeTruthy();
      expect(
        SudokuGridViewModelConverter.createGridFromViewModel(currentBranch()!),
      ).toEqual(PuzzleSimple.PUZZLE_2.puzzle);
    });

    it("should reset the solver state when settings are changed", () => {
      // arrange
      store.dispatch(
        SudokuPuzzleActions.setSudoku({
          sudoku: PuzzleSimple.PUZZLE_4.puzzle,
        }),
      );
      store.dispatch(SudokuPuzzleActions.submitSettings());
      const initialPuzzle = store.selectSignal(
        SudokuSolverSelectors.selectInitialPuzzle,
      );
      const currentBranch = store.selectSignal(
        SudokuSolverSelectors.selectCurrentBranchViewModel,
      );
      expect(initialPuzzle()).toEqual(PuzzleSimple.PUZZLE_4.puzzle);
      expect(currentBranch()).toBeTruthy();
      expect(
        SudokuGridViewModelConverter.createGridFromViewModel(currentBranch()!),
      ).toEqual(PuzzleSimple.PUZZLE_4.puzzle);

      // act
      store.dispatch(SudokuPuzzleActions.changeSettings());

      // assert
      expect(initialPuzzle()).toBeUndefined();
      expect(currentBranch()).toBeNull();
    });
  });
});
