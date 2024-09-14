import { AppComponent } from "@app/app.component";
import { AppModule } from "@app/app.module";

describe(AppComponent.name, () => {
  it("should create component", () => {
    cy.mount(AppComponent, AppModule);
    cy.get("app-main").should("be.visible");
  });
});
