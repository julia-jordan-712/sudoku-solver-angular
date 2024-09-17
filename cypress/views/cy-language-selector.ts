import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";

export class CyLanguageSelector {
  private readonly dataCy = "language-selector";

  public readonly buttonEnglish = new CyButtonWithIcon(
    { dataCy: "lang-en", icon: "language" },
    { dataCy: this.dataCy },
  );
  public readonly buttonGerman = new CyButtonWithIcon(
    { dataCy: "lang-de", icon: "language" },
    { dataCy: this.dataCy },
  );
}
