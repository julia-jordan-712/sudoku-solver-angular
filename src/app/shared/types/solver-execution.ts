export const SOLVER_EXECUTION = [
  "NOT_STARTED",
  "RUNNING",
  "PAUSED",
  "DONE",
  "FAILED",
] as const;

export type SolverExecution = (typeof SOLVER_EXECUTION)[number];

export class SolverExecutionState {
  static isReadyToExecute(execution: SolverExecution): boolean {
    return execution === "NOT_STARTED";
  }

  static isExecuting(execution: SolverExecution): boolean {
    return execution === "RUNNING" || execution === "PAUSED";
  }

  static isFinished(execution: SolverExecution): boolean {
    return execution === "DONE" || execution === "FAILED";
  }
}
