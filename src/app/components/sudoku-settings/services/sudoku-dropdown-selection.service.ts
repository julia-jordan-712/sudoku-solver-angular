import { Injectable, inject } from "@angular/core";
import { DropdownInputOption } from "@app/components/interactions/dropdown-input/dropdown-input.component";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleExtreme } from "@app/test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@app/test/puzzles/puzzle-hard";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { TestPuzzle } from "@app/test/puzzles/test-puzzle";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class SudokuDropdownSelectionService {
  private translate: TranslateService = inject(TranslateService);

  public readonly NO_SELECTION_ITEM: SudokuDropdownSelectionItem = {
    id: "None",
    name: this.translate.stream("PUZZLE.NONE"),
    grid: undefined,
  };

  private readonly testPuzzles: Record<TestPuzzleCategory, TestPuzzle[]> = {
    SIMPLE: PuzzleSimple.PUZZLES,
    MEDIUM: PuzzleMedium.PUZZLES,
    ADVANCED: PuzzleAdvanced.PUZZLES,
    HARD: PuzzleHard.PUZZLES,
    EXTREME: PuzzleExtreme.PUZZLES,
  };

  getItems(): SudokuDropdownSelectionItem[] {
    const items: SudokuDropdownSelectionItem[] = [
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
    ];

    Object.entries(this.testPuzzles).forEach(([category, testPuzzles]) => {
      testPuzzles.forEach((testPuzzle: TestPuzzle, index: number) => {
        const testPuzzleItem = this.testPuzzleToSelectionItems(
          testPuzzle,
          category as TestPuzzleCategory,
          index + 1,
        );
        items.push(testPuzzleItem.puzzle);
        items.push(testPuzzleItem.solution);
      });
    });

    return items;
  }

  private testPuzzleToSelectionItems(
    testPuzzle: TestPuzzle,
    category: TestPuzzleCategory,
    index: number,
  ): TestPuzzleSelectionItems {
    return {
      puzzle: {
        id: `Puzzle.${category}_${index}.puzzle`,
        name: this.translate.stream(`PUZZLE.${category}.PUZZLE`, {
          number: index,
        }),
        grid: testPuzzle.puzzle,
      },
      solution: {
        id: `Puzzle.${category}_${index}.solution`,
        name: this.translate.stream(`PUZZLE.${category}.SOLVED`, {
          number: index,
        }),
        grid: testPuzzle.solution,
      },
    };
  }
}

type TestPuzzleCategory = "SIMPLE" | "MEDIUM" | "ADVANCED" | "HARD" | "EXTREME";

interface TestPuzzleSelectionItems {
  puzzle: SudokuDropdownSelectionItem;
  solution: SudokuDropdownSelectionItem;
}
export interface SudokuDropdownSelectionItem extends DropdownInputOption {
  grid: SudokuGrid | undefined;
}
