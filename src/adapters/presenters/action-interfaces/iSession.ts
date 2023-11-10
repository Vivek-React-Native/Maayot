import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import {membershipType} from "@domains/entities/interfaces/iProfile";

export interface IToken {
    sessionInfo?: ISessionEntity
}

export interface ISessionAction {
  type:string
  payload: boolean
}

export interface ILoginAction {
    type: string
    payload: IToken
}

export interface IMembershipAction {
  type: string
  payload: membershipType
}
export interface ISessionActions {
  setSessionUserInfo(sessionInfo: ISessionEntity): ILoginAction
  setSessionHideOnBoarding(isHide: boolean): ISessionAction
  setMembership(membershipType: membershipType): IMembershipAction
}
