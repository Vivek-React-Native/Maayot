import {IIAPPresenter} from "@adapters/presenters/interfaces/iIAP";
import {IIAPReceiptEntity} from "@domains/entities/interfaces/iIAP";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {IIAPUseCase} from "@domains/useCases/interfaces/iIAP";
import IAPReceiptDTO from '@domains/dto/IAPDTO'

class IAPPresenter implements IIAPPresenter {
  constructor(
    private readonly useCases: IIAPUseCase,
  ) {}

  verifyReceipt(memberId: string, receipt: string): Promise<IIAPReceiptEntity | IFailureAPI> {
    return this.useCases.verifyReceipt(memberId, receipt);
  }

  verifyAndroidReceipt(
    memberId: string,
    purchaseToken: string,
    orderId: string,
    purchaseTime: number,
    productId: string,
    packageName: string
  ): Promise<IAPReceiptDTO | IFailureAPI> {
    return this.useCases.verifyAndroidReceipt(memberId, purchaseToken, orderId, purchaseTime, productId, packageName);
  }
}

export default IAPPresenter
