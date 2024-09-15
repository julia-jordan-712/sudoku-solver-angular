import { CyButton } from "@cypress/selectors/cy-button";
import { CyDropdown } from "@cypress/selectors/cy-dropdown";
import { CySelectionList } from "@cypress/selectors/cy-selection-list";
import { CySudoku } from "@cypress/selectors/cy-sudoku";
import { CySelector } from "@cypress/types/cy-selector";

export class CyPuzzleInput {
  private readonly selector: CySelector = { tag: "app-sudoku-settings" };

  public readonly buttonConfirm = new CyButton(
    { id: "confirmSettings" },
    this.selector,
  );
  public readonly buttonReopen = new CyButton(
    { id: "changeSettings" },
    this.selector,
  );
  public readonly dropdown = new CyDropdown(
    { dataCy: "existing-sudoku-selection" },
    this.selector,
  );
  public readonly sizeSelector = new CySelectionList(
    { dataCy: "sudoku-size-selection" },
    this.selector,
  );
  public readonly sudoku = new CySudoku({}, this.selector);

  selectFromDropdownAndConfirm(name: string): void {
    this.dropdown.dropdown.get().select(name);
    this.buttonConfirm.get().click();
  }
}
