import {
  IStreaksAction, IStreakState,
} from "@adapters/presenters/action-interfaces/iStreaks";
import {
  ICurrentStreaksEntity,
  ILongestStreaksEntity,
  IMonthStreaksEntity,
  ITrackingEntity
} from "@domains/entities/interfaces/iStreaks";


export const GET_CURRENT_STREAK = 'GET_CURRENT_STREAK'
export const GET_LONGEST_STREAK = 'GET_LONGEST_STREAK'
export const GET_MONTH_STREAK = 'GET_MONTH_STREAK'
export const SET_TRACKING = 'SET_TRACKING'
export const CLEAR_STREAK = 'CLEAR_STREAK'

export interface IStreakStateGroup {
  current?: ICurrentStreaksEntity
  longest?: ILongestStreaksEntity
  tracking?: ITrackingEntity
  month?: any
}

export interface IReducer {
    (state: IStreakStateGroup, action: IStreaksAction): IStreakStateGroup
}
