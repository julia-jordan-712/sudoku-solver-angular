import { TestBed } from "@angular/core/testing";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { SolverEliminate } from "./solver-eliminate";

describe(SolverEliminate.name, () => {
  let verify: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    verify = TestBed.inject(VerifySolutionService);
  });

  it("should solve 149 steps of medium puzzle 1 and then fail", () => {
    let puzzle: SudokuGrid[] = [
      SudokuGridUtil.clone(PuzzleMedium.PUZZLE_1.puzzle),
    ];
    const solver = new SolverEliminate();
    for (let i = 1; i <= 149; i++) {
      const response = solver.executeNextStep(puzzle);
      puzzle = response.branches;

      if (i < 149) {
        expect(response.status).toEqual("INCOMPLETE");
      } else {
        expect(response.status).toEqual("FAILED");
      }
    }
    expect(verify.verify(puzzle[0]).isValid()).toBeTrue();
  });
});
