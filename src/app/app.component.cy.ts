import { AppComponent } from "@app/app.component";
import { AppModule } from "@app/app.module";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(AppComponent.name, () => {
  it("should create component", () => {
    cy.mount(AppComponent, {
      imports: [
        AppModule,
        TranslateTestingModule.withTranslations({
          // @ts-ignore Cannot find name 'require'
          en: require("src/assets/i18n/en.json"),
          // @ts-ignore Cannot find name 'require'
          de: require("src/assets/i18n/de.json"),
        }).withDefaultLanguage("en"),
      ],
    });
    cy.get("app-main").should("be.visible");
  });
});
