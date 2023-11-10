import {IProfileAction, IProfileActions} from "@adapters/presenters/action-interfaces/iProfile"
import {IProfileUseCase} from "@domains/useCases/interfaces/iProfile"
import {IProfileEntity, levelType, languageType} from "@domains/entities/interfaces/iProfile"
import {IProfilePresenter} from "@adapters/presenters/interfaces/iProfile"
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp"

class ProfilePresenters implements IProfilePresenter {
  constructor(
    private readonly useCases: IProfileUseCase,
    private readonly actions: IProfileActions
  ) {
  }

  async getProfile(): Promise<IProfileAction | IFailureAPI> {
    const profile: IProfileEntity | IFailureAPI = await this.useCases.getProfile()
    const failure = profile as IFailureAPI
    if (failure.status) {
      return failure
    } else {
      return this.actions.getProfile(profile as IProfileEntity)
    }
  }

  async saveLevel(level: levelType, memberId: string): Promise<IProfileAction | IFailureAPI> {
    const res = await this.useCases.saveLevel(level, memberId)
    const failure =  res as IFailureAPI
    if(failure?.status) {
      return failure
    } else {
      return this.actions.setLevel(res as levelType)
    }
  }
  async saveLanguage(language: languageType, memberId: string): Promise<IProfileAction | IFailureAPI> {
    const res = await this.useCases.saveLanguage(language, memberId)
    const failure =  res as IFailureAPI
    if(failure?.status) {
      return failure
    } else {
      return this.actions.setLanguage(res as languageType)
    }
  }

  async saveFirstName(firstName: string, email: string, memberId: string):Promise<IProfileAction | IFailureAPI> {
    return await Promise.all([
      this.useCases.saveFirstName(firstName, memberId),
      email
    ])
      .then((res: any) => {
        if (res[0].status) {
          return res[0]
        } else if (res[1].status) {
          return res[1]
        } else {
          return this.actions.setAccount(res[0], res[1])
        }
      })
  }

  async saveEmail(firstName: string, email: string, memberId: string):Promise<IProfileAction | IFailureAPI> {
    return await Promise.all([
      firstName,
      this.useCases.saveEmail(email, memberId)
    ])
      .then((res: any) => {
        if (res[0].status) {
          return res[0]
        } else if(res[1].status) {
          return res[1]
        } else {
          return this.actions.setAccount(res[0], res[1])
        }
      })
  }

  async saveAccount(firstName: string, email: string, memberId: string):Promise<IProfileAction | IFailureAPI> {
    const saveFirstName = this.useCases.saveFirstName(firstName, memberId)
    const saveEmail = this.useCases.saveEmail(email, memberId)
    return await Promise.all([
      saveFirstName,
      saveEmail
    ])
      .then((res: any) => {
        if (res[0].status) {
          return res[0]
        } else if(res[1].status) {
          return res[1]
        } else {
          return this.actions.setAccount(res[0], res[1])
        }
      })
  }

  async savePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, email: string): Promise<boolean | IFailureAPI> {
    const res = await this.useCases.savePassword(oldPassword, newPassword, confirmNewPassword, email)
    const failure =  res as IFailureAPI
    if(failure?.status) {
      return failure
    } else {
      return res
    }
  }

  async register(firstName: string, email: string, password: string, confirmPassword: string, level:string, plan: string,language: string): Promise<boolean | IFailureAPI> {
    return  await this.useCases.register(firstName, email, password, confirmPassword, level, plan,language)
  }

  async clearProfile(): Promise<IProfileAction> {
    return this.actions.clearProfile()
  }
}

export default ProfilePresenters
