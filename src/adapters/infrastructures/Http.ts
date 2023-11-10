import { IHttp, IRequestOption } from './interfaces/iHttp'

class Http implements IHttp {
  token: string;
  private readonly _url: string;
  private readonly _urlV1: string;
  constructor(url:string, urlV1: string) {
    this._url = url;
    this._urlV1 = urlV1;
  }

  get url():string {
    return this._url
  }

  get urlV1():string {
    return this._urlV1
  }

  request(requestOption: IRequestOption): Promise<any> {
    const option: RequestInit = {method: requestOption.method}

    if (requestOption?.headers)
      option.headers = new Headers(requestOption.headers)
    if (requestOption?.body)
      option.body = JSON.stringify(requestOption.body)

    return fetch(requestOption.url, option)
      .then((res) => res.json())
      .catch((e) => console.log(e))
  }

  authRequest(requestOption: IRequestOption): Promise<any> {
    const option: RequestInit = {method: requestOption.method}

    if (requestOption?.headers) {
      option.headers = new Headers({
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
         ...requestOption.headers,
      });
    } else {
      option.headers = new Headers({
        'Authorization': 'Bearer ' + this.token,
         'Content-Type': 'application/json'
      });
    }
    if (requestOption?.body)
      option.body = JSON.stringify(requestOption.body)

    return fetch(requestOption.url, option)
      .then((res) => res.json())
  }

  setToken(token: string): void {
    this.token = token;
  }

}

export default Http
