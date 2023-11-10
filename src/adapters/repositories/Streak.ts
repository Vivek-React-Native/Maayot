  import { IStreaksRepository } from '@domains/useCases/repository-interfaces/iStreaks'
import {IFailureAPI, IHttp} from '@adapters/infrastructures/interfaces/iHttp'
import LongestStreaksDTO, {ILongestStreaksDTO, ILongestStreaksParams} from "@domains/dto/streaks/LongestStreaksDTO";
import CurrentStreaksDTO, {ICurrentStreaksDTO, ICurrentStreaksParams} from "@domains/dto/streaks/CurrentStreaksDTO";
import MonthStreaksDTO, {IMonthStreaksDTO, IMonthStreaksParams} from "@domains/dto/streaks/MonthStreaksDTO";
  import TrackingDTO, {ITrackingDTO, ITrackingParams} from "@domains/dto/streaks/TrackingDTO";
  import {StorySteps} from "@domains/entities/interfaces/iStreaks";


class StreaksRepository implements IStreaksRepository {
  constructor(readonly http: IHttp) {
  }

  async getCurrentStreak(memberId: string): Promise<ICurrentStreaksDTO | IFailureAPI> {
    console.log("warning: CALL API getCurrentStreak");
    const response = await this.http.authRequest({
      method: 'GET',
      url: `${this.http.url}/tracking/streak/current?memberId=${memberId}`
    })
    if(response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response) {
      const currentStreak: ICurrentStreaksParams = {
        memberId: response.memberId,
        counter: response.counter,
        dates: response.dates.map((date: any) => date),
      }
      return new CurrentStreaksDTO(currentStreak);
    }
  }

  async getLongestStreak(memberId: string): Promise<ILongestStreaksDTO | IFailureAPI> {
    console.log("warning: CALL API getLongestStreak");
    const response = await this.http.authRequest({
      method: 'GET',
      url: `${this.http.url}/tracking/streak/longest?memberId=${memberId}`
    })

    if(response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response?.data) {
      const data = response.data;
      const longestStreak: ILongestStreaksParams = {
        memberId: data.memberId,
        counter: data.counter,
        fromDate: data.fromDate,
        toDate: data.toDate,
      }
      return new LongestStreaksDTO(longestStreak);
    }
  }

  async getMonthStreak(memberId: string, month: string): Promise<IMonthStreaksDTO | IFailureAPI> {
    console.log("warning: CALL API getMonthStreak");
    const response = await this.http.authRequest({
      method: 'GET',
      url: `${this.http.url}/tracking/streak/monthly?memberId=${memberId}&month=${month}`
    })

    if(response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response?.data) {
      const data = response.data;
      const monthStreaks: IMonthStreaksParams = {
        key: month,
        memberId: memberId,
        dates: data.map((date: string) => date),
      }
      return new MonthStreaksDTO(monthStreaks);
    }
  }

  async getLastStep(storyId: string, memberId: string, level: string): Promise<ITrackingDTO | IFailureAPI> {
    console.log("warning: CALL API getLastStep");
    const response = await this.http.authRequest({
      method: 'GET',
      url: `${this.http.urlV1}/tracking?storyId=${storyId}&memberId=${memberId}&level=${level?.toLowerCase()}`
    })
    if (response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response?.data) {
      const data = response;
      const trackingDTO: ITrackingParams = {
        key:'',
        memberId: memberId,
        step: data.step || '',
        stepId: data.step && StorySteps[data.step] || 0,
        storyId: data.storyId || storyId,
      }
      return new TrackingDTO(trackingDTO);
    }
  }

  async saveLastStep(step: string, level: string, memberId: string, storyId: string): Promise<ITrackingDTO | IFailureAPI> {
    console.log("warning: CALL API setLastStep ", step);
    const content = {
      step,
      level: level.toLowerCase(),
      memberId,
      storyId,
    };
    let response;
    try {
      response = await this.http.request({
        method: 'POST',
        url: this.http.urlV1 + '/tracking',
        headers: {
          'Content-Type': 'application/json'
        },
        body: content,
      });
    } catch (e) {
      response.status = 404
    }
    if (response.status || response.statusCode) {
      return {
        status: response.status || response.statusCode,
        message: response.message?.message || response.message
      }
    }
    const data = response.data;
    return new TrackingDTO({
      key:'',
      memberId: memberId,
      step: data.step || '',
      stepId: data.step && StorySteps[data.step] || 0,
      storyId: data.storyId || storyId,
    })
  }
}
export default StreaksRepository
