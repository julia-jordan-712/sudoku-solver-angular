import { TestBed } from "@angular/core/testing";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
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
      providers: [
        ...SOLVER_PROVIDERS,
        SudokuSolverStateService,
        {
          provide: SUDOKU_SOLVER_STATE,
          useExisting: SudokuSolverStateService,
        },
      ],
    });

    service = TestBed.inject(SudokuSolverService);
    verify = TestBed.inject(VerifySolutionService);
  });

  [
    {
      puzzle: PuzzleSimple.PUZZLE_1.puzzle,
      name: "simple puzzle 1",
      steps: 178,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_2.puzzle,
      name: "simple puzzle 2",
      steps: 163,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_3.puzzle,
      name: "simple puzzle 3",
      steps: 180,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_4.puzzle,
      name: "simple puzzle 4",
      steps: 175,
      success: true,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_5.puzzle,
      name: "simple puzzle 5",
      steps: 165,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_1.puzzle,
      name: "medium puzzle 1",
      steps: 239,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_2.puzzle,
      name: "medium puzzle 2",
      steps: 226,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_3.puzzle,
      name: "medium puzzle 3",
      steps: 178,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_4.puzzle,
      name: "medium puzzle 4",
      steps: 241,
      success: true,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_5.puzzle,
      name: "medium puzzle 5",
      steps: 216,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_1.puzzle,
      name: "advanced puzzle 1",
      steps: 205,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_2.puzzle,
      name: "advanced puzzle 2",
      steps: 235,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_3.puzzle,
      name: "advanced puzzle 3",
      steps: 196,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_4.puzzle,
      name: "advanced puzzle 4",
      steps: 183,
      success: true,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_5.puzzle,
      name: "advanced puzzle 5",
      steps: 240,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_1.puzzle,
      name: "hard puzzle 1",
      steps: 232,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_2.puzzle,
      name: "hard puzzle 2",
      steps: 210,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_3.puzzle,
      name: "hard puzzle 3",
      steps: 203,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_4.puzzle,
      name: "hard puzzle 4",
      steps: 195,
      success: true,
    },
    {
      puzzle: PuzzleHard.PUZZLE_5.puzzle,
      name: "hard puzzle 5",
      steps: 246,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_1.puzzle,
      name: "extreme puzzle 1",
      steps: 205,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_2.puzzle,
      name: "extreme puzzle 2",
      steps: 210,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_3.puzzle,
      name: "extreme puzzle 3",
      steps: 193,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_4.puzzle,
      name: "extreme puzzle 4",
      steps: 457,
      success: true,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_5.puzzle,
      name: "extreme puzzle 5",
      steps: 203,
      success: true,
    },
  ].forEach((params) => {
    it(`should ${params.success ? "" : "fail to"} solve "${params.name}" in ${params.steps} steps`, () => {
      let step = 0;
      let response: SolverResponse = {
        branches: [
          SolverBranch.createInitialBranch(SudokuGridUtil.clone(params.puzzle)),
        ],
        status: "UNKNOWN",
        stepId: "",
      };
      do {
        response = service.solveNextStep(response);
        step++;
      } while (
        step < 100000 &&
        response.status !== "COMPLETE" &&
        response.status !== "FAILED"
      );

      expect(step).toEqual(params.steps);
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
