import {iStoryDTO} from "@domains/dto/StoryDTO";

export interface IStoryRepository {
  getIntro(memberId: string, level: string): Promise<iStoryDTO>
}
