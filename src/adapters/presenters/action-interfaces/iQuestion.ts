import {
  IQuestionAnswerEntity,
  IQuestionEntity,
  IQuestionAnswersEntity
} from "@domains/entities/interfaces/iQuestion";

export interface IQuestionState {
  question: IQuestionEntity
}
export interface IQuestionAnswerState {
  questionAnswer: IQuestionAnswerEntity
}
export interface IQuestionAnswersState {
  questionAnswers: IQuestionAnswersEntity
}
export interface IQuestionAction {
  type: string
  payload?: IQuestionState | IQuestionAnswerState | IQuestionAnswersState
}

export interface IQuestionActions {
  getQuestion(question: IQuestionEntity): IQuestionAction
  setQuestionAnswer(question: IQuestionAnswerEntity): IQuestionAction
  setQuestionAnswers(questionAnswers: IQuestionAnswersEntity): IQuestionAction
  clearAnswers(): IQuestionAction
  clear(): IQuestionAction
}
