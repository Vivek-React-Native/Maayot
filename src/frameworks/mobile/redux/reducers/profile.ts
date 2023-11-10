import {
  GET_PROFILE,
  IReducer, SET_ACCOUNT, SET_LEVEL,SET_LANGUAGE
} from '@frameworks/mobile/redux/interfaces/iProfile'
import {
  IProfileAccountState,
  IProfileAction,
  IProfileLevelState,
  IProfileState
} from "@adapters/presenters/action-interfaces/iProfile";
import {IProfileStateGroup} from "@frameworks/mobile/redux/interfaces/iProfile";

const initState: IProfileStateGroup = {
  profile: undefined
}

const ProfileReducer: IReducer = (state = initState, action: IProfileAction) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: (action.payload as IProfileState).profile
      }
    case SET_LEVEL:
      return {
        ...state,
        profile: state.profile?.setLevel((action.payload as IProfileLevelState).level)
      }
      case SET_LANGUAGE:
      return {
        ...state,
        profile: state.profile?.setLanguage((action.payload as IProfileLevelState).language)
      }
    case SET_ACCOUNT:
      const accountInfoUpdate = (action.payload as IProfileAccountState);
      return {
        ...state,
        profile: state.profile?.setAccount(accountInfoUpdate.firstName, accountInfoUpdate.email)
      }
    default:
      return state;
  }
}
export default ProfileReducer
