import {
  IStreaksAction
} from "@adapters/presenters/action-interfaces/iStreaks";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ITrackingEntity} from "@domains/entities/interfaces/iStreaks";

export interface IStreakPresenters {
    getCurrentStreaks(memberId: string): Promise<IStreaksAction | IFailureAPI>
    getLongestStreaks(memberId: string): Promise<IStreaksAction | IFailureAPI>
    getMonthStreaks(memberId: string, month: string): Promise<IStreaksAction | IFailureAPI>
    clearStreak(): Promise<IStreaksAction>

    getLastStep(storyId: string, memberId: string, level: string): Promise<IStreaksAction | IFailureAPI>
    saveLastStep(step: string, level: string, memberId: string, storyId: string): Promise<IStreaksAction | IFailureAPI>
}
