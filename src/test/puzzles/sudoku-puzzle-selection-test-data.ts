import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { PuzzleAdvanced } from "@test/puzzles/puzzle-advanced";
import { PuzzleExtreme } from "@test/puzzles/puzzle-extreme";
import { PuzzleHard } from "@test/puzzles/puzzle-hard";
import { PuzzleMedium } from "@test/puzzles/puzzle-medium";
import { PuzzleSimple } from "@test/puzzles/puzzle-simple";
import { TestPuzzle } from "@test/puzzles/test-puzzle";

export class SudokuPuzzleSelectionTestData {
  public static createItems(): SudokuDropdownSelectionItem[] {
    const items: SudokuDropdownSelectionItem[] = [
      {
        id: "Puzzle4x4.EMPTY",
        i18nKey: { key: "PUZZLE.TEST_DATA.4x4.EMPTY" },
        data: Puzzle4x4.EMPTY,
      },
      {
        id: "Puzzle4x4.COMPLETE",
        i18nKey: { key: "PUZZLE.TEST_DATA.4x4.COMPLETE" },
        data: Puzzle4x4.COMPLETE,
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
          key: `PUZZLE.TEST_DATA.${category}.PUZZLE`,
          params: {
            number: index,
          },
        },
        data: testPuzzle.puzzle,
      },
      solution: {
        id: `Puzzle.${category}_${index}.solution`,
        i18nKey: {
          key: `PUZZLE.TEST_DATA.${category}.SOLVED`,
          params: {
            number: index,
          },
        },
        data: testPuzzle.solution,
      },
    };
  }
}

type TestPuzzleCategory = "SIMPLE" | "MEDIUM" | "ADVANCED" | "HARD" | "EXTREME";

interface TestPuzzleSelectionItems {
  puzzle: SudokuDropdownSelectionItem;
  solution: SudokuDropdownSelectionItem;
}
