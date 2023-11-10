import IActions from './interfaces/iActions'
import BoardActions from '../redux/actions/Board'
import SessionActions from '../redux/actions/Session'
import StreaksActions from "../redux/actions/Streaks";
import StoryActions from "@frameworks/mobile/redux/actions/Story";
import ProfileActions from "@frameworks/mobile/redux/actions/Profile";
import QuizActions from "@frameworks/mobile/redux/actions/Quiz";
import QuestionActions from "@frameworks/mobile/redux/actions/Question";

export default (): IActions => {
    return {
        board: new BoardActions(),
        session: new SessionActions(),
        streaks: new StreaksActions(),
        story: new StoryActions(),
        profile: new ProfileActions(),
        quiz: new QuizActions(),
        question: new QuestionActions(),
    }
}
