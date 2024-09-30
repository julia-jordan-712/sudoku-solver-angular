import { CyChainable } from "@cypress/types/cy-chainable";

export type CyHtmlChain<T extends HTMLElement = HTMLElement> = CyChainable<
  JQuery<T>
>;
