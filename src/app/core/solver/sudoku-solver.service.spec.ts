import { TestBed } from "@angular/core/testing";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleExtreme } from "@app/test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@app/test/puzzles/puzzle-hard";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SudokuSolverService } from "./sudoku-solver.service";

describe(SudokuSolverService.name, () => {
  let solverState: SudokuSolverStateService;
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
    solverState = TestBed.inject(SudokuSolverStateService);
    verify = TestBed.inject(VerifySolutionService);
  });

  [
    {
      puzzle: PuzzleSimple.PUZZLE_1.puzzle,
      name: "simple puzzle 1",
      steps: 177,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_2.puzzle,
      name: "simple puzzle 2",
      steps: 162,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_3.puzzle,
      name: "simple puzzle 3",
      steps: 179,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_4.puzzle,
      name: "simple puzzle 4",
      steps: 174,
    },
    {
      puzzle: PuzzleSimple.PUZZLE_5.puzzle,
      name: "simple puzzle 5",
      steps: 164,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_1.puzzle,
      name: "medium puzzle 1",
      steps: 238,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_2.puzzle,
      name: "medium puzzle 2",
      steps: 225,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_3.puzzle,
      name: "medium puzzle 3",
      steps: 177,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_4.puzzle,
      name: "medium puzzle 4",
      steps: 240,
    },
    {
      puzzle: PuzzleMedium.PUZZLE_5.puzzle,
      name: "medium puzzle 5",
      steps: 215,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_1.puzzle,
      name: "advanced puzzle 1",
      steps: 204,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_2.puzzle,
      name: "advanced puzzle 2",
      steps: 234,
    },
    {
      puzzle: PuzzleAdvanced.PUZZLE_3.puzzle,
      name: "advanced puzzle 3",
      steps: 195,
    },
    {
      puzzle: PuzzleHard.PUZZLE_1.puzzle,
      name: "hard puzzle 1",
      steps: 234,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_1.puzzle,
      name: "extreme puzzle 1",
      steps: 204,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_2.puzzle,
      name: "extreme puzzle 2",
      steps: 209,
    },
    {
      puzzle: PuzzleExtreme.PUZZLE_3.puzzle,
      name: "extreme puzzle 3",
      steps: 192,
    },
  ].forEach((params) => {
    it(`should solve "${params.name}" in ${params.steps} steps`, () => {
      spyOn(solverState, "finishExecuting").and.callThrough();
      let puzzle: SudokuGrid[] = [SudokuGridUtil.clone(params.puzzle)];

      for (let step = 1; step <= params.steps; step++) {
        puzzle = service.solveNextStep(puzzle).branches;

        if (step < params.steps) {
          expect(SudokuGridUtil.isDone(puzzle[0])).toBeFalse();
        } else {
          expect(SudokuGridUtil.isDone(puzzle[0])).toBeTrue();
        }
      }
      expect(verify.verify(puzzle[0]).isValid()).toBeTrue();
    });
  });
});
