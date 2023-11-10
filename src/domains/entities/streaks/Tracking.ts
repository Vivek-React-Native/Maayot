import {
  ITrackingData, ITrackingEntity, StorySteps,
} from '@domains/entities/interfaces/iStreaks'

class TrackingEntity implements ITrackingEntity {
  private readonly _key: string;
  private readonly _memberId: string;
  private readonly _step: keyof typeof StorySteps;
  private readonly _stepId: number;
  private readonly _storyId: string;

  constructor(params: ITrackingData) {
    this._key = params.key
    this._memberId = params.memberId
    this._step = params.step
    this._stepId = params.stepId
    this._storyId = params.storyId
  }

  get memberId() {
    return this._memberId;
  }

  get key() {
    return this._key;
  }

  get step() {
    return this._step;
  }

  get stepId() {
    return this._stepId;
  }

  get storyId() {
    return this._storyId;
  }

}

export default TrackingEntity
