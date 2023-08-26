import { TestBed } from '@angular/core/testing';
import { VerifySolutionService } from '@app/core/verify/verify-solution.service';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';

describe(VerifySolutionService.name, () => {
  let service: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifySolutionService);
  });

  it('should recognize a valid solution', () => {
    expect(service.verify(PuzzleSimple.PUZZLE_1.solution)).toBeTrue();
  });
});
