import {
  GET_INTRO,
  IReducer
} from '@frameworks/mobile/redux/interfaces/iStory'
import {IStoryStateGroup} from "@frameworks/mobile/redux/interfaces/iStory";
import {IStoryAction} from "@adapters/presenters/action-interfaces/iStory";

const initState: IStoryStateGroup = {
  story: undefined
}

const StoryReducer: IReducer = (state = initState, action: IStoryAction) => {
  switch (action.type) {
    case GET_INTRO:
      return {
        ...state,
        story: action?.payload?.story
      }
    default:
      return {
        ...state
      }
  }
}

export default StoryReducer
