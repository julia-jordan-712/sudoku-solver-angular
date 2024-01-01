import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrls: ["./sudoku-solver.component.scss"],
})
export class SudokuSolverComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  branches$: Observable<SudokuGrid[]> = this.state.getBranches();
  verification$: Observable<Nullable<VerificationResult[]>> =
    this.state.getVerificationResults();

  trackByFn(index: number): number {
    return index;
  }
}
