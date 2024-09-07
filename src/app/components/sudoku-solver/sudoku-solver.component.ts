import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrls: ["./sudoku-solver.component.scss"],
})
export class SudokuSolverComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  viewModels$: Observable<SudokuGridViewModel[]> = this.state.getViewModels();
  highlightNumber$: Observable<Nullable<number>> =
    this.state.getHighlightNumber();
}
