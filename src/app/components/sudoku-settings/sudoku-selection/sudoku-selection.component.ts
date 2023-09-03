import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  SudokuSelectionItem,
  SudokuSelectionComponentService,
} from '@app/components/sudoku-settings/sudoku-selection/sudoku-selection-component.service';

@Component({
  selector: 'app-sudoku-selection',
  templateUrl: './sudoku-selection.component.html',
  styleUrls: ['./sudoku-selection.component.scss'],
})
export class SudokuSelectionComponent implements OnInit {
  @Output()
  selected: EventEmitter<SudokuSelectionItem> = new EventEmitter();

  items: SudokuSelectionItem[] = [];

  constructor(private service: SudokuSelectionComponentService) {}

  ngOnInit(): void {
    this.items = this.service.getItems();
  }

  onSelect(option: SudokuSelectionItem): void {
    this.selected.emit(option);
  }
}
