import { Component, Input } from "@angular/core";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { I18nKey } from "@app/shared/types/i18n-key";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-sudoku-verification",
  templateUrl: "./sudoku-verification.component.html",
  styleUrls: ["./sudoku-verification.component.scss"],
})
export class SudokuVerificationComponent {
  @Input({ required: true })
  verification: Nullable<VerificationResult>;

  trackByFn(_: number, error: I18nKey): string {
    return error.key;
  }
}
