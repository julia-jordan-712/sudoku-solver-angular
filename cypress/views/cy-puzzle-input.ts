import { CyHintList } from "@cypress/selectors/cy-hint-list";
import { CySelectionList } from "@cypress/selectors/cy-selection-list";
import { CySudoku } from "@cypress/selectors/cy-sudoku";
import { CySelector } from "@cypress/types/cy-selector";

export class CyPuzzleInput {
  private readonly selector: CySelector = { tag: "app-sudoku-puzzle" };

  public readonly hintList: CyHintList = new CyHintList(this.selector);
  public readonly sizeSelector = new CySelectionList(
    { dataCy: "sudoku-size-selection" },
    this.selector,
  );
  public readonly sudoku = new CySudoku({}, this.selector);
}
