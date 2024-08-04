import { TestBed } from "@angular/core/testing";
import { SudokuGridRowComponentService } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row-component.service";

describe(SudokuGridRowComponentService.name, () => {
  let service: SudokuGridRowComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuGridRowComponentService],
    });
    service = TestBed.inject(SudokuGridRowComponentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
