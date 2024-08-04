import { SimpleChange } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  SudokuGridCellChangeEvent,
  SudokuGridRowComponentService,
} from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row-component.service";
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/shared/types/sudoku-grid";
import { SudokuGridRowViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { TestSubscription } from "@app/test/test-subscription";

describe(SudokuGridRowComponentService.name, () => {
  let service: SudokuGridRowComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuGridRowComponentService],
    });
    service = TestBed.inject(SudokuGridRowComponentService);
  });

  function setRow(row: SudokuGridRow): SudokuGridRowViewModel {
    const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.EMPTY);
    grid[0] = row;
    const viewModel: SudokuGridRowViewModel =
      SudokuGridViewModelConverter.createViewModelFromGrid(grid).rows[0];
    service.setRow(viewModel);
    return viewModel;
  }

  describe("cell changed", () => {
    it("should return new row when cell changes", () => {
      const row: SudokuGridRow = [1, 2, 3, 4];
      setRow(row);
      const newCell: SudokuGridCell = [4, 1, 7, 0];

      const result: SudokuGridCellChangeEvent = service.cellChanged(newCell, 3);

      const expected: SudokuGridRow = [1, 2, 3, newCell];
      expect(result.rowChanged).toEqual(true);
      if (result.rowChanged) {
        expect(result.newRow).toEqual(expected);
      }
    });

    [-1, 20].forEach((index) =>
      it(`should not return new row if index is ${index}`, () => {
        setRow(Puzzle4x4.COMPLETE[0]);
        const newCell: SudokuGridCell = 1;

        const result: SudokuGridCellChangeEvent = service.cellChanged(
          newCell,
          index,
        );

        expect(result.rowChanged).toEqual(false);
      }),
    );

    [0, 5].forEach((length) =>
      it(`should not return new row if new cell is an array with length ${length}`, () => {
        setRow(Puzzle4x4.COMPLETE[0]);
        const newCell: SudokuGridCell = [];
        for (let i = 1; i <= length; i++) {
          newCell.push(i);
        }

        const result: SudokuGridCellChangeEvent = service.cellChanged(
          newCell,
          0,
        );

        expect(result.rowChanged).toEqual(false);
      }),
    );
  });

  describe("highlighting of cells", () => {
    [
      { value: 1, expected: [true, false, true, false] },
      { value: 2, expected: [false, false, true, false] },
      { value: 3, expected: [false, false, false, true] },
      { value: 4, expected: [false, true, false, false] },
    ].forEach((params) => {
      it(`should return ${params.expected} when highlighting ${params.value} in row [1, 4, [1, 2], [3]]`, async () => {
        setRow([1, 4, [1, 2], [3]]);

        const highlighted = TestSubscription.start(service.getHighlightCells());

        service.setHighlightNumber(params.value);
        service.onChanges({
          highlightNumber: new SimpleChange(undefined, params.value, true),
        });

        const result: boolean[] = await highlighted.getValue();
        expect(result).toEqual(params.expected);

        highlighted.destroy();
      });
    });

    it("should clear previous highlighting if there is no match anymore", async () => {
      setRow([1, 4, undefined, [3]]);

      const highlighted = TestSubscription.start(service.getHighlightCells());

      service.setHighlightNumber(1);
      service.onChanges({
        highlightNumber: new SimpleChange(undefined, 1, true),
      });

      let result: boolean[] = await highlighted.getValue();
      expect(result).toEqual([true, false, false, false]);

      service.setHighlightNumber(2);
      service.onChanges({
        highlightNumber: new SimpleChange(undefined, 2, true),
      });

      result = await highlighted.getValue();
      expect(result).toEqual([false, false, false, false]);

      expect(await highlighted.getValues()).toEqual([
        [true, false, false, false],
        [false, false, false, false],
      ]);

      highlighted.destroy();
    });
  });
});
