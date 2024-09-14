import { CyButton } from "@cypress/selectors/cy-button";

export class CyLanguageSelector {
  private readonly dataCy = "language-selector";

  public readonly buttonEnglish = new CyButton(
    { dataCy: "lang-en" },
    { dataCy: this.dataCy },
  );
  public readonly buttonGerman = new CyButton(
    { dataCy: "lang-de" },
    { dataCy: this.dataCy },
  );
}
