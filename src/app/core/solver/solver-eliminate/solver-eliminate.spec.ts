import { TestBed } from "@angular/core/testing";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { SolverEliminate } from "./solver-eliminate";

describe(SolverEliminate.name, () => {
  let verify: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [VerifySolutionService] });
    verify = TestBed.inject(VerifySolutionService);
  });

  it("should create an instance", () => {
    expect(new SolverEliminate(verify)).toBeTruthy();
  });
});
