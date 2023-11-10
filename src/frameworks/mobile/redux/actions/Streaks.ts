import {
  IStreaksAction,
  IStreaksActions
} from '@adapters/presenters/action-interfaces/iStreaks'
import {
  ICurrentStreaksEntity,
  ILongestStreaksEntity,
  IMonthStreaksEntity,
  ITrackingEntity
} from "@domains/entities/interfaces/iStreaks";
import {
  GET_CURRENT_STREAK,
  GET_LONGEST_STREAK,
  GET_MONTH_STREAK,
  CLEAR_STREAK,
  SET_TRACKING
} from "@frameworks/mobile/redux/interfaces/iStreak";

class StreaksActions implements IStreaksActions {
  getCurrentStreaks(currentStreakItem: ICurrentStreaksEntity): IStreaksAction {
    return {
      type: GET_CURRENT_STREAK,
      payload: {
        current: currentStreakItem
      }
    }
  }
  getLongestStreaks(longestStreakItem: ILongestStreaksEntity): IStreaksAction {
    return {
      type: GET_LONGEST_STREAK,
      payload: {
        longest: longestStreakItem
      }
    }

  }
  getMonthStreak(monthStreakItem: IMonthStreaksEntity): IStreaksAction {
    return {
      type: GET_MONTH_STREAK,
      payload: {
        month: monthStreakItem
      }
    }
  }
  clearStreak(): IStreaksAction {
    return {
      type: CLEAR_STREAK,
    }
  }

  setTracking(tracking: ITrackingEntity): IStreaksAction {
    return {
      type: SET_TRACKING,
      payload: {
        tracking: tracking
      }
    }
  }
}

export default StreaksActions
