import { Component, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
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
  private state = inject(SudokuSolverStateService);
  branches$: Observable<SudokuGrid[]> = this.state.getBranches();
  verification$: Observable<Nullable<VerificationResult[]>> =
    this.state.getVerificationResults();

  trackByFn(index: number): number {
    return index;
  }
}
