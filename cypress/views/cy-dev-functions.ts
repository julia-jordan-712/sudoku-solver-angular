import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";

export class CyDevFunctions {
  private readonly hostSelector = "app-dev-functions";

  public readonly clearState: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "clearState", icon: "restart_alt" },
    { tag: this.hostSelector },
  );

  public readonly copySudoku: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "copySudoku", icon: "copy" },
    { tag: this.hostSelector },
  );

  public readonly pasteSudoku: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "pasteSudoku", icon: "paste" },
    { tag: this.hostSelector },
  );
}
