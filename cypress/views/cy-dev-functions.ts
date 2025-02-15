import { CyButton } from "@cypress/selectors/cy-button";
import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";
import { CyDropdown } from "@cypress/selectors/cy-dropdown";
import { CyIcon } from "@cypress/selectors/cy-icon";

export class CyDevFunctions {
  private readonly hostSelector = "app-development-functions";

  public readonly clearState: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "clearState", icon: "restart_alt" },
    { tag: this.hostSelector },
  );

  public readonly close: CyIcon = new CyIcon("cross", {
    tag: this.hostSelector,
  });

  public readonly copySudoku: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "copySudoku", icon: "copy" },
    { tag: this.hostSelector },
  );

  public readonly open: CyButton = new CyButton(
    {},
    { tag: "app-development-open" },
  );

  public readonly dropdown = new CyDropdown(
    { dataCy: "test-sudoku-selection" },
    { tag: this.hostSelector },
  );

  public readonly pasteSudoku: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "pasteSudoku", icon: "paste" },
    { tag: this.hostSelector },
  );
}
