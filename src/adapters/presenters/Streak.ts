import {IStreaksUseCase} from "@domains/useCases/interfaces/iStreak";
import {IStreakPresenters} from "@adapters/presenters/interfaces/iStreak";
import {
  IStreaksAction,
  IStreaksActions
} from "@adapters/presenters/action-interfaces/iStreaks";
import {
  ICurrentStreaksEntity,
  ILongestStreaksEntity,
  IMonthStreaksEntity,
  ITrackingEntity
} from "@domains/entities/interfaces/iStreaks";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {levelType} from "@domains/entities/interfaces/iProfile";

class StreakPresenter implements IStreakPresenters {
    constructor(
        private readonly useCases: IStreaksUseCase,
        private readonly actions: IStreaksActions
    ) {}

    async getCurrentStreaks(memberId: string): Promise<IStreaksAction | IFailureAPI> {
        const res: ICurrentStreaksEntity | IFailureAPI = await this.useCases.getCurrentStreak(memberId)
        const failure = res as IFailureAPI;
        if(failure.status) {
          return failure;
        } else {
          return this.actions.getCurrentStreaks(res as ICurrentStreaksEntity)
        }
    }

    async getLongestStreaks(memberId: string): Promise<IStreaksAction | IFailureAPI> {
      const longestStreak = await this.useCases.getLongestStreak(memberId);
      const failure = longestStreak as IFailureAPI;
      if(failure.status) {
        return failure;
      } else {
        return this.actions.getLongestStreaks(longestStreak as ILongestStreaksEntity);
      }

    }

    async getMonthStreaks(memberId: string, month: string): Promise<IStreaksAction | IFailureAPI> {
      const monthStreak = await this.useCases.getMonthStreak(memberId, month);
      const failure = monthStreak as IFailureAPI;
      if(failure.status) {
        return failure;
      } else {
        return this.actions.getMonthStreak(monthStreak as IMonthStreaksEntity);
      }
    }

    async getLastStep(storyId: string, memberId: string, level: levelType): Promise<IStreaksAction | IFailureAPI> {
      const tracking = await this.useCases.getLastStep(storyId, memberId, level);
      const failure = tracking as IFailureAPI;
      if(failure.status) {
        return failure;
      } else {
        return this.actions.setTracking(tracking as ITrackingEntity);
      }
    }

    async saveLastStep(step: string, level: levelType, memberId: string, storyId: string): Promise<IStreaksAction | IFailureAPI> {
      const tracking = await this.useCases.saveLastStep(step, level, memberId, storyId);
      const failure = tracking as IFailureAPI;
      if(failure.status) {
        return failure;
      } else {
        return this.actions.setTracking(tracking as ITrackingEntity);
      }
    }

    async clearStreak(): Promise<IStreaksAction> {
      return this.actions.clearStreak();
    }
}

export default StreakPresenter
