import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import IIAPReceiptDTO from "@domains/dto/IAPDTO";
import IAPReceiptDTO from '@domains/dto/IAPDTO'

export interface IIAPRepository {
  verifyReceipt(memberId: string, receipt: string): Promise<IIAPReceiptDTO | IFailureAPI>
  verifyAndroidReceipt(memberId: string, purchaseToken: string, orderId: string, purchaseTime: number, productId: string, packageName: string): Promise<IAPReceiptDTO | IFailureAPI>
}
