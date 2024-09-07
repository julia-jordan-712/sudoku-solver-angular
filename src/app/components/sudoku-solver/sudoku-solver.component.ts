import { Component, inject } from "@angular/core";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Index } from "@app/shared/types";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { filter, map, Observable } from "rxjs";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrls: ["./sudoku-solver.component.scss"],
})
export class SudokuSolverComponent {
  private state = inject(SUDOKU_SOLVER_STATE);
  viewModels$: Observable<SudokuGridViewModel[]> = this.state.getViewModels();

  verification$: Observable<{
    [viewModelId: string]: Nullable<VerificationResult>;
  }> = this.viewModels$.pipe(
    filter((viewModels: SudokuGridViewModel[]) => viewModels.length > 0),
    map((viewModels: SudokuGridViewModel[]) => {
      const verificationResults: Index<VerificationResult> = {};
      viewModels
        .filter(
          (viewModel: SudokuGridViewModel) => viewModel.branchInfo?.isCurrent,
        )
        .forEach((viewModel: SudokuGridViewModel) => {
          const grid: SudokuGrid =
            SudokuGridViewModelConverter.createGridFromViewModel(viewModel);
          verificationResults[viewModel.id] = new VerifySolution().verify(
            grid,
            {
              allowEmptyCells: false,
              size: grid.length,
              trackUniquenessViolations: true,
            },
          );
        });
      return verificationResults;
    }),
  );

  highlightNumber$: Observable<Nullable<number>> =
    this.state.getHighlightNumber();
}
