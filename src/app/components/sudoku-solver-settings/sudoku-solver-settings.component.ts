import { Component, inject } from "@angular/core";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-sudoku-solver-settings",
  templateUrl: "./sudoku-solver-settings.component.html",
  styleUrls: ["./sudoku-solver-settings.component.scss"],
})
export class SudokuSolverSettingsComponent {
  private state = inject(SudokuSolverStateService);
  show$: Observable<boolean> = this.state
    .getBranches()
    .pipe(map((branches) => branches.length > 0));
  delay$: Observable<number> = this.state.getDelay();
  maxSteps$: Observable<number> = this.state.getMaximumSteps();

  setDelay(ms: number): void {
    this.state.setDelay(ms);
  }

  setMaxSteps(max: number): void {
    this.state.setMaxSteps(max);
  }
}
