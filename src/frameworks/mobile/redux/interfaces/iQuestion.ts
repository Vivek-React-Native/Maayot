import {
  IQuestionAnswerEntity,
  IQuestionAnswersEntity,
  IQuestionEntity,
} from "@domains/entities/interfaces/iQuestion";
import {IQuestionAction} from "@adapters/presenters/action-interfaces/iQuestion";

export const GET_QUESTION = 'GET_QUESTION'
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER'
export const SET_QUESTION_ANSWERS = 'SET_QUESTION_ANSWERS'
export const CLEAR_QUESTION_ANSWERS = 'CLEAR_QUESTION_ANSWERS'
export const CLEAR_QUESTION = 'CLEAR_QUESTION'

export interface IQuestionStateGroup {
  question?: IQuestionEntity
  questionAnswer?: IQuestionAnswerEntity
  questionAnswers?: IQuestionAnswersEntity
}

export interface IReducer {
    (state: IQuestionStateGroup, action: IQuestionAction): IQuestionStateGroup
}
