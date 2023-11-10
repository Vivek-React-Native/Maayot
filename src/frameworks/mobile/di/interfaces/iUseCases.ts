import { ISessionUseCase } from '@domains/useCases/interfaces/iSession'
import { IBoardUseCase } from '@domains/useCases/interfaces/iBoard'
import {IStreaksUseCase} from "@domains/useCases/interfaces/iStreak";
import {IStoryUseCase} from "@domains/useCases/interfaces/iStory";
import {IProfileUseCase} from "@domains/useCases/interfaces/iProfile";
import {IQuizUseCase} from "@domains/useCases/interfaces/iQuiz";
import {IQuestionUseCase} from "@domains/useCases/interfaces/iQuestion";
import {IIAPUseCase} from "@domains/useCases/interfaces/iIAP";

export default interface IUseCases {
    session: ISessionUseCase
    board: IBoardUseCase
    streaks: IStreaksUseCase
    story: IStoryUseCase
    profile: IProfileUseCase
    quiz: IQuizUseCase
    question: IQuestionUseCase
    iap: IIAPUseCase
}
