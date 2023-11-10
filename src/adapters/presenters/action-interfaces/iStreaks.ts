import {
  ICurrentStreaksEntity, ILongestStreaksEntity, IMonthStreaksEntity, ITrackingEntity,
} from '@domains/entities/interfaces/iStreaks'

export interface IStreakState {
  current?: ICurrentStreaksEntity
  longest?: ILongestStreaksEntity
  month?: IMonthStreaksEntity
  tracking?: ITrackingEntity
}
export interface IStreaksAction {
  type: string
  payload?: IStreakState
}

export interface IStreaksActions {
    getCurrentStreaks(currentStreakItem: ICurrentStreaksEntity): IStreaksAction
    getLongestStreaks(longestStreakItem: ILongestStreaksEntity): IStreaksAction
    getMonthStreak(monthStreakItem: IMonthStreaksEntity): IStreaksAction
    clearStreak(): IStreaksAction
    setTracking(tracking: ITrackingEntity): IStreaksAction
}
