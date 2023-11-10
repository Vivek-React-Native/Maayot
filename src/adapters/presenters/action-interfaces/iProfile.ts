import {IProfileEntity, languageType, levelType} from "@domains/entities/interfaces/iProfile";

export interface IProfileState {
  profile?: IProfileEntity
}
export interface IProfileLevelState {
  level: levelType
}
export interface IProfileLevelState {
  language: languageType
}
export interface IProfileAccountState {
  firstName: string,
  email: string,
}
export interface IProfileAction {
  type: string
  payload: IProfileState | IProfileLevelState | IProfileAccountState
}
export interface IProfileActions {
  getProfile(profile: IProfileEntity): IProfileAction
  setLevel(level: levelType): IProfileAction
  setLanguage(language: languageType): IProfileAction
  setAccount(firstName: string, email: string): IProfileAction
  clearProfile(): IProfileAction
}
