import { Component, inject } from "@angular/core";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver-branches",
  templateUrl: "./sudoku-solver-branches.component.html",
  styleUrl: "./sudoku-solver-branches.component.scss",
})
export class SudokuSolverBranchesComponent {
  private store = inject(Store);
  branches$: Observable<number> = this.store.select(
    SudokuSolverSelectors.selectAmountOfBranches,
  );
}
