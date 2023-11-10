import {
  CLEAR_STREAK,
  GET_CURRENT_STREAK, GET_LONGEST_STREAK, GET_MONTH_STREAK,
  IReducer, SET_TRACKING
} from '@frameworks/mobile/redux/interfaces/iStreak'
import {IStreakStateGroup} from "@frameworks/mobile/redux/interfaces/iStreak";
import {IStreaksAction} from "@adapters/presenters/action-interfaces/iStreaks";

const initState: IStreakStateGroup = {
    current: undefined,
    month: undefined,
    longest: undefined,
    tracking: undefined
}

const StreaksReducer: IReducer = (state = initState, action: IStreaksAction) => {
  switch (action.type) {
    case GET_CURRENT_STREAK:
      return {
        ...state,
        current: action.payload?.current
      }
    case GET_LONGEST_STREAK:
      return {
        ...state,
        longest: action.payload?.longest
      }
    case GET_MONTH_STREAK:
      const monthEntity = action.payload?.month;
      if(monthEntity) {
        return {
          ...state,
          month: {
            ...state.month,
            [monthEntity.key]: monthEntity
          }
        }
      } return {
      ...state
    }
    case SET_TRACKING: {
      const trackingEntity = action.payload?.tracking;
      if(!state.tracking ||
        trackingEntity?.stepId &&
        trackingEntity.stepId > state.tracking.stepId
      ) {
        return {
          ...state,
          tracking: trackingEntity
        }
      } else {
        return {
          ...state
        }
      }
    }
    case CLEAR_STREAK:
      return {
        ...state,
        current: undefined,
        longest: undefined,
        month: undefined,
        tracking: undefined,
      }
    default:
      return {
        ...state
      }
  }
}

export default StreaksReducer
