import {
  ICurrentStreaksEntity,
  ILongestStreaksEntity,
  IMonthStreaksEntity, ITrackingEntity
} from "@domains/entities/interfaces/iStreaks";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ITrackingDTO} from "@domains/dto/streaks/TrackingDTO";

export interface IStreaksUseCase {
    getCurrentStreak(memberId: string): Promise<ICurrentStreaksEntity | IFailureAPI>
    getLongestStreak(memberId: string): Promise<ILongestStreaksEntity | IFailureAPI>
    getMonthStreak(memberId: string, month: string): Promise<IMonthStreaksEntity | IFailureAPI>

  saveLastStep(step: string, level: string, memberId: string, storyId: string): Promise<ITrackingEntity | IFailureAPI>
  getLastStep(storyId: string, memberId: string, level: string): Promise<ITrackingEntity | IFailureAPI>
}
