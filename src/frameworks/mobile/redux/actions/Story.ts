import {GET_INTRO} from "@frameworks/mobile/redux/interfaces/iStory";
import {IStoryAction, IStoryActions} from "@adapters/presenters/action-interfaces/iStory";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";

class StoryActions implements IStoryActions {
  getIntro(storyItem: IStoryEntity): IStoryAction {
    return {
      type: GET_INTRO,
      payload: {
        story: storyItem
      }
    }
  }
  clearStory(): IStoryAction {
    return {
      type: GET_INTRO,
      payload: {
        story: undefined
      }
    }
  }
}

export default StoryActions
