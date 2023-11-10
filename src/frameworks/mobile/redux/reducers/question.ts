import {
  GET_QUESTION,
  SET_QUESTION_ANSWER,
  SET_QUESTION_ANSWERS,
  CLEAR_QUESTION,
  IReducer,
  IQuestionStateGroup, CLEAR_QUESTION_ANSWERS,
} from '@frameworks/mobile/redux/interfaces/iQuestion'
import {
  IQuestionAction,
  IQuestionAnswerState,
  IQuestionAnswersState,
  IQuestionState
} from "@adapters/presenters/action-interfaces/iQuestion";

const initState: IQuestionStateGroup = {
  question: undefined,
  questionAnswer: undefined,
  questionAnswers: undefined,
}

const QuestionReducer: IReducer = (state = initState, action: IQuestionAction) => {
  switch (action.type) {
    case GET_QUESTION:
      const question = (action.payload as IQuestionState).question;
      return {
        ...state,
        question: question,
        questionAnswer: question.memberAnswer,
        questionAnswers: question.historicalAnswers
      }
    case SET_QUESTION_ANSWER:
      if(state.question) {
        return {
          ...state,
          questionAnswer: (action.payload as IQuestionAnswerState).questionAnswer
        }
      } else {
        return {
          ...state,
          question: undefined
        }
      }
    case SET_QUESTION_ANSWERS:
      if(state.question) {
        const questionAnswers = (action.payload as IQuestionAnswersState).questionAnswers;
        return {
          ...state,
          questionAnswers: {
            answers: [
              ...state.questionAnswers?.answers || [],
              ...questionAnswers.answers || []
            ],
            ref: questionAnswers.ref,
            ts: questionAnswers.ts,
          }
        }
      } else {
        return {
          ...state,
          questionAnswers: undefined
        }
      }

    case CLEAR_QUESTION_ANSWERS:
      return {
        ...state,
        questionAnswers:undefined
      }

    case CLEAR_QUESTION: {
      return {
        question: undefined,
        questionAnswer: undefined,
        questionAnswers: undefined,
      }
    }
    default:
      return state;
  }
}
export default QuestionReducer
