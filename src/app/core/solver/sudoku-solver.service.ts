import { Injectable } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverService {
  solveNextStep(branches: SudokuGrid[]): SudokuGrid[] {
    return branches;
  }

  private getCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    return branches?.slice(-1)?.[0];
  }
}
