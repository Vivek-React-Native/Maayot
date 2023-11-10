import {IStoryEntity} from "@domains/entities/interfaces/iStory";

export interface IStoryUseCase {
  getIntro(memberId: string, level: string): Promise<IStoryEntity>
}
