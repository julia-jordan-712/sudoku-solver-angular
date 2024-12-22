import { Logger } from "@app/core/log/logger";
import { Index } from "@app/shared/types";
import { CellPosition } from "@app/shared/types/cell-position";
import { StopWatch } from "@app/shared/types/stopwatch";
import { Assert } from "@app/shared/util/assertions";

export class CellPositionMap {
  private cellPositionToSquareIndex: Index<number> = {};
  private squareNumberToCellPositions: Record<number, CellPosition[]> = {};

  constructor(size: number) {
    const sqrt: number = Math.sqrt(size);
    Assert.integer(sqrt);
    let squareBaseX = 0;

    for (let i = 0; i < size; i++) {
      const currentSquare: CellPosition[] = [];

      if (i > 0 && i % sqrt === 0) {
        squareBaseX += sqrt;
      }

      for (let j = 0; j < size; j++) {
        const squareX: number = squareBaseX + Math.ceil((1 + j - sqrt) / sqrt);
        const squareY: number = (i % sqrt) * sqrt + (j % sqrt);
        currentSquare.push(new CellPosition(squareX, squareY));
      }

      this.set(i, currentSquare);
    }
  }

  getForPosition(
    position: CellPosition | Pick<CellPosition, "x" | "y">,
  ): CellPosition[] {
    const key: string = this.toKey(position);
    const squareIndex: number | undefined = this.cellPositionToSquareIndex[key];
    Assert.defined(
      squareIndex,
      `Could not get a square index for position '${key}'.`,
    );
    return this.getForSquareIndex(squareIndex);
  }

  getForSquareIndex(squareIndex: number): CellPosition[] {
    const cellPositions: CellPosition[] | undefined =
      this.squareNumberToCellPositions[squareIndex];
    Assert.defined(
      cellPositions,
      `Could not get cell positions for square index ${squareIndex}.`,
    );
    return cellPositions;
  }

  private set(squareIndex: number, positions: CellPosition[]): void {
    StopWatch.monitor(
      () => {
        this.squareNumberToCellPositions[squareIndex] = positions;
        positions.forEach(
          (position) =>
            (this.cellPositionToSquareIndex[this.toKey(position)] =
              squareIndex),
        );
      },
      new Logger(CellPositionMap.name),
      { message: "setting cell positions" },
    );
  }

  private toKey(position: Pick<CellPosition, "x" | "y">): string {
    return `${position.x},${position.y}`;
  }
}
