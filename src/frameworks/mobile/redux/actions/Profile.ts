import {IProfileAction, IProfileActions} from "@adapters/presenters/action-interfaces/iProfile";
import {IProfileEntity, levelType} from "@domains/entities/interfaces/iProfile";
import {GET_PROFILE, SET_ACCOUNT, SET_LEVEL, SET_LANGUAGE} from "@frameworks/mobile/redux/interfaces/iProfile";

class ProfileActions implements IProfileActions {
  getProfile(profile: IProfileEntity): IProfileAction {
    return {
      type: GET_PROFILE,
      payload: {
        profile: profile
      }
    }
  }

  setLevel(level: levelType): IProfileAction {
    return {
      type: SET_LEVEL,
      payload: {
        level: level
      }
    }
  }
  setLanguage(language: levelType): IProfileAction {
      return {
        type: SET_LANGUAGE,
        payload: {
          level: language
        }
      }
    }
  setAccount(firstName: string, email: string): IProfileAction {
    return {
      type: SET_ACCOUNT,
      payload: {firstName, email}
    }
  }

  clearProfile(): IProfileAction {
    return {
      type: GET_PROFILE,
      payload: {
        profile: undefined
      }
    }
  }
}

export default ProfileActions
