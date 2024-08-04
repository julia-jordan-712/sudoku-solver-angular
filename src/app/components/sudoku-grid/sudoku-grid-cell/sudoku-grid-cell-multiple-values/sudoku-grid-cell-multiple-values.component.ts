import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-sudoku-grid-cell-multiple-values",
  templateUrl: "./sudoku-grid-cell-multiple-values.component.html",
  styleUrls: ["./sudoku-grid-cell-multiple-values.component.scss"],
})
export class SudokuGridCellMultipleValuesComponent implements OnChanges {
  @Input({ required: true })
  values: number[] = [];
  numbers: number[] = [];
  noteGridColumns = "";

  @Input({ required: true })
  size = 32;

  @Input({ required: true })
  maxValue = 1;

  @Input({ required: true })
  @HostBinding("class.duplicate")
  isDuplicate = false;

  @Input({ required: true })
  @HostBinding("class.highlight")
  highlight = false;

  @Input({ required: true })
  @HostBinding("class.changed")
  changed = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["maxValue"]) {
      this.numbers = Array(this.maxValue)
        .fill(0)
        .map((_, i) => i + 1);
      const sqrt = Math.ceil(Math.sqrt(this.maxValue));
      this.noteGridColumns = `repeat(${sqrt}, auto)`;
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
