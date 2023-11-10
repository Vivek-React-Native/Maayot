import {IProfileUseCase} from "@domains/useCases/interfaces/iProfile";
import {IProfileRepository} from "@domains/useCases/repository-interfaces/iProfile";
import {IProfileData, IProfileEntity, levelType, languageType} from "@domains/entities/interfaces/iProfile";
import ProfileEntity from "@domains/entities/Profile";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {IProfileAction} from "@adapters/presenters/action-interfaces/iProfile";

class ProfileUseCase implements IProfileUseCase {
  constructor(private readonly profileRepo: IProfileRepository) {
  }

  async getProfile(): Promise<IProfileEntity | IFailureAPI> {
    const res = await this.profileRepo.getProfile()
    const ProfileDTO = res as IProfileData;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new ProfileEntity(ProfileDTO);
    }
  }

  async saveLevel(level: string, memberId: string): Promise<levelType | IFailureAPI> {
    return await this.profileRepo.saveLevel(level, memberId)
  }
  async saveLanguage(language: string, memberId: string): Promise<languageType | IFailureAPI> {
    return await this.profileRepo.saveLanguage(language, memberId)
  }
  async savePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, email: string): Promise<boolean | IFailureAPI> {
    return await this.profileRepo.savePassword(oldPassword, newPassword, confirmNewPassword, email)
  }
  async saveFirstName(firstName: string, memberId: string):Promise<string | IFailureAPI> {
    return await this.profileRepo.saveFirstName(firstName, memberId)
  }
  async saveEmail (email: string, memberId: string):Promise<string | IFailureAPI> {
    return await this.profileRepo.saveEmail(email, memberId)
  }
  async register(firstName: string, email: string, password: string, confirmPassword: string, level:string, plan: string,language:string): Promise<boolean | IFailureAPI> {
    return await this.profileRepo.register(firstName, email, password, confirmPassword, level, plan,language)
  }
}

export default ProfileUseCase
