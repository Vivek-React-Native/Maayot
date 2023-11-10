import {IStoryEntity} from "@domains/entities/interfaces/iStory";

export interface IStoryState {
  story?: IStoryEntity
}
export interface IStoryAction {
  type: string
  payload?: IStoryState
}

export interface IStoryActions {
  getIntro(story: IStoryEntity): IStoryAction
  clearStory(): IStoryAction
}
