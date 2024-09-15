import { CyHtmlChain } from "@cypress/types/cy-html-chain";
import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelector, CySelectorTag } from "@cypress/types/cy-selector";

export class CyIcon extends CySelectable<HTMLElement> {
  private static readonly hostSelector = "app-icon";

  constructor(icon: string, ...parents: CySelector[]) {
    super(new CySelectorTag(CyIcon.tagSelector(icon)), ...parents);
  }

  public static find(chain: CyHtmlChain, icon: string): CyHtmlChain {
    return chain.find(CyIcon.tagSelector(icon));
  }

  private static tagSelector(icon: string): string {
    return icon
      ? `${CyIcon.hostSelector}:contains(${icon})`
      : CyIcon.hostSelector;
  }
}
