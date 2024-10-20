import { TestBed } from "@angular/core/testing";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleExtreme } from "@app/test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@app/test/puzzles/puzzle-hard";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SudokuSolverService } from "./sudoku-solver.service";

describe(SudokuSolverService.name, () => {
  let service: SudokuSolverService;
  let verify: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...SOLVER_PROVIDERS],
    });

    service = TestBed.inject(SudokuSolverService);
    verify = TestBed.inject(VerifySolutionService);
  });

  [
    {
      puzzle: PuzzleSimple.PUZZLE_1.puzzle,
      name: "simple puzzle 1",
      steps: 11,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_2.puzzle,
      name: "simple puzzle 2",
      steps: 17,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_3.puzzle,
      name: "simple puzzle 3",
      steps: 13,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_4.puzzle,
      name: "simple puzzle 4",
      steps: 17,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_5.puzzle,
      name: "simple puzzle 5",
      steps: 15,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_1.puzzle,
      name: "medium puzzle 1",
      steps: 49,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_2.puzzle,
      name: "medium puzzle 2",
      steps: 45,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_3.puzzle,
      name: "medium puzzle 3",
      steps: 55,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_4.puzzle,
      name: "medium puzzle 4",
      steps: 23,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_5.puzzle,
      name: "medium puzzle 5",
      steps: 45,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_1.puzzle,
      name: "advanced puzzle 1",
      steps: 55,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_2.puzzle,
      name: "advanced puzzle 2",
      steps: 59,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_3.puzzle,
      name: "advanced puzzle 3",
      steps: 61,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_4.puzzle,
      name: "advanced puzzle 4",
      steps: 58,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_5.puzzle,
      name: "advanced puzzle 5",
      steps: 49,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_1.puzzle,
      name: "hard puzzle 1",
      steps: 52,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_2.puzzle,
      name: "hard puzzle 2",
      steps: 56,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_3.puzzle,
      name: "hard puzzle 3",
      steps: 54,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_4.puzzle,
      name: "hard puzzle 4",
      steps: 52,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_5.puzzle,
      name: "hard puzzle 5",
      steps: 63,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_1.puzzle,
      name: "extreme puzzle 1",
      steps: 64,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_2.puzzle,
      name: "extreme puzzle 2",
      steps: 61,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_3.puzzle,
      name: "extreme puzzle 3",
      steps: 53,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_4.puzzle,
      name: "extreme puzzle 4",
      steps: 106,
      branches: 3,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_5.puzzle,
      name: "extreme puzzle 5",
      steps: 63,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_6.puzzle,
      name: "extreme puzzle 6",
      steps: 63,
      branches: 1,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_7.puzzle,
      name: "extreme puzzle 7",
      steps: 83,
      branches: 1,
      success: true,
    },
  ].forEach((params) => {
    it(`should ${params.success ? "" : "fail to"} solve "${params.name}" in ${params.steps} steps and ${params.branches} branch/es`, () => {
      let amountOfSteps = 0;
      let amountOfBranches = 1;
      let response: SolverResponse = {
        branches: [
          SolverBranch.createInitialBranch(SudokuGridUtil.clone(params.puzzle)),
        ],
        status: "UNKNOWN",
        stepId: "",
      };
      do {
        const branchesBeforeStep = response.branches.length;
        response = service.solveNextStep(response);
        if (response.branches.length === branchesBeforeStep + 1) {
          amountOfBranches++;
        }
        amountOfSteps++;
      } while (
        amountOfSteps < 100000 &&
        response.status !== "COMPLETE" &&
        response.status !== "FAILED"
      );

      expect(amountOfSteps).toEqual(params.steps);
      expect(amountOfBranches).toEqual(params.branches);
      if (params.success) {
        expect(response.status).toEqual("COMPLETE");
        expect(response.branches.length).toEqual(1);
        expect(response.branches[0]);
      } else {
        expect(response.status).toEqual("FAILED");
      }
      response.branches.forEach((branch) =>
        expect(verify.verify(branch.grid).isValid()).toBeTrue(),
      );
    });
  });
});
