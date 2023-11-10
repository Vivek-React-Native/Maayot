import { ISessionRepository } from '@domains/useCases/repository-interfaces/iSession'
import { IBoardRepository } from '@domains/useCases/repository-interfaces/iBoard'
import {IStreaksRepository} from "@domains/useCases/repository-interfaces/iStreaks";
import {IStoryRepository} from "@domains/useCases/repository-interfaces/iStory";
import {IProfileRepository} from "@domains/useCases/repository-interfaces/iProfile";
import {IQuizRepository} from "@domains/useCases/repository-interfaces/iQuiz";
import {IQuestionRepository} from "@domains/useCases/repository-interfaces/iQuestion";
import {IIAPRepository} from "@domains/useCases/repository-interfaces/iIAP";

export default interface IRepositories {
    session: ISessionRepository
    board: IBoardRepository
    streaks: IStreaksRepository
    story: IStoryRepository
    profile: IProfileRepository
    quiz: IQuizRepository
    question: IQuestionRepository
    iap: IIAPRepository
}
