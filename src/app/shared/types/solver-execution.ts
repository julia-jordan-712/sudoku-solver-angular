export type SolverExecution =
  | "RUNNING"
  | "PAUSED"
  | "NOT_STARTED"
  | "DONE"
  | "FAILED";

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
