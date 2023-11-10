import IRepositories from './interfaces/iRepositories'
import IInfrastructures from './interfaces/iInfrastructures'
import SessionRepository from '@adapters/repositories/Session'
import BoardRepository from '@adapters/repositories/Board'
import StreaksRepository from "@adapters/repositories/Streak";
import StoryRepository from "@adapters/repositories/Story";
import ProfileRepository from "@adapters/repositories/Profile";
import QuizRepository from "@adapters/repositories/Quiz";
import QuestionRepository from "@adapters/repositories/Question";
import IAPRepository from "@adapters/repositories/iap";

export default (infrastructure: IInfrastructures): IRepositories => {
  return {
    story: new StoryRepository(infrastructure.http),
    streaks: new StreaksRepository(infrastructure.http),
    session: new SessionRepository(
      infrastructure.http,
      infrastructure.storage
    ),
    board: new BoardRepository(infrastructure.http),
    profile: new ProfileRepository(infrastructure.http),
    quiz: new QuizRepository(infrastructure.http),
    question: new QuestionRepository((infrastructure.http)),
    iap: new IAPRepository((infrastructure.http)),
  }
}
