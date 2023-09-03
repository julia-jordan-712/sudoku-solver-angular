export class CellPosition {
  constructor(public readonly x: number, public readonly y: number) {}

  equals(other: CellPosition) {
    return this.x === other.x && this.y === other.y;
  }

}
