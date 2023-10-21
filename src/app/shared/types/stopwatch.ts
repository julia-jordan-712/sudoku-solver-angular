export class StopWatch {
  private started: number | undefined;
  private stopped: number | undefined;

  isStarted(): boolean {
    return this.started != undefined;
  }

  isStopped(): boolean {
    return this.started != undefined;
  }

  start(): void {
    this.started = Date.now();
    this.stopped = undefined;
  }

  stop(): void {
    this.stopped = Date.now();
  }

  reset(): void {
    this.started = undefined;
    this.stopped = undefined;
  }

  timeElapsed(): number {
    return this.started == undefined
      ? 0
      : this.stopped != undefined
      ? this.stopped - this.started
      : Date.now() - this.started;
  }
}
