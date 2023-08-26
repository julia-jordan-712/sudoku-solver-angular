import { Nullable } from "@app/shared/types/nullable";

export interface TestPuzzle {
  puzzle: Nullable<number>[][];
  solution: number[][];
}
