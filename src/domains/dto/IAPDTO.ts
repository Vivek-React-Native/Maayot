export interface IIAPReceiptParams {
    isValid: boolean,
    productId: string,
}

export interface IIAPReceiptDTO {
  readonly isValid: boolean,
  readonly productId: string,
}

class IAPReceiptDTO implements IIAPReceiptDTO {
  readonly isValid: boolean
  readonly productId: string

  constructor(params: IIAPReceiptParams) {
    this.isValid = params.isValid
    this.productId = params.productId
  }
}

export default IAPReceiptDTO
