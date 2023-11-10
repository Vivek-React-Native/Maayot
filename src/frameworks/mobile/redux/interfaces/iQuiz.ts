import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";
import {IQuizAction} from "@adapters/presenters/action-interfaces/iQuiz";

export const GET_QUIZ = 'GET_QUIZ'
export const SET_QUIZ_ANSWER = 'SET_QUIZ_ANSWER'
export const SET_QUIZ_RESULT = 'SET_QUIZ_RESULT'
export const CLEAR_QUIZ = 'CLEAR_QUIZ'

export interface IQuizStateGroup {
  quiz?: IQuizEntity
  quizAnswer?: IQuizAnswerEntity
  quizResult?: IQuizResultEntity
}

export interface IReducer {
    (state: IQuizStateGroup, action: IQuizAction): IQuizStateGroup
}
