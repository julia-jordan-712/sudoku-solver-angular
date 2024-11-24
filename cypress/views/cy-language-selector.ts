import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";

export class CyLanguageSelector {
  private readonly tag = "app-language-selection";

  public readonly buttonEnglish = new CyButtonWithIcon(
    { dataCy: "lang-en", icon: "language" },
    { tag: this.tag },
  );
  public readonly buttonGerman = new CyButtonWithIcon(
    { dataCy: "lang-de", icon: "language" },
    { tag: this.tag },
  );
}
