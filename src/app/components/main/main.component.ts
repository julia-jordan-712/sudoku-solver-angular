import { Component, inject } from "@angular/core";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  private store: Store = inject(Store);

  showPuzzle$: Observable<boolean> = this.store.select(
    SudokuPuzzleSelectors.selectIsShown,
  );
}
