import { CyHtmlChain } from "@cypress/types/cy-html-chain";
import { CySelectable } from "@cypress/types/cy-selectable";

declare global {
  namespace Cypress {
    interface Chainable {
      body: typeof body;
    }
  }
}

function body(): CyHtmlChain<HTMLBodyElement> {
  return new CySelectable<HTMLBodyElement>({ tag: "body" }).get();
}

Cypress.Commands.add("body", body);
