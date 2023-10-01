import { TestBed } from "@angular/core/testing";
import { SudokuSolverService } from "./sudoku-solver.service";

describe(SudokuSolverService.name, () => {
  let service: SudokuSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuSolverService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
