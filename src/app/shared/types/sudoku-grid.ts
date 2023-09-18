import { Nullable } from "@app/shared/types/nullable";

export type SudokuGrid = SudokuGridRow[];

export type SudokuGridRow = SudokuGridCell[];

export type SudokuGridCell = Nullable<number>;
