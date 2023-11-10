import {IStoryPresenters} from "@adapters/presenters/interfaces/iStory";
import {IStoryUseCase} from "@domains/useCases/interfaces/iStory";
import {IStoryAction, IStoryActions} from "@adapters/presenters/action-interfaces/iStory";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";

class StoryPresenters implements IStoryPresenters {
    constructor(
        private readonly useCases: IStoryUseCase,
        private readonly actions: IStoryActions
    ) {}

    async getIntro(memberId: string, level: string): Promise<IStoryAction> {
        const storyItem: IStoryEntity = await this.useCases.getIntro(memberId, level)
        return this.actions.getIntro(storyItem)
    }
    async clearStory(): Promise<IStoryAction> {
      return this.actions.clearStory()
    }
}

export default StoryPresenters
