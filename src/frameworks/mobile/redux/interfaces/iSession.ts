import {
    ILoginAction
} from '@adapters/presenters/action-interfaces/iSession'
import {ISessionEntity} from "@domains/entities/interfaces/iSession";

export const LOGIN = 'LOGIN'
export const HIDE_ONBOARDING = 'HIDE_ONBOARDING'
export const SET_MEMBERSHIP = 'SET_MEMBERSHIP'

export interface ISessionStateGroup {
    sessionInfo?: ISessionEntity
    hideOnBoarding: boolean
}

export interface IReducer {
    (state: ISessionStateGroup, action: ILoginAction): ISessionStateGroup
}
