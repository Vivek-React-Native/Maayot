import {IProfileAction} from "@adapters/presenters/action-interfaces/iProfile";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IProfilePresenter {
  getProfile(): Promise<IProfileAction | IFailureAPI>
  clearProfile(): Promise<IProfileAction>
  saveLevel(level: string, memberId: string): Promise<IProfileAction | IFailureAPI>
  saveLanguage(language: string, memberId: string): Promise<IProfileAction | IFailureAPI>
  savePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, email: string): Promise<boolean | IFailureAPI>
  saveFirstName(firstName: string, email: string, memberId: string):Promise<IProfileAction | IFailureAPI>
  saveEmail(firstName: string, email: string, memberId: string):Promise<IProfileAction | IFailureAPI>
  saveAccount(firstName: string, email: string, memberId: string):Promise<IProfileAction | IFailureAPI>
  register(firstName: string, email: string, password: string, confirmPassword: string, level:string, plan: string,language: string): Promise<boolean | IFailureAPI>
}
