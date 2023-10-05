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
        id: "Puzzle4x4.COMPLETE",
        name: this.translate.stream("PUZZLE.4x4.COMPLETE"),
        grid: Puzzle4x4.COMPLETE,
      },
      {
        id: "PuzzleSimple.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.SIMPLE.PUZZLE", { number: 1 }),
        grid: PuzzleSimple.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleSimple.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.SIMPLE.SOLVED", { number: 1 }),
        grid: PuzzleSimple.PUZZLE_1.solution,
      },
      {
        id: "PuzzleSimple.PUZZLE_2.puzzle",
        name: this.translate.stream("PUZZLE.SIMPLE.PUZZLE", { number: 2 }),
        grid: PuzzleSimple.PUZZLE_2.puzzle,
      },
      {
        id: "PuzzleSimple.PUZZLE_2.solution",
        name: this.translate.stream("PUZZLE.SIMPLE.SOLVED", { number: 2 }),
        grid: PuzzleSimple.PUZZLE_2.solution,
      },
      {
        id: "PuzzleSimple.PUZZLE_3.puzzle",
        name: this.translate.stream("PUZZLE.SIMPLE.PUZZLE", { number: 3 }),
        grid: PuzzleSimple.PUZZLE_3.puzzle,
      },
      {
        id: "PuzzleSimple.PUZZLE_3.solution",
        name: this.translate.stream("PUZZLE.SIMPLE.SOLVED", { number: 3 }),
        grid: PuzzleSimple.PUZZLE_3.solution,
      },
      {
        id: "PuzzleSimple.PUZZLE_4.puzzle",
        name: this.translate.stream("PUZZLE.SIMPLE.PUZZLE", { number: 4 }),
        grid: PuzzleSimple.PUZZLE_4.puzzle,
      },
      {
        id: "PuzzleSimple.PUZZLE_4.solution",
        name: this.translate.stream("PUZZLE.SIMPLE.SOLVED", { number: 4 }),
        grid: PuzzleSimple.PUZZLE_4.solution,
      },
      {
        id: "PuzzleSimple.PUZZLE_5.puzzle",
        name: this.translate.stream("PUZZLE.SIMPLE.PUZZLE", { number: 5 }),
        grid: PuzzleSimple.PUZZLE_5.puzzle,
      },
      {
        id: "PuzzleSimple.PUZZLE_5.solution",
        name: this.translate.stream("PUZZLE.SIMPLE.SOLVED", { number: 5 }),
        grid: PuzzleSimple.PUZZLE_5.solution,
      },
      {
        id: "PuzzleMedium.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.MEDIUM.PUZZLE", { number: 1 }),
        grid: PuzzleMedium.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleMedium.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.MEDIUM.SOLVED", { number: 1 }),
        grid: PuzzleMedium.PUZZLE_1.solution,
      },
      {
        id: "PuzzleAdvanced.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.ADVANCED.PUZZLE", { number: 1 }),
        grid: PuzzleAdvanced.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleAdvanced.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.ADVANCED.SOLVED", { number: 1 }),
        grid: PuzzleAdvanced.PUZZLE_1.solution,
      },
      {
        id: "PuzzleHard.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.HARD.PUZZLE", { number: 1 }),
        grid: PuzzleHard.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleHard.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.HARD.SOLVED", { number: 1 }),
        grid: PuzzleHard.PUZZLE_1.solution,
      },
      {
        id: "PuzzleExtreme.PUZZLE_1.puzzle",
        name: this.translate.stream("PUZZLE.EXTREME.PUZZLE", { number: 1 }),
        grid: PuzzleExtreme.PUZZLE_1.puzzle,
      },
      {
        id: "PuzzleExtreme.PUZZLE_1.solution",
        name: this.translate.stream("PUZZLE.EXTREME.SOLVED", { number: 1 }),
        grid: PuzzleExtreme.PUZZLE_1.solution,
      },
    ];
  }
}

export interface SudokuDropdownSelectionItem extends DropdownInputOption {
  grid: SudokuGrid | undefined;
}
