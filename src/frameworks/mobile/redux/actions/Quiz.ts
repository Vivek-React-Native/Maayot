import {CLEAR_QUIZ, GET_QUIZ, SET_QUIZ_ANSWER, SET_QUIZ_RESULT} from "@frameworks/mobile/redux/interfaces/iQuiz";
import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";
import {IQuizActions, IQuizAction} from "@adapters/presenters/action-interfaces/iQuiz";
import {IStoryAction} from "@adapters/presenters/action-interfaces/iStory";
import {GET_INTRO} from "@frameworks/mobile/redux/interfaces/iStory";

class QuizActions implements IQuizActions {
  getQuiz(quiz: IQuizEntity): IQuizAction {
    return {
      type: GET_QUIZ,
      payload: {
        quiz: quiz
      }
    }
  }

  setQuizAnswer(quizAnswer: IQuizAnswerEntity): IQuizAction {
    return {
      type: SET_QUIZ_ANSWER,
      payload: {
        quizAnswer: quizAnswer
      }
    }
  }

  setQuizResult(quizResult: IQuizResultEntity): IQuizAction {
    return {
      type: SET_QUIZ_RESULT,
      payload: {
        quizResult: quizResult
      }
    }
  }

  clear(): IQuizAction {
    return {
      type: CLEAR_QUIZ,
    }
  }

}
export default QuizActions
