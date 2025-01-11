import { Index } from "@app/types";
import { CellPosition } from "@app/types/cell-position";

/**
 * The cell positions which contain duplicates mapped
 * to the value which is duplicated in these cells.
 */
export type VerificationDuplicates = Index<CellPosition[]>;
