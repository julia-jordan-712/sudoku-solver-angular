import { Injectable } from '@angular/core';
import { DropdownInputOption } from '@app/components/input-field/dropdown-input/dropdown-input.component';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';
import { Puzzle4x4 } from '@app/test/puzzles/puzzle-4x4';
import { PuzzleSimple } from '@app/test/puzzles/puzzle-simple';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SudokuSelectionService {

  constructor(private translate: TranslateService) {}

  getItems(): SudokuSelectionItem[] {
    return [
      {
        id: 'None',
        name: this.translate.stream("PUZZLE.NONE"),
        grid: [],
      },
      {
        id: 'Puzzle4x4.EMPTY',
        name: this.translate.stream('PUZZLE.4x4.EMPTY'),
        grid: Puzzle4x4.EMPTY,
      },
      {
        id: 'Puzzle4x4.EMPTY_COLUMN',
        name: this.translate.stream('PUZZLE.4x4.EMPTY_COLUMN'),
        grid: Puzzle4x4.EMPTY_COLUMN,
      },
      {
        id: 'Puzzle4x4.EMPTY_ROW',
        name: this.translate.stream('PUZZLE.4x4.EMPTY_ROW'),
        grid: Puzzle4x4.EMPTY_ROW,
      },
      {
        id: 'Puzzle4x4.EMPTY_SQUARE',
        name: this.translate.stream('PUZZLE.4x4.EMPTY_SQUARE'),
        grid: Puzzle4x4.EMPTY_SQUARE,
      },
      {
        id: 'PuzzleSimple.PUZZLE_1.puzzle',
        name: this.translate.stream('PUZZLE.SIMPLE.1.PUZZLE'),
        grid: PuzzleSimple.PUZZLE_1.puzzle,
      },
      {
        id: 'PuzzleSimple.PUZZLE_1.solution',
        name: this.translate.stream('PUZZLE.SIMPLE.1.SOLVED'),
        grid: PuzzleSimple.PUZZLE_1.solution,
      },
    ];
  }
}

export interface SudokuSelectionItem extends DropdownInputOption {
  grid: SudokuGrid;
}
