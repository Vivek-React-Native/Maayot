import {IProfileEntity, levelType, languageType} from "@domains/entities/interfaces/iProfile";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IProfileUseCase {
  getProfile(): Promise<IProfileEntity | IFailureAPI>
  saveLevel(level: string, memberId: string): Promise<levelType | IFailureAPI>
  saveLanguage(language: string, memberId: string): Promise<languageType | IFailureAPI>
  savePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, email: string): Promise<boolean | IFailureAPI>
  saveFirstName(firstName: string, memberId: string):Promise<string | IFailureAPI>
  saveEmail (email: string, memberId: string):Promise<string | IFailureAPI>
  register(firstName: string, email: string, password: string, confirmPassword: string, level:string, plan: string, language: string): Promise<boolean | IFailureAPI>
}
