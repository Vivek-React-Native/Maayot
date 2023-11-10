import {
  GET_QUIZ,
  IReducer,
  IQuizStateGroup, SET_QUIZ_ANSWER, SET_QUIZ_RESULT, CLEAR_QUIZ
} from '@frameworks/mobile/redux/interfaces/iQuiz'
import {
  IQuizAction,
  IQuizAnswerState,
  IQuizResultState,
  IQuizState
} from "@adapters/presenters/action-interfaces/iQuiz";

const initState: IQuizStateGroup = {
  quiz: undefined,
  quizAnswer: undefined,
  quizResult: undefined,
}

const QuizReducer: IReducer = (state = initState, action: IQuizAction) => {
  switch (action.type) {
    case GET_QUIZ:
      const quiz = (action.payload as IQuizState).quiz;
      return {
        ...state,
        quiz: quiz,
        quizAnswer: quiz.getQuizAnswer(),
        quizResult: quiz.getQuizResult(),
      }
    case SET_QUIZ_ANSWER:
      if(state.quiz) {
        return {
          ...state,
          quizAnswer: (action.payload as IQuizAnswerState).quizAnswer
        }
      } else {
        return {
          ...state,
          quiz: undefined
        }
      }
    case SET_QUIZ_RESULT:
      if(state.quiz) {
        return {
          ...state,
          quizResult: (action.payload as IQuizResultState).quizResult
        }
      } else {
        return {
          ...state,
          quizResult: undefined
        }
      }
    case CLEAR_QUIZ: {
      return {
        quiz: undefined,
        quizAnswer: undefined,
        quizResult: undefined,
      }
    }
    default:
      return state;
  }
}
export default QuizReducer
