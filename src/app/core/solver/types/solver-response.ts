import { SolverBranch } from "@app/core/solver/types/solver-branch";

export type SolverResponseStatus =
  | "COMPLETE"
  | "INCOMPLETE"
  | "FAILED"
  | "UNKNOWN";

export interface SolverResponse {
  branches: SolverBranch[];
  stepId: string;
  status: SolverResponseStatus;
}

export interface SolverStepResponse {
  branches: SolverResponse["branches"];
  stepId: SolverResponse["stepId"];
  failed: boolean;
}
