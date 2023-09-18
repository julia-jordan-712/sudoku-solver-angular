import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { TranslateTestingModule } from "ngx-translate-testing";
import { SudokuVerificationComponent } from "./sudoku-verification.component";

describe(SudokuVerificationComponent.name, () => {
  let component: SudokuVerificationComponent;
  let fixture: ComponentFixture<SudokuVerificationComponent>;

  beforeEach(() => {
    const testTranslations = {
      VERIFY: {
        ERROR: { EMPTY: "Sudoku is empty" },
        UNSUPPORTED: { NOT_QUADRATIC: "Sudoku is not supported" },
        RESULT: { VALID: "Valid", INVALID: "Invalid" },
      },
    };
    TestBed.configureTestingModule({
      declarations: [SudokuVerificationComponent],
      imports: [
        TranslateTestingModule.withTranslations({ en: testTranslations }),
      ],
    });
    fixture = TestBed.createComponent(SudokuVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("empty", () => {
    [null, undefined].forEach((empty) => {
      it(`should not display anything if verification is ${empty}`, () => {
        component.verification = empty;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector("div.valid")).toBeNull();
        expect(fixture.nativeElement.querySelector("div.invalid")).toBeNull();
        expect(fixture.nativeElement.innerText).toEqual("");
      });
    });
  });

  describe("valid", () => {
    it("should display text if verification is valid", () => {
      component.verification = VerificationResult.createValid();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector("div.valid")).not.toBeNull();
      expect(fixture.nativeElement.querySelector("div.invalid")).toBeNull();
      expect(fixture.nativeElement.innerText).toContain("Valid");
    });

    it("should NOT display errors if verification is valid", () => {
      const verification = VerificationResult.createValid();
      spyOn(verification, "getErrors").and.returnValue([
        VerifyI18nKey.ERROR_EMPTY,
      ]);
      spyOn(verification, "isValid").and.returnValue(true);
      component.verification = verification;
      fixture.detectChanges();

      expect(fixture.nativeElement.innerText).toEqual("Valid");
      expect(fixture.nativeElement.innerText).not.toContain("Sudoku is empty");
    });
  });

  describe("invalid", () => {
    const verification = VerificationResult.createFromErrors([
      VerifyI18nKey.ERROR_EMPTY,
      VerifyI18nKey.UNSUPPORTED_NOT_QUADRATIC,
    ]);

    it("should display text if verification is invalid", () => {
      component.verification = verification;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector("div.valid")).toBeNull();
      expect(fixture.nativeElement.querySelector("div.invalid")).not.toBeNull();
      expect(fixture.nativeElement.innerText).toContain("Invalid");
    });

    it("should display errors if verification is invalid", () => {
      component.verification = verification;
      fixture.detectChanges();

      expect(fixture.nativeElement.innerText).toEqual(
        "Invalid\nSudoku is empty\nSudoku is not supported",
      );
    });
  });
});
