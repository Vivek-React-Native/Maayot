import { IBoardActions } from '@adapters/presenters/action-interfaces/iBoard'
import { ISessionActions } from '@adapters/presenters/action-interfaces/iSession'
import {IStreaksActions} from "@adapters/presenters/action-interfaces/iStreaks";
import {IStoryActions} from "@adapters/presenters/action-interfaces/iStory";
import {IProfileActions} from "@adapters/presenters/action-interfaces/iProfile";
import {IQuizActions} from "@adapters/presenters/action-interfaces/iQuiz";
import {IQuestionActions} from "@adapters/presenters/action-interfaces/iQuestion";

export default interface IActions {
    session: ISessionActions
    board: IBoardActions
    streaks: IStreaksActions
    story: IStoryActions
    profile: IProfileActions
    quiz: IQuizActions
    question: IQuestionActions
}
