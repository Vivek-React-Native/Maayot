import {IProfileDTO} from "@domains/dto/ProfileDTO";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {levelType, languageType} from "@domains/entities/interfaces/iProfile";

export interface IProfileRepository {
  getProfile(): Promise<IProfileDTO | IFailureAPI>
  saveLevel(level: string, memberId: string): Promise<levelType | IFailureAPI>
  saveLanguage(language: string, memberId: string): Promise<languageType | IFailureAPI>
  savePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, email: string): Promise<boolean | IFailureAPI>
  saveFirstName(firstName: string, memberId: string):Promise<string | IFailureAPI>
  saveEmail (email: string, memberId: string):Promise<string | IFailureAPI>
  register(firstName: string, email: string, password: string, confirmPassword: string, level:string, plan: string, language: string): Promise<boolean | IFailureAPI>
}
