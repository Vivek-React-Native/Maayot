import {IIAPReceiptData, IIAPReceiptEntity} from "@domains/entities/interfaces/iIAP";

class IAPReceiptEntity implements IIAPReceiptEntity {
  private readonly _isValid: boolean
  private readonly _productId: string

  constructor(params: IIAPReceiptData) {
    this._isValid = params.isValid
    this._productId = params.productId
  }
  get isValid() {
    return this._isValid
  }

  get productId() {
    return this._productId
  }
}

export default IAPReceiptEntity
