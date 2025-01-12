import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/types/nullable";
import { SingleSelectionInputOption } from "@app/types/single-selection-input-option";
import { SudokuSize } from "@app/types/sudoku-size";

@Component({
  selector: "app-sudoku-size-selection",
  templateUrl: "./sudoku-size-selection.component.html",
  styleUrl: "./sudoku-size-selection.component.scss",
})
export class SudokuSizeSelectionComponent {
  protected selectionSizes: SudokuSizeSelectionItem[] = [4, 9, 16, 25].map(
    (size: number) => this.toSizeSelectionItem(size, size),
  );
  protected selectedSize: SudokuSizeSelectionItem;

  @Input({ required: true })
  set selected(selected: Nullable<SudokuSize>) {
    if (selected) {
      const item: SudokuSizeSelectionItem = this.toSizeSelectionItem(
        selected.height,
        selected.width,
      );
      this.selectedSize =
        this.selectionSizes.find(
          (selectionItem) => selectionItem.id === item.id,
        ) ?? item;
    } else {
      this.selectedSize = null;
    }
  }

  @Output()
  sizeChange: EventEmitter<SudokuSize> = new EventEmitter();

  private toSizeSelectionItem(
    height: number,
    width: number,
  ): SudokuSizeSelectionItem {
    return {
      id: `${width}x${height}`,
      data: { height, width },
      name: `${width}\u2009\u00d7\u2009${height}`,
    };
  }

  protected setSize(size: SudokuSizeSelectionItem): void {
    const newSize = size.data;
    if (newSize != undefined) {
      this.sizeChange.emit(newSize);
    }
  }
}

type SudokuSizeSelectionItem = SingleSelectionInputOption<SudokuSize>;
