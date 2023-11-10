import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import { IIAPReceiptEntity } from "@domains/entities/interfaces/iIAP";
import IAPReceiptDTO from '@domains/dto/IAPDTO'

export interface IIAPUseCase {
  verifyReceipt(memberId: string, receipt: string): Promise<IIAPReceiptEntity | IFailureAPI>
  verifyAndroidReceipt(memberId: string, purchaseToken: string, orderId: string, purchaseTime: number, productId: string, packageName: string): Promise<IAPReceiptDTO | IFailureAPI>
}
