import {IProfileEntity} from "@domains/entities/interfaces/iProfile";
import {IProfileAction} from "@adapters/presenters/action-interfaces/iProfile";

export const GET_PROFILE = 'GET_PROFILE'
export const SET_LEVEL = 'SET_LEVEL'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_ACCOUNT = 'SET_ACCOUNT'

export interface IProfileStateGroup {
  profile?: IProfileEntity
}

export interface IReducer {
    (state: IProfileStateGroup, action: IProfileAction): IProfileStateGroup
}
