import {IStoryUseCase} from "@domains/useCases/interfaces/iStory";
import {IStoryRepository} from "@domains/useCases/repository-interfaces/iStory";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";
import StoryEntity from "@domains/entities/Story";

class StoryUseCase implements IStoryUseCase {
  constructor(private readonly StoryRepo: IStoryRepository) {
  }

  async getIntro(memberId: string, level: string): Promise<IStoryEntity> {
    const StoryDTO = await this.StoryRepo.getIntro(memberId, level)
    return new StoryEntity(StoryDTO);
  }
}

export default StoryUseCase
