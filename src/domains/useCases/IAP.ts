import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {IIAPUseCase} from "@domains/useCases/interfaces/iIAP";
import {IIAPRepository} from "@domains/useCases/repository-interfaces/iIAP";
import {IIAPReceiptEntity} from "@domains/entities/interfaces/iIAP";
import IAPReceiptDTO from "@domains/dto/IAPDTO";
import IAPReceiptEntity from "@domains/entities/IAP";

class IAPUseCase implements IIAPUseCase {
  constructor(private readonly iapRepo: IIAPRepository) {
  }

  async verifyReceipt(memberId: string, receipt: string): Promise<IIAPReceiptEntity | IFailureAPI> {
    const res: IAPReceiptDTO | IFailureAPI = await this.iapRepo.verifyReceipt(memberId, receipt);
    const IAPReceiptDTO = res as IAPReceiptDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new IAPReceiptEntity(IAPReceiptDTO)
    }
  }
  async verifyAndroidReceipt(
    memberId: string,
    purchaseToken: string,
    orderId: string,
    purchaseTime: number,
    productId: string,
    packageName: string
  ): Promise<IAPReceiptDTO | IFailureAPI> {
    const res: IAPReceiptDTO | IFailureAPI = await this.iapRepo.verifyAndroidReceipt(memberId, purchaseToken, orderId, purchaseTime, productId, packageName);
    const IAPReceiptDTO = res as IAPReceiptDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new IAPReceiptEntity(IAPReceiptDTO)
    }
  }
}

export default IAPUseCase;
