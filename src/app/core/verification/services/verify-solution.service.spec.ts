import { TestBed } from '@angular/core/testing';
import { VerifySolutionService } from '@app/core/verification/services/verify-solution.service';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';

describe(VerifySolutionService.name, () => {
  let service: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifySolutionService);
  });

  [
    {
      input: PuzzleSimple.PUZZLE_1.solution,
      desc: 'PuzzleSimple.PUZZLE_1.solution',
    },
  ].forEach((params) => {
    it(`should recognize a valid solution: ${params.desc}`, () => {
      expect(service.verify(params.input)).toBeTrue();
    });
  });
});
