export class Logger {

  protected static isLoggingActive: boolean = true;

  public static disableLogging(): void {
    this.isLoggingActive = false;
  }

  public static enableLogging(): void {
    this.isLoggingActive = true;
  }

  public static toggleLogging(enableLogging: boolean) {
    if (enableLogging) {
      Logger.enableLogging();
    } else {
      Logger.disableLogging();
    }
  }

  constructor(enableLogging: boolean) {
    Logger.isLoggingActive = enableLogging;
  }

  public static logMessage(message) {
    if (console && this.isLoggingActive) {
      console.log(message);
    }
  }

  public static debugMessage(message) {
    if (console && this.isLoggingActive) {
      console.debug(message);
    }
  }

  public static errorMessage(message) {
    if (console && this.isLoggingActive) {
      console.error(message);
    }
  }

  public static infoMessage(message) {
    if (console && this.isLoggingActive) {
      console.info(message);
    }
  }

}
