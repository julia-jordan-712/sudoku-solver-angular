import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@app/test/puzzles/puzzle-advanced";
import { PuzzleExtreme } from "@app/test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@app/test/puzzles/puzzle-hard";
import { PuzzleMedium } from "@app/test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { TestPuzzle } from "@app/test/puzzles/test-puzzle";

export class SudokuPuzzleSelectionTestData {
  public static createItems(): SudokuDropdownSelectionItem[] {
    const items: SudokuDropdownSelectionItem[] = [
      {
        id: "Puzzle4x4.EMPTY",
        i18nKey: { key: "PUZZLE.4x4.EMPTY" },
        grid: Puzzle4x4.EMPTY,
      },
      {
        id: "Puzzle4x4.COMPLETE",
        i18nKey: { key: "PUZZLE.4x4.COMPLETE" },
        grid: Puzzle4x4.COMPLETE,
      },
    ];

    Object.entries({
      SIMPLE: PuzzleSimple.PUZZLES,
      MEDIUM: PuzzleMedium.PUZZLES,
      ADVANCED: PuzzleAdvanced.PUZZLES,
      HARD: PuzzleHard.PUZZLES,
      EXTREME: PuzzleExtreme.PUZZLES,
    }).forEach(([category, testPuzzles]) => {
      testPuzzles.forEach((testPuzzle: TestPuzzle, index: number) => {
        const testPuzzleItem =
          SudokuPuzzleSelectionTestData.testPuzzleToSelectionItems(
            testPuzzle,
            category as TestPuzzleCategory,
            index + 1,
          );
        items.push(testPuzzleItem.puzzle);
      });
    });

    return items;
  }

  private static testPuzzleToSelectionItems(
    testPuzzle: TestPuzzle,
    category: TestPuzzleCategory,
    index: number,
  ): TestPuzzleSelectionItems {
    return {
      puzzle: {
        id: `Puzzle.${category}_${index}.puzzle`,
        i18nKey: {
          key: `PUZZLE.${category}.PUZZLE`,
          params: {
            number: index,
          },
        },
        grid: testPuzzle.puzzle,
      },
      solution: {
        id: `Puzzle.${category}_${index}.solution`,
        i18nKey: {
          key: `PUZZLE.${category}.SOLVED`,
          params: {
            number: index,
          },
        },
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
