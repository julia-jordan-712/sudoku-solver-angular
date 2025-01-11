import { Component, Input } from "@angular/core";
import { SudokuVerificationComponent } from "@app/components/sudoku-verification/sudoku-verification.component";
import { SudokuVerificationModule } from "@app/components/sudoku-verification/sudoku-verification.module";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { Nullable } from "@app/shared/types/nullable";
import { CyComponentInput } from "@cypress/types/cy-component";
import { CySudokuVerification } from "@cypress/views/cy-sudoku-verification";

describe(SudokuVerificationComponent.name, () => {
  const underTest: CySudokuVerification = new CySudokuVerification();

  function setup(input: CyComponentInput<SudokuVerificationComponent>): void {
    cy.mount(
      SudokuVerificationWrapperComponent,
      SudokuVerificationModule,
      input,
    );
  }

  describe("empty", () => {
    [null, undefined].forEach((empty) => {
      it(`should not display anything if verification is ${empty}`, () => {
        setup({ verification: empty });

        underTest.valid.get().should("not.exist");
        underTest.invalid.get().should("not.exist");
        underTest.get().should("exist");
        underTest.get().should("have.text", "");
      });
    });
  });

  it("should display 'valid' text and no errors if verification is valid", () => {
    setup({ verification: VerificationResult.createValid() });

    underTest.shouldBeValid();
    underTest.get().should("contain.text", "Valid");
  });

  it("should display 'invalid' text and error messages if verification is invalid", () => {
    setup({
      verification: VerificationResult.createFromErrors([
        VerifyI18nKey.ERROR_EMPTY,
        VerifyI18nKey.UNSUPPORTED_NOT_QUADRATIC,
      ]),
    });

    underTest.shouldBeInvalid(
      "Sudoku is empty",
      "Sudokus of this size are not supported",
    );
    underTest.get().should("contain.text", "Invalid");
  });
});

@Component({
  selector: "app-test-wrapper",
  template: `<app-sudoku-verification
    [verification]="verification"
  ></app-sudoku-verification>`,
})
class SudokuVerificationWrapperComponent {
  @Input({ required: true })
  verification: Nullable<VerificationResult>;
}
