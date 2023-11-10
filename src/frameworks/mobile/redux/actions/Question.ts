import {
  CLEAR_QUESTION_ANSWERS,
  CLEAR_QUESTION,
  GET_QUESTION,
  SET_QUESTION_ANSWER,
  SET_QUESTION_ANSWERS
} from "@frameworks/mobile/redux/interfaces/iQuestion";
import {IQuestionAnswerEntity, IQuestionEntity, IQuestionAnswersEntity} from "@domains/entities/interfaces/iQuestion";
import {IQuestionActions, IQuestionAction} from "@adapters/presenters/action-interfaces/iQuestion";

class QuestionActions implements IQuestionActions {
  getQuestion(question: IQuestionEntity): IQuestionAction {
    return {
      type: GET_QUESTION,
      payload: {
        question: question
      }
    }
  }

  setQuestionAnswer(questionAnswer: IQuestionAnswerEntity): IQuestionAction {
    return {
      type: SET_QUESTION_ANSWER,
      payload: {
        questionAnswer: questionAnswer
      }
    }
  }

  setQuestionAnswers(questionAnswers: IQuestionAnswersEntity): IQuestionAction {
    return {
      type: SET_QUESTION_ANSWERS,
      payload: {
        questionAnswers: questionAnswers
      }
    }
  }

  clearAnswers(): IQuestionAction {
    return {
      type: CLEAR_QUESTION_ANSWERS
    }
  }

  clear(): IQuestionAction {
    return {
      type: CLEAR_QUESTION,
    }
  }

}
export default QuestionActions
