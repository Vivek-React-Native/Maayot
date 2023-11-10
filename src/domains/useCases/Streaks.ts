import {IStreaksUseCase} from "@domains/useCases/interfaces/iStreak";
import {IStreaksRepository} from "@domains/useCases/repository-interfaces/iStreaks";
import CurrentStreaks from "@domains/entities/streaks/CurrentStreaks";
import {
  ICurrentStreaksEntity,
  ILongestStreaksEntity,
  IMonthStreaksEntity, ITrackingEntity
} from "@domains/entities/interfaces/iStreaks";
import LongestStreaks from "@domains/entities/streaks/LongestStreaks";
import MonthStreaks from "@domains/entities/streaks/MonthStreaks";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ICurrentStreaksDTO} from "@domains/dto/streaks/CurrentStreaksDTO";
import {ILongestStreaksDTO} from "@domains/dto/streaks/LongestStreaksDTO";
import {IMonthStreaksDTO} from "@domains/dto/streaks/MonthStreaksDTO";
import TrackingEntity from "@domains/entities/streaks/Tracking";
import {ITrackingDTO} from "@domains/dto/streaks/TrackingDTO";

class StreakUseCase implements IStreaksUseCase {
    constructor(private readonly StreakRepo: IStreaksRepository) {}

  async getCurrentStreak(memberId: string): Promise<ICurrentStreaksEntity | IFailureAPI> {
      const res = await this.StreakRepo.getCurrentStreak(memberId)
    const CurrentStreakDTO = res as ICurrentStreaksDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new CurrentStreaks(CurrentStreakDTO);
    }
  }

  async getLongestStreak(memberId: string): Promise<ILongestStreaksEntity | IFailureAPI | IFailureAPI> {
      const res = await  this.StreakRepo.getLongestStreak(memberId)
    const longestStreakDTO = res as ILongestStreaksDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new LongestStreaks(longestStreakDTO);
    }
  }

  async getMonthStreak(memberId: string, month: string): Promise<IMonthStreaksEntity | IFailureAPI> {
    const res = await this.StreakRepo.getMonthStreak(memberId,month)
      const monthStreakDTO = res as IMonthStreaksDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new MonthStreaks(monthStreakDTO);
    }
  }

  async saveLastStep(step: string, level: string, memberId: string, storyId: string): Promise<ITrackingEntity | IFailureAPI> {
    const res = await this.StreakRepo.saveLastStep(step, level, memberId,storyId);
    if ((res as IFailureAPI)?.status) {
      return res;
    } else {
      return new TrackingEntity(res as ITrackingDTO);
    }
  }

  async getLastStep(storyId: string, memberId: string, level: string): Promise<ITrackingEntity | IFailureAPI> {
    const res = await this.StreakRepo.getLastStep(storyId, memberId, level)
    if ((res as IFailureAPI)?.status) {
      return res;
    } else {
      return new TrackingEntity(res as ITrackingDTO);
    }
  }
}

export default StreakUseCase
