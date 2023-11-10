import {HIDE_ONBOARDING, LOGIN, SET_MEMBERSHIP} from '@frameworks/mobile/redux/interfaces/iSession'
import {
  ILoginAction, ISessionAction,
  ISessionActions
} from '@adapters/presenters/action-interfaces/iSession'
import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import {membershipType} from "@domains/entities/interfaces/iProfile";

class SessionActions implements ISessionActions {
  setSessionUserInfo(sessionInfo: ISessionEntity): ILoginAction {
    return {
      type: LOGIN,
      payload: {
        sessionInfo
      }
    }
  }

  setSessionHideOnBoarding(isHide: boolean): ISessionAction {
    return {
      type: HIDE_ONBOARDING,
      payload: isHide
    }
  }

  setMembership(membershipType: membershipType) {
    return {
      type: SET_MEMBERSHIP,
      payload: membershipType
    }
  }
}

export default SessionActions
