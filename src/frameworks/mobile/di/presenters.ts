import IUseCases from './interfaces/iUseCases'
import IActions from './interfaces/iActions'
import BoardPresenter from '@adapters/presenters/Board'
import SessionPresenter from '@adapters/presenters/Session'
import StreakPresenter from "@adapters/presenters/Streak"
import StoryPresenters from "@adapters/presenters/Story"
import ProfilePresenters from "@adapters/presenters/Profile";
import QuizPresenters from "@adapters/presenters/Quiz";
import QuestionPresenters from "@adapters/presenters/Question";
import IAPPresenter from "@adapters/presenters/IAPPresenter";

export default (useCases: IUseCases, actions: IActions) => {
    return {
        board: new BoardPresenter(useCases.board, actions.board),
        session: new SessionPresenter(
          useCases.session,
          actions.session,
          actions.streaks,
          actions.profile,
          actions.story,
          actions.quiz,
          actions.question,
        ),
        streaks: new StreakPresenter(useCases.streaks, actions.streaks),
        story: new StoryPresenters(useCases.story, actions.story),
        profile: new ProfilePresenters(useCases.profile, actions.profile),
        quiz: new QuizPresenters(useCases.quiz, actions.quiz),
        question: new QuestionPresenters(useCases.question, actions.question),
        iap: new IAPPresenter(useCases.iap),
    }
}
