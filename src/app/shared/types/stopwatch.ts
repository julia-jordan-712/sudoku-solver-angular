export class StopWatch {
  private started: number | undefined;
  private stopped: number | undefined;

  start(): void {
    this.started = Date.now();
    this.stopped = undefined;
  }

  stop(): void {
    this.stopped = Date.now();
  }

  timeElapsed(): number {
    return this.started == undefined
      ? 0
      : this.stopped != undefined
      ? this.stopped - this.started
      : Date.now() - this.started;
  }
}
