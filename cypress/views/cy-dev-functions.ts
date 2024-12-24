import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";

export class CyDevFunctions {
  private readonly hostSelector = "app-dev-functions";

  public readonly copySudoku: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "copySudoku", icon: "copy" },
    { tag: this.hostSelector },
  );
}
