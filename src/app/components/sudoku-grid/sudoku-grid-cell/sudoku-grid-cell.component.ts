import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from "@angular/core";
import { SudokuGridCellComponentService } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-component.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCellViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-grid-cell",
  templateUrl: "./sudoku-grid-cell.component.html",
  styleUrls: ["./sudoku-grid-cell.component.scss"],
  providers: [SudokuGridCellComponentService],
})
export class SudokuGridCellComponent {
  private componentService: SudokuGridCellComponentService = inject(
    SudokuGridCellComponentService,
  );
  displayValue$: Observable<Nullable<number>> =
    this.componentService.getDisplayValue();
  displayValues$: Observable<Nullable<number[]>> =
    this.componentService.getDisplayValues();
  changed$: Observable<boolean> = this.componentService.isChanged();

  @Input({ required: true })
  set cell(viewModel: SudokuGridCellViewModel) {
    this.componentService.setCell(
      viewModel.cell,
      viewModel.branchInfo?.isCurrent ?? true,
    );
    this.dataCy = `cell-${viewModel.cellPosition.x}-${viewModel.cellPosition.y}`;
    this.isDuplicate = viewModel.isDuplicate();
    this.maxValue = viewModel.maxValue;
    this.size = viewModel.widthAndHeight;
  }

  dataCy = "";
  isDuplicate = false;
  maxValue = 1;
  size = 32;

  @Input()
  @HostBinding("class.border-top")
  borderTop = false;

  @Input()
  @HostBinding("class.border-right")
  borderRight = false;

  @Input()
  @HostBinding("class.border-bottom")
  borderBottom = false;

  @Input()
  @HostBinding("class.border-left")
  borderLeft = false;

  @Input()
  highlight = false;

  @Input()
  @HostBinding("class.readonly")
  readonly: Nullable<boolean> = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  @Output()
  valueSubmit: EventEmitter<number> = new EventEmitter();

  onChange(value: number): void {
    this.valueChange.emit(value);
  }

  onSubmit(value: number): void {
    this.valueSubmit.emit(value);
  }

  @HostListener("mouseenter")
  onMouseEnter(): void {
    this.componentService.onMouseEnter();
  }

  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.componentService.onMouseLeave();
  }
}
