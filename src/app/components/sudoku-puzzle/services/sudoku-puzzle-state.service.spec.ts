import { TestBed } from "@angular/core/testing";
import { SudokuDropdownSelectionService } from "@app/components/sudoku-puzzle/services/sudoku-dropdown-selection.service";
import { SudokuPuzzleGridUpdateService } from "@app/components/sudoku-puzzle/services/sudoku-puzzle-grid-update.service";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { TestState } from "@app/test/state/test-state";
import { TranslateTestingModule } from "ngx-translate-testing";
import { combineLatest, first } from "rxjs";
import { SudokuPuzzleStateService } from "./sudoku-puzzle-state.service";

describe(SudokuPuzzleStateService.name, () => {
  let gridUpdate: SudokuPuzzleGridUpdateService;
  let verify: VerifySolutionService;
  let underTest: SudokuPuzzleStateService;

  let selectionItems: SudokuDropdownSelectionItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations({})],
      providers: TestState.mockStoreProviders(),
    });
    gridUpdate = TestBed.inject(SudokuPuzzleGridUpdateService);
    verify = TestBed.inject(VerifySolutionService);
    underTest = TestBed.inject(SudokuPuzzleStateService);

    selectionItems = [
      { id: "None", name: "", grid: undefined },
      { id: "Puzzle4x4.COMPLETE", name: "", grid: Puzzle4x4.COMPLETE },
    ];
    spyOn(
      TestBed.inject(SudokuDropdownSelectionService),
      "getItems",
    ).and.returnValue(selectionItems);
  });

  describe("update", () => {
    let updateGridSpy: jasmine.Spy;

    beforeEach(() => {
      updateGridSpy = spyOn(gridUpdate, "updateGrid").and.callThrough();
      expect(updateGridSpy).not.toHaveBeenCalled();
    });

    it("should update the grid, height and width when height and width are set", (done) => {
      underTest.setHeightAndWidth(2, 2);
      updateGridSpy.calls.reset();

      underTest.setHeightAndWidth(4, 1);

      expect(updateGridSpy).toHaveBeenCalledOnceWith(
        [
          [undefined, undefined],
          [undefined, undefined],
        ],
        4,
        1,
      );
      expectGridHeightWidth(
        {
          grid: [[undefined], [undefined], [undefined], [undefined]],
          height: 4,
          width: 1,
        },
        done,
      );
    });

    it("should not update the grid, height and width when grid is set", (done) => {
      underTest.setGrid(Puzzle4x4.COMPLETE);

      expect(updateGridSpy).not.toHaveBeenCalled();
      expectGridHeightWidth(
        {
          grid: Puzzle4x4.COMPLETE,
          height: 4,
          width: 4,
        },
        done,
      );
    });

    it("should update the grid, height and width when selection is set", (done) => {
      const selection: SudokuDropdownSelectionItem = selectionItems[1];
      underTest.setSelection(selection);

      expect(updateGridSpy).toHaveBeenCalledOnceWith(Puzzle4x4.COMPLETE, 4, 4);
      expectGridHeightWidth(
        { grid: Puzzle4x4.COMPLETE, height: 4, width: 4, dropdown: selection },
        done,
      );
    });

    function expectGridHeightWidth(
      expected: {
        grid: Nullable<SudokuGrid>;
        height: Nullable<number>;
        width: Nullable<number>;
        dropdown?: SudokuDropdownSelectionItem;
      },
      done: DoneFn,
    ): void {
      combineLatest([
        underTest.getGrid(),
        underTest.getHeight(),
        underTest.getWidth(),
        underTest.getSelectedItem(),
      ])
        .pipe(first())
        .subscribe(([grid, height, width, selection]) => {
          expect(grid).toEqual(expected.grid);
          expect(height).toEqual(expected.height);
          expect(width).toEqual(expected.width);
          if (expected.dropdown) {
            expect(selection).toEqual(expected.dropdown);
          }
          done();
        });
    }
  });

  describe("verify", () => {
    let verifySpy: jasmine.Spy;
    const VERIFY_OPTIONS: VerificationOptions = {
      allowEmptyCells: true,
      trackUniquenessViolations: true,
    };

    beforeEach(() => {
      verifySpy = spyOn(verify, "verify").and.callThrough();
      expect(verifySpy).not.toHaveBeenCalled();
    });

    it("should verify the grid when height and width are set", (done) => {
      underTest.setHeightAndWidth(4, 0);

      expectVerification(false, done);
      expect(verifySpy).toHaveBeenCalledOnceWith(
        [[], [], [], []],
        VERIFY_OPTIONS,
      );
    });

    it("should verify the grid when width is set", (done) => {
      underTest.setHeightAndWidth(4, 1);

      expectVerification(false, done);
      expect(verifySpy).toHaveBeenCalledOnceWith(
        [[undefined], [undefined], [undefined], [undefined]],
        VERIFY_OPTIONS,
      );
    });

    it("should verify the grid when grid is set", (done) => {
      underTest.setGrid(Puzzle4x4.COMPLETE);

      expectVerification(true, done);
      expect(verifySpy).toHaveBeenCalledOnceWith(
        Puzzle4x4.COMPLETE,
        VERIFY_OPTIONS,
      );
    });

    it("should verify the grid when selection is set", (done) => {
      const selection: SudokuDropdownSelectionItem = selectionItems[1];
      underTest.setSelection(selection);

      expectVerification(true, done);
      expect(verifySpy).toHaveBeenCalledOnceWith(
        Puzzle4x4.COMPLETE,
        VERIFY_OPTIONS,
      );
    });

    function expectVerification(valid: boolean, done: DoneFn): void {
      underTest
        .getViewModel()
        .pipe(first())
        .subscribe((viewModel: SudokuGridViewModel) => {
          expect(viewModel.data.verificationResult?.isValid()).toEqual(valid);
          done();
        });
    }
  });
});
