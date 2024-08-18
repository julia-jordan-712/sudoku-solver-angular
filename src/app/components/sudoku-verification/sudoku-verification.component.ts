import { Component, Input } from "@angular/core";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-sudoku-verification",
  templateUrl: "./sudoku-verification.component.html",
  styleUrls: ["./sudoku-verification.component.scss"],
})
export class SudokuVerificationComponent {
  @Input({ required: true })
  verification: Nullable<VerificationResult>;
}
