import { CyHtmlChain } from "@cypress/types/cy-html-chain";
import { CySelector } from "@cypress/types/cy-selector";

export class CySelectable<T extends HTMLElement = HTMLElement> {
  protected readonly selector: string;

  constructor(
    protected elementSelector: CySelector,
    ...parents: CySelector[]
  ) {
    this.selector = `${parents
      .reverse()
      .map((parent) => this.cySelector(parent))
      .join(" ")} ${this.cySelector(elementSelector)}`;
  }

  protected cySelector(cySelector: CySelector): string {
    return `${cySelector.tag ? `${cySelector.tag}` : ""}${cySelector.class ? `.${cySelector.class}` : ""}${cySelector.id ? `#${cySelector.id}` : ""}${cySelector.dataCy ? `[data-cy=${cySelector.dataCy}]` : ""}`;
  }

  get(): CyHtmlChain<T> {
    return cy.get(this.selector);
  }
}
