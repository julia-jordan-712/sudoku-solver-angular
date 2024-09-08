import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-branches",
  templateUrl: "./sudoku-solver-branches.component.html",
  styleUrl: "./sudoku-solver-branches.component.scss",
})
export class SudokuSolverBranchesComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  branches$: Observable<number> = this.state.getBranchesRequired();
}
