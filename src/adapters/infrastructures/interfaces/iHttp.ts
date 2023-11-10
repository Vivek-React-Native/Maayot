export interface IRequestOption {
    readonly method: string
    readonly url: string
    readonly headers?: any
    readonly body?: any
}

export interface IFailureAPI {
  status: number,
  message: string
}

export interface IHttp {
    url: string
    urlV1: string
    setToken(token: string): void
    request(requestOption: IRequestOption): Promise<any>
    authRequest(requestOption: IRequestOption): Promise<any>
}
