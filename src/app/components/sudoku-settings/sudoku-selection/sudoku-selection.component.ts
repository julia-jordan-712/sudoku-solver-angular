import { Component, OnInit } from '@angular/core';
import { SudokuSelectionItem, SudokuSelectionService } from '@app/components/sudoku-settings/sudoku-selection/sudoku-selection.service';

@Component({
  selector: 'app-sudoku-selection',
  templateUrl: './sudoku-selection.component.html',
  styleUrls: ['./sudoku-selection.component.scss'],
})
export class SudokuSelectionComponent implements OnInit {
  items: SudokuSelectionItem[] = [];

  constructor(private service: SudokuSelectionService) {}

  ngOnInit(): void {
    this.items = this.service.getItems();
  }
}
