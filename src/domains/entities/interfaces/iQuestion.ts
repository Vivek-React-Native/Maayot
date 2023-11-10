import {IQuestionAnswerDTO} from "@domains/dto/QuestionDTO";

export interface IQuestionAnswerEntity {
  answer: string,
  memberName: string,
  memberId: string,
  level: string
}

export interface IQuestionAnswerData {
  answer: string,
  memberName: string,
  memberId: string,
}

export interface IQuestionAnswersEntity {
  answers: IQuestionAnswerEntity[],
  ref: string,
  ts: string,
}
export interface IQuestionAnswersDataEntity {
  answers: IQuestionAnswerEntity[],
  ref: string,
  ts: string,
}


export interface IQuestionEntity{
  id?: string
  question: string,
  memberAnswer?: IQuestionAnswerEntity,
  historicalAnswers?: IQuestionAnswersEntity,
  addHistoricalAnswer(answer: IQuestionAnswerEntity[]): this
}

export interface IQuestionEntityData {
  id?: string
  question: string,
  memberAnswer?: IQuestionAnswerDTO
  historicalAnswers?: IQuestionAnswersDataEntity
}
