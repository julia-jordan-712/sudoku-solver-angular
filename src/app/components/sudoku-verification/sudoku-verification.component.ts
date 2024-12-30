import { Component, Input } from "@angular/core";
import { smoothHeight } from "@app/animations/smooth-height";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-sudoku-verification",
  templateUrl: "./sudoku-verification.component.html",
  styleUrls: ["./sudoku-verification.component.scss"],
  animations: [smoothHeight],
})
export class SudokuVerificationComponent {
  protected show: boolean;
  protected valid: boolean;
  protected errors: VerificationResult["errors"];

  @Input({ required: true })
  set verification(verification: Nullable<VerificationResult>) {
    this.show = verification != null;
    this.valid = verification?.isValid() ?? true;
    this.errors = [...(verification?.getErrors() ?? [])];
  }
}
