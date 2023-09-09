import { Injectable } from "@angular/core";
import { DropdownInputOption } from "@app/components/input-field/dropdown-input/dropdown-input.component";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleExtreme } from "@app/test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@app/test/puzzles/puzzle-hard";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class SudokuDropdownSelectionService {
  constructor(private translate: TranslateService) {}

  getItems(): SudokuDropdownSelectionItem[] {
    return [
      {
        id: "None",
        name: this.translate.stream("PUZZLE.NONE"),
        grid: undefined,
      },
      {
        id: "Puzzle4x4.EMPTY",
        name: this.translate.stream("PUZZLE.4x4.EMPTY"),
        grid: Puzzle4x4.EMPTY,
      },
      {
        id: "Puzzle4x4.EMPTY_COLUMN",
        name: this.translate.stream("PUZZLE.4x4.EMPTY_COLUMN"),
        grid: Puzzle4x4.EMPTY_COLUMN,
      },
      {
        id: "Puzzle4x4.EMPTY_ROW",
        name: this.translate.stream("PUZZLE.4x4.EMPTY_ROW"),
        grid: Puzzle4x4.EMPTY_ROW,
      },
      {
        id: "Puzzle4x4.EMPTY_SQUARE",
        name: this.translate.stream("PUZZLE.4x4.EMPTY_SQUARE"),
        grid: Puzzle4x4.EMPTY_SQUARE,
      },
      {
        id: "Puzzle4x4.COMPLETE",
        name: this.translate.stream("PUZZLE.4x4.COMPLETE"),
        grid: Puzzle4x4.COMPLETE,
      },
      {
        id: "Puzzle4x4.INCOMPLETE_INVALID_COLUMN",
        name: this.translate.stream("PUZZLE.4x4.INCOMPLETE_INVALID_COLUMN"),
        grid: Puzzle4x4.INCOMPLETE_INVALID_COLUMN,
      },
      {
        id: "Puzzle4x4.INCOMPLETE_INVALID_ROW",
        name: this.translate.stream("PUZZLE.4x4.INCOMPLETE_INVALID_ROW"),
        grid: Puzzle4x4.INCOMPLETE_INVALID_ROW,
      },
      {
        id: "Puzzle4x4.INCOMPLETE_INVALID_SQUARE",
        name: this.translate.stream("PUZZLE.4x4.INCOMPLETE_INVALID_SQUARE"),
        grid: Puzzle4x4.INCOMPLETE_INVALID_SQUARE,
      },
      {
        id: "PuzzleSimple.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.SIMPLE.1.PUZZLE"),
        grid: PuzzleSimple.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleSimple.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.SIMPLE.1.SOLVED"),
        grid: PuzzleSimple.PUZZLE_1.solution,
      },
      {
        id: "PuzzleMedium.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.MEDIUM.1.PUZZLE"),
        grid: PuzzleMedium.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleMedium.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.MEDIUM.1.SOLVED"),
        grid: PuzzleMedium.PUZZLE_1.solution,
      },
      {
        id: "PuzzleAdvanced.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.ADVANCED.1.PUZZLE"),
        grid: PuzzleAdvanced.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleAdvanced.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.ADVANCED.1.SOLVED"),
        grid: PuzzleAdvanced.PUZZLE_1.solution,
      },
      {
        id: "PuzzleHard.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.HARD.1.PUZZLE"),
        grid: PuzzleHard.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleHard.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.HARD.1.SOLVED"),
        grid: PuzzleHard.PUZZLE_1.solution,
      },
      {
        id: "PuzzleExtreme.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.EXTREME.1.PUZZLE"),
        grid: PuzzleExtreme.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleExtreme.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.EXTREME.1.SOLVED"),
        grid: PuzzleExtreme.PUZZLE_1.solution,
      },
    ];
  }
}

export interface SudokuDropdownSelectionItem extends DropdownInputOption {
  grid: SudokuGrid | undefined;
}
