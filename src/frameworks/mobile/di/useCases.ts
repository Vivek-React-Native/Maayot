import IRepositories from './interfaces/iRepositories'
import IUseCases from './interfaces/iUseCases'
import Session from '@domains/useCases/Session'
import Board from '@domains/useCases/Board'
import Streaks from '@domains/useCases/Streaks'
import Story from "@domains/useCases/Story";
import Profile from "@domains/useCases/Profile";
import Quiz from "@domains/useCases/Quiz";
import Question from "@domains/useCases/Question";
import IAP from "@domains/useCases/IAP";

export default (repositories: IRepositories): IUseCases => {
    return {
        board: new Board(repositories.board),
        session: new Session(repositories.session),
        streaks: new Streaks(repositories.streaks),
        story: new Story(repositories.story),
        profile: new Profile(repositories.profile),
        quiz: new Quiz(repositories.quiz),
        question: new Question(repositories.question),
        iap: new IAP(repositories.iap)
    }
}
