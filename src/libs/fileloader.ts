import {Subject} from "rxjs";

export interface ResponseInfo {
  content: string;
  status: number;
}

export class Fileloader {

  static async loadData(dataUrl: string): Promise<string> {
    return await new Promise<string>(resolve =>
      Fileloader.of(dataUrl).loadFile().subscribe((indexInfo: ResponseInfo) => {
        resolve(indexInfo.content);
      }));
  }

  url: URL;
  responseInfo: ResponseInfo ={ content: null, status: null};

  constructor(fileURL: URL) {
    this.url = fileURL;
  }

  public static of(fileURL: string) {
    return new Fileloader(new URL(fileURL));
  }

  public loadFile(): Subject<ResponseInfo> {
    const responseInfo = this.responseInfo;
    const subject: Subject<ResponseInfo> = new Subject<ResponseInfo>();

    const client = new XMLHttpRequest();
    client.addEventListener("load", (event) => {
      responseInfo.content=client.responseText;
      console.log(event.total + " bytes gelesen.\n:"+responseInfo.content);
    });
    client.onloadend = function(){
      responseInfo.status = client.status;
      console.log("Response Status:"+responseInfo.status);
      subject.next(responseInfo);
    };
    client.open("GET", this.url.toString());
    client.send();

    return subject;
  }
}
