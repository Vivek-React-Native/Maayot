import {ILoginAction, IMembershipAction, ISessionAction} from '../action-interfaces/iSession'
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import {membershipType} from "@domains/entities/interfaces/iProfile";

export interface ISessionPresenter {
    login(id: string, pw: string): Promise<ILoginAction | IFailureAPI>
    getSessionUserInfo(): Promise<ISessionEntity>
    setSession(sessionUserInfo: ISessionEntity): ILoginAction
    removeToken(): ILoginAction
    signOut(dispatch: any): any
    getHideOnBoarding(): Promise<boolean>
    setHideOnBoarding(isHide: boolean, setHideOnBoarding: boolean): ISessionAction
    setMembershipName(membershipName: membershipType): IMembershipAction
}
