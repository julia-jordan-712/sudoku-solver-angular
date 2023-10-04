import { Index } from "@app/shared/types";
import { CellPosition } from "@app/shared/types/cell-position";

export class CellPositionMap {
  private cellPositionToSquareIndex: Index<number> = {};
  private squareNumberToCellPositions: Record<number, CellPosition[]> = {};

  getForPosition(
    position: CellPosition | Pick<CellPosition, "x" | "y">,
  ): CellPosition[] {
    return this.getForSquareIndex(
      this.cellPositionToSquareIndex[this.toKey(position)],
    );
  }

  getForSquareIndex(squareIndex: number): CellPosition[] {
    return this.squareNumberToCellPositions[squareIndex];
  }

  set(squareIndex: number, positions: CellPosition[]): void {
    this.squareNumberToCellPositions[squareIndex] = positions;
    positions.forEach(
      (position) =>
        (this.cellPositionToSquareIndex[this.toKey(position)] = squareIndex),
    );
  }

  private toKey(position: Pick<CellPosition, "x" | "y">): string {
    return `${position.x},${position.y}`;
  }
}
