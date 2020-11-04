export class Logger {

  protected isLoggingActive: boolean = true;

  constructor(enableLogging: boolean) {
    this.isLoggingActive = enableLogging;
  }


  public logMessage(message) {
    if (console && this.isLoggingActive) {
      console.log(message);
    }
  }

  public debugMessage(message) {
    if (console && this.isLoggingActive) {
      console.debug(message);
    }
  }

  public errorMessage(message) {
    if (console && this.isLoggingActive) {
      console.error(message);
    }
  }

  public infoMessage(message) {
    if (console && this.isLoggingActive) {
      console.info(message);
    }
  }

}
