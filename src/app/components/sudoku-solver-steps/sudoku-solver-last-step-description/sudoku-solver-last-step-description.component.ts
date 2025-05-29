import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { smoothHeightAnimation } from "@app/animations/smooth-height.directive";
import { smoothWidthAnimation } from "@app/animations/smooth-width.directive";
import { SmoothHeightDirective } from "../../../animations/smooth-height.directive";
import { SmoothWidthDirective } from "../../../animations/smooth-width.directive";

@Component({
    selector: "app-sudoku-solver-last-step-description",
    templateUrl: "./sudoku-solver-last-step-description.component.html",
    styleUrl: "./sudoku-solver-last-step-description.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [smoothHeightAnimation, smoothWidthAnimation],
    standalone: true,
    imports: [SmoothHeightDirective, SmoothWidthDirective],
})
export class SudokuSolverLastStepDescriptionComponent implements OnChanges {
  @Input({ required: true })
  description: string;
  protected _description: string;

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.description) {
      this._description = this.description;
    } else {
      this._description = "-";
    }
  }
}
