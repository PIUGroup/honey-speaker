import {Logger} from "./logger";

export interface ResponseInfo {
  content: string;
  status: number;
}

export class Fileloader {

  static async loadData(dataUrl: string): Promise<string> {
    const fileLoader: Fileloader = Fileloader.of(dataUrl);
    if (fileLoader) {
      return fileLoader.loadFileContent();
    } else {
      return new Promise((resolve)=>{resolve(null);});
    }
  }

  protected url: URL;

  constructor(fileURL: URL) {
    this.url = fileURL;
  }

  public static of(fileURL: string): Fileloader {
    try {
      return new Fileloader(new URL(fileURL));
    } catch (ex) {
      Logger.errorMessage("Invalid URL:" + fileURL + "\n" + ex);
      return null;
    }
  }

  public async loadFileContent(): Promise<string> {
    // const headers: Headers = new Headers();
    const response = await fetch(this.url.toString(), {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      // headers: headers,
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    if (response.ok) {
      return response.text();
    } else {
      return new Promise((resolve)=>{resolve(null);});
    }
  }
}
