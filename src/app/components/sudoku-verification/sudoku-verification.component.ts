import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from "@angular/core";
import { smoothHeightAnimation } from "@app/animations/smooth-height.directive";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/types/nullable";

@Component({
  selector: "app-sudoku-verification",
  templateUrl: "./sudoku-verification.component.html",
  styleUrls: ["./sudoku-verification.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [smoothHeightAnimation],
})
export class SudokuVerificationComponent {
  @HostBinding("class.hidden")
  protected hidden: boolean;
  @HostBinding("class.valid")
  protected valid: boolean;
  protected errors: VerificationResult["errors"];
  protected heightChangeTrigger: string;

  @Input({ required: true })
  set verification(verification: Nullable<VerificationResult>) {
    this.hidden = verification == null;
    this.valid = verification?.isValid() ?? true;
    const verificationErrors = verification?.getErrors() ?? [];
    this.errors = [...verificationErrors];
    this.heightChangeTrigger = verificationErrors
      .map((error) => `${error.key}${JSON.stringify(error.params ?? {})}`)
      .join();
  }
}
