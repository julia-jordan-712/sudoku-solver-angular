import { InjectionToken, Provider } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverCleanUp } from "@app/core/solver/solver-clean-up/solver-clean-up";
import { SolverEliminate } from "@app/core/solver/solver-eliminate/solver-eliminate";
import { SolverPrepare } from "@app/core/solver/solver-prepare/solver-prepare";
import { SolverSearch } from "@app/core/solver/solver-search/solver-search";

export const SOLVER_TOKEN = new InjectionToken<Solver>("SUDOKU_SOLVER");

export const SOLVER_PROVIDERS: Provider[] = [
  {
    provide: SOLVER_TOKEN,
    useClass: SolverPrepare,
    multi: true,
  },
  {
    provide: SOLVER_TOKEN,
    useClass: SolverCleanUp,
    multi: true,
  },
  {
    provide: SOLVER_TOKEN,
    useClass: SolverEliminate,
    multi: true,
  },
  {
    provide: SOLVER_TOKEN,
    useClass: SolverSearch,
    multi: true,
  },
];
