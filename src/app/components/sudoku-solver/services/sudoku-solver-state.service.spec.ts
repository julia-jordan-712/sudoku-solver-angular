import { TestBed } from "@angular/core/testing";

import { SudokuSolverStateService } from "./sudoku-solver-state.service";

describe("SudokuSolverStateService", () => {
  let service: SudokuSolverStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuSolverStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
