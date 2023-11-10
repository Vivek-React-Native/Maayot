import {IStoryAction} from "@adapters/presenters/action-interfaces/iStory";

export interface IStoryPresenters {
  getIntro(memberId: string, level: string): Promise<IStoryAction>
  clearStory(): Promise<IStoryAction>
}
