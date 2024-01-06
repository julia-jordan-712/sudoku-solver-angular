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

  it("should solve 'medium puzzle 1' in 229 steps", () => {
    let puzzle: SudokuGrid[] = [
      SudokuGridUtil.clone(PuzzleMedium.PUZZLE_1.puzzle),
    ];
    const solver = new SolverEliminate();
    for (let i = 1; i <= 229; i++) {
      const response = solver.executeNextStep(puzzle);
      puzzle = response.branches;

      if (i < 229) {
        expect(response.status).toEqual("INCOMPLETE");
      } else {
        expect(response.status).toEqual("COMPLETE");
      }
    }
    expect(verify.verify(puzzle[0]).isValid()).toBeTrue();
  });
});
