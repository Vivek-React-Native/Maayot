import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";

export interface IQuizState {
  quiz: IQuizEntity
}
export interface IQuizAnswerState {
  quizAnswer: IQuizAnswerEntity
}
export interface IQuizResultState {
  quizResult: IQuizResultEntity
}
export interface IQuizAction {
  type: string
  payload?: IQuizState | IQuizAnswerState | IQuizResultState
}

export interface IQuizActions {
  getQuiz(quiz: IQuizEntity): IQuizAction
  setQuizAnswer(quiz: IQuizAnswerEntity): IQuizAction
  setQuizResult(quizResult: IQuizResultEntity): IQuizAction
  clear(): IQuizAction
}
