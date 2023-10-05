import { TestBed } from "@angular/core/testing";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SolverEliminate } from "./solver-eliminate";

describe(SolverEliminate.name, () => {
  let verify: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [VerifySolutionService] });
    verify = TestBed.inject(VerifySolutionService);
  });

  [
    {
      puzzle: PuzzleSimple.PUZZLE_1.puzzle,
      name: "simple puzzle 1",
      steps: 151,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_2.puzzle,
      name: "simple puzzle 2",
      steps: 154,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_3.puzzle,
      name: "simple puzzle 3",
      steps: 162,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_4.puzzle,
      name: "simple puzzle 4",
      steps: 158,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_5.puzzle,
      name: "simple puzzle 5",
      steps: 154,
    },
  ].forEach((params) => {
    it(`should solve ${params.name} in ${params.steps} steps`, () => {
      let puzzle: SudokuGrid[] = [params.puzzle];
      const solver = new SolverEliminate(verify);
      for (let i = 1; i <= params.steps; i++) {
        const response = solver.executeNextStep(puzzle);
        puzzle = response.branches;

        if (i < params.steps) {
          expect(response.status).toEqual("INCOMPLETE");
        } else {
          expect(response.status).toEqual("COMPLETE");
        }
      }
      expect(verify.verify(puzzle[0]).isValid()).toBeTrue();
    });
  });

  it("should solve 111 steps of medium puzzle 1 and then fail", () => {
    let puzzle: SudokuGrid[] = [PuzzleMedium.PUZZLE_1.puzzle];
    const solver = new SolverEliminate(verify);
    for (let i = 1; i <= 111; i++) {
      const response = solver.executeNextStep(puzzle);
      puzzle = response.branches;

      if (i < 111) {
        expect(response.status).toEqual("INCOMPLETE");
      } else {
        expect(response.status).toEqual("FAILED");
      }
    }
    expect(verify.verify(puzzle[0]).isValid()).toBeTrue();
  });
});
