/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class Logger {
  constructor(private className: string) {}

  logError(message: string, cause?: any): void {
    this.log("ERROR", message, cause);
  }

  logWarning(message: string, cause?: any): void {
    this.log("WARN", message, cause);
  }

  logInfo(message: string, cause?: any): void {
    this.log("INFO", message, cause);
  }

  logDebug(message: string, cause?: any): void {
    this.log("DEBUG", message, cause);
  }

  private log(level: LogLevel, message: string, cause?: any): void {
    if (cause) {
      if (level === "ERROR") {
        console.error(this.createMessage(level, message), cause);
      } else if (level === "WARN") {
        console.warn(this.createMessage(level, message), cause);
      } else {
        console.log(this.createMessage(level, message), cause);
      }
    } else {
      if (level === "ERROR") {
        console.error(this.createMessage(level, message));
      } else if (level === "WARN") {
        console.warn(this.createMessage(level, message));
      } else {
        console.log(this.createMessage(level, message));
      }
    }
  }

  private createMessage(level: LogLevel, message: string): string {
    const now: string = new Date(Date.now()).toISOString();
    return `${now} ${level.padEnd(6)} ${this.className} - ${message}`;
  }
}

declare type LogLevel = "ERROR" | "WARN" | "INFO" | "DEBUG";
