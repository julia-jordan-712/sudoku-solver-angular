import { TestBed } from '@angular/core/testing';
import { VerifySolutionService } from '@app/core/verification/services/verify-solution.service';
import { Puzzle4x4 } from '@app/test/puzzles/puzzle-4x4';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';

describe(VerifySolutionService.name, () => {
  let service: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifySolutionService);
  });

  [
    {
      input: Puzzle4x4.EMPTY,
      desc: 'empty solution',
    },
    {
      input: Puzzle4x4.EMPTY_ROW,
      desc: 'empty row',
    },
    {
      input: Puzzle4x4.EMPTY_COLUMN,
      desc: 'empty column',
    },
    {
      input: Puzzle4x4.EMPTY_SQUARE,
      desc: 'empty square',
    },
    {
      input: PuzzleSimple.PUZZLE_1.solution,
      desc: 'PuzzleSimple.PUZZLE_1.solution',
    },
    {
      input: PuzzleSimple.PUZZLE_1.puzzle,
      desc: 'PuzzleSimple.PUZZLE_1.puzzle',
    },
  ].forEach((params) => {
    it(`should recognize a valid solution: ${params.desc}`, () => {
      expect(service.verify(params.input).isValid()).toBeTrue();
    });
  });
});
