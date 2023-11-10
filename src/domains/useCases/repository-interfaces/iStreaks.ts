import {ICurrentStreaksDTO} from "@domains/dto/streaks/CurrentStreaksDTO";
import {ILongestStreaksDTO} from "@domains/dto/streaks/LongestStreaksDTO";
import {IMonthStreaksDTO} from "@domains/dto/streaks/MonthStreaksDTO";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ITrackingDTO} from "@domains/dto/streaks/TrackingDTO";

export interface IStreaksRepository {
    getCurrentStreak(memberId: string): Promise<ICurrentStreaksDTO | IFailureAPI>
    getLongestStreak(memberId: string): Promise<ILongestStreaksDTO | IFailureAPI>
    getMonthStreak(memberId: string, month: string): Promise<IMonthStreaksDTO | IFailureAPI>

    saveLastStep(step: string, level: string, memberId: string, storyId: string): Promise<ITrackingDTO | IFailureAPI>
    getLastStep(storyId: string, memberId: string, level: string): Promise<ITrackingDTO | IFailureAPI>
}
