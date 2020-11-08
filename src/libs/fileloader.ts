export interface ResponseInfo {
  content: string;
  status: number;
}

export class Fileloader {

  static async loadData(dataUrl: string) {
    return Fileloader.of(dataUrl).loadFileContent();
  }

  url: URL;

  constructor(fileURL: URL) {
    this.url = fileURL;
  }

  public static of(fileURL: string) {
    return new Fileloader(new URL(fileURL));
  }

  public async loadFileContent() {
    // const headers: Headers = new Headers();
    const response = await fetch(this.url.toString(), {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      // headers: headers,
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    if(response.ok){
      return response.text();
    }else{
      return null;
    }
  }
}
