import { Component, inject } from "@angular/core";
import { SudokuSettingsStateService } from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Observable, combineLatest, filter, map } from "rxjs";

@Component({
  selector: "app-sudoku-solver",
  templateUrl: "./sudoku-solver.component.html",
  styleUrls: ["./sudoku-solver.component.scss"],
})
export class SudokuSolverComponent {
  private settings = inject(SudokuSettingsStateService);
  ready$: Observable<boolean> = this.settings.isConfirmed();
  puzzle$: Observable<SudokuGrid> = combineLatest([
    this.settings.getGrid(),
    this.ready$,
  ]).pipe(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter(([_, ready]) => ready),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    map(([sudoku, _]) => sudoku),
    filter(isDefined),
    map((sudoku) => SudokuGridUtil.clone(sudoku)),
  );
}
