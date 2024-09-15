import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";

export class CySolverActions {
  private readonly hostSelector = "app-sudoku-solver-actions";

  public readonly next: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "next",
      icon: "skip_next",
    },
    { tag: this.hostSelector },
  );
  public readonly pause: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "start",
      icon: "pause",
    },
    { tag: this.hostSelector },
  );
  public readonly restart: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "restart",
      icon: "restart_alt",
    },
    { tag: this.hostSelector },
  );
  public readonly start: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "start",
      icon: "play_arrow",
    },
    { tag: this.hostSelector },
  );
}
