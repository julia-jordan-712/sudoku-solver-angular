import { InjectionToken, Provider } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverEliminate } from "@app/core/solver/solver-eliminate/solver-eliminate";
import { SolverPossibleOnce } from "@app/core/solver/solver-possible-once/solver-possible-once";

export const SOLVER_TOKEN = new InjectionToken<Solver>("SUDOKU_SOLVER");

export const SOLVER_PROVIDERS: Provider[] = [
  {
    provide: SOLVER_TOKEN,
    useClass: SolverEliminate,
    multi: true,
  },
  {
    provide: SOLVER_TOKEN,
    useClass: SolverPossibleOnce,
    multi: true,
  },
];
