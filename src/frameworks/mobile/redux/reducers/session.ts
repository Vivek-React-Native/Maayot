import {
  LOGIN,
  IReducer,
  HIDE_ONBOARDING,
  ISessionStateGroup,
  SET_MEMBERSHIP
} from '@frameworks/mobile/redux/interfaces/iSession'
import {
  ILoginAction, IMembershipAction, ISessionAction
} from '@adapters/presenters/action-interfaces/iSession'
import profile from "@frameworks/mobile/redux/reducers/profile";

const initState: ISessionStateGroup = {
  sessionInfo: undefined,
  hideOnBoarding: false,
}

type actionType = ILoginAction | ISessionAction | IMembershipAction;

const session: IReducer = (state = initState, action: actionType): ISessionStateGroup => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                sessionInfo: (action as ILoginAction).payload.sessionInfo
            }
      case HIDE_ONBOARDING:
            return {
              ...state,
              hideOnBoarding: (action as ISessionAction).payload
            }
      case SET_MEMBERSHIP:
        if(state.sessionInfo?.token) {
          const sessionInfo = state.sessionInfo
          return {
            ...state,
            sessionInfo: sessionInfo.setMembershipName((action as IMembershipAction).payload)
          }
        }
        return state;
        default:
            return {
                ...state
            }
    }
}

export default session
