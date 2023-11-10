import {StorySteps} from "@domains/entities/interfaces/iStreaks";

export interface ITrackingParams {
  key: string,
  memberId: string
  storyId: string
  step: keyof typeof StorySteps,
  stepId: number
}
export interface ITrackingDTO {
  readonly key: string
  readonly memberId: string
  readonly storyId: string
  readonly step: keyof typeof StorySteps,
  readonly stepId: number
}

class TrackingDTO implements ITrackingDTO {
  readonly key: string
  readonly memberId: string
  readonly step: keyof typeof StorySteps;
  readonly stepId: number;
  readonly storyId: string;

  constructor(params: ITrackingParams) {
    this.key = params.key
    this.memberId = params.memberId
    this.stepId = params.stepId
    this.storyId = params.storyId
    this.step = params.step
  }


}

export default TrackingDTO

