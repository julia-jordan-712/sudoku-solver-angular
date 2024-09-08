import { TestBed } from "@angular/core/testing";
import {
  SudokuGridComponentService,
  SudokuGridRowChangeEvent,
} from "@app/components/sudoku-grid/sudoku-grid-component.service";
import { SudokuGrid, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { v4 as randomUUID } from "uuid";

describe(SudokuGridComponentService.name, () => {
  let service: SudokuGridComponentService;
  const viewModel: SudokuGridViewModel =
    SudokuGridViewModelConverter.createViewModelFromGrid(
      [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [undefined, undefined, 4, 1],
        [undefined, undefined, 2, 3],
      ],
      randomUUID(),
      { id: "test-id", isCurrent: true },
      null,
    );

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SudokuGridComponentService] });
    service = TestBed.inject(SudokuGridComponentService);
  });

  it("should return new grid when row changes", () => {
    const newRow: SudokuGridRow = [4, 1, 7, 0];

    const result: SudokuGridRowChangeEvent = service.rowChanged(
      viewModel,
      newRow,
      3,
    );

    const expected: SudokuGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [undefined, undefined, 4, 1],
      newRow,
    ];
    expect(result.gridChanged).toEqual(true);
    if (result.gridChanged) {
      expect(result.newGrid).toEqual(expected);
    }
  });

  [-1, 20].forEach((index) =>
    it(`should not return new grid if index is ${index}`, () => {
      const newRow: SudokuGridRow = [4, 1, 7, 0];

      const result: SudokuGridRowChangeEvent = service.rowChanged(
        viewModel,
        newRow,
        index,
      );

      expect(result.gridChanged).toEqual(false);
    }),
  );

  [0, 3, 5].forEach((length) =>
    it(`should not return new grid if new row has length ${length}`, () => {
      const newRow: SudokuGridRow = [];
      for (let i = 1; i <= length; i++) {
        newRow.push(i);
      }

      const result: SudokuGridRowChangeEvent = service.rowChanged(
        viewModel,
        newRow,
        0,
      );

      expect(result.gridChanged).toEqual(false);
    }),
  );
});
