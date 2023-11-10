import {IIAPRepository} from '@domains/useCases/repository-interfaces/iIAP'
import {IFailureAPI, IHttp} from '@adapters/infrastructures/interfaces/iHttp'
import IAPReceiptDTO from "@domains/dto/IAPDTO";

class IAPRepository implements IIAPRepository {
  constructor(readonly http: IHttp) {
  }
  async verifyReceipt(memberId: string, receipt: string): Promise<IAPReceiptDTO | IFailureAPI> {
    console.log('CALL VERIFY RECEIPT');
    const content = {
      memberId,
      receipt,
    }
    let response;
    try {
      response = await this.http.authRequest({
        method: 'POST',
        url: this.http.url + '/payment/verifyReceipt',
        headers: {
          'Content-Type': 'application/json'
        },
        body: content,
      });
    } catch (e) {
      response.status = 404
    }
    if (response.status || response.statusCode) {
      return {
        status: response.status || response.statusCode,
        message: response.message?.message || response.message
      }
    }
    return new IAPReceiptDTO({
      isValid: response.isValid,
      productId: response.productId,
    })
  }
  async verifyAndroidReceipt(
    memberId: string,
    purchaseToken: string,
    orderId: string,
    purchaseTime: number,
    productId: string,
    packageName: string
  ): Promise<IAPReceiptDTO | IFailureAPI> {
    const content = {
      memberId,
      purchaseToken,
      orderId,
      purchaseTime,
      productId,
      packageName,
    }
    console.log('CALL ANDROID VERIFY RECEIPT', memberId, content);
    let response;
    try {
      response = await this.http.authRequest({
        method: 'POST',
        url: this.http.url + '/payment/verifyAndroidReceipt',
        headers: {
          'Content-Type': 'application/json'
        },
        body: content,
      });
    } catch (e) {
      response.status = 404
    }
    if (response.status || response.statusCode) {
      return {
        status: response.status || response.statusCode,
        message: response.message?.message || response.message
      }
    }
    return new IAPReceiptDTO({
      isValid: response.isValid,
      productId: response.productId,
    })
  }
}

export default IAPRepository
