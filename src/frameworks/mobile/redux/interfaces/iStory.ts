import {IStoryAction} from "@adapters/presenters/action-interfaces/iStory";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";

export const GET_INTRO = 'GET_INTRO'

export interface IStoryStateGroup {
  story?: IStoryEntity
}

export interface IReducer {
    (state: IStoryStateGroup, action: IStoryAction): IStoryStateGroup
}
