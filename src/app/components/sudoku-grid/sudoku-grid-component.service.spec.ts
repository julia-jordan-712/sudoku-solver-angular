import { TestBed } from "@angular/core/testing";
import { SudokuGridComponentService } from "@app/components/sudoku-grid/sudoku-grid-component.service";

describe(SudokuGridComponentService.name, () => {
  let service: SudokuGridComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SudokuGridComponentService] });
    service = TestBed.inject(SudokuGridComponentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
