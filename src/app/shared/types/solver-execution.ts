export const SOLVER_EXECUTION = [
  "NOT_STARTED",
  "RUNNING",
  "PAUSED",
  "DONE",
  "FAILED",
] as const;

export type SolverExecution = (typeof SOLVER_EXECUTION)[number];
