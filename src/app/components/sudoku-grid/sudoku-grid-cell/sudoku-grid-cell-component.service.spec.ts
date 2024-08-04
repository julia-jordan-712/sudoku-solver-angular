import { TestBed } from "@angular/core/testing";
import { SudokuGridCellComponentService } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-component.service";

describe(SudokuGridCellComponentService.name, () => {
  let service: SudokuGridCellComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuGridCellComponentService],
    });
    service = TestBed.inject(SudokuGridCellComponentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
