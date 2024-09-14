import { AppComponent } from "@app/app.component";
import { AppModule } from "@app/app.module";
import { CyLanguageSelector } from "@cypress/views/cy-language-selector";

describe(AppComponent.name, () => {
  beforeEach(() => {
    cy.mount(AppComponent, AppModule);
  });

  it("should create component", () => {
    cy.get("app-main").should("be.visible");
  });

  it("should allow to switch the language", () => {
    const language: CyLanguageSelector = new CyLanguageSelector();
    language.buttonEnglish.get().should("be.visible").should("be.enabled");
    language.buttonGerman.get().should("be.visible").should("be.enabled");

    cy.body().find("h1").should("contain.text", "Solve Sudoku");

    language.buttonGerman.get().click();
    cy.body().find("h1").should("contain.text", "Sudoku lösen");

    language.buttonEnglish.get().click();
    cy.body().find("h1").should("contain.text", "Solve Sudoku");
  });
});
