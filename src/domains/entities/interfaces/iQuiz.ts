export interface IQuizAnswerEntity {
  rightAnswer?: number
  memberAnswer?: number
}

export interface IQuizAnswerData {
  rightAnswer?: number
  memberAnswer?: number
}

export interface IQuizResultEntity {
  resultOptions: number[]
}
export interface IQuizResultData {
  resultOptions: number[]
}
export interface IQuizEntity extends IQuizAnswerEntity, IQuizResultEntity{
  id?: string
  options: string[]
  quiz: string,
  getQuizAnswer(): IQuizAnswerEntity
  getQuizResult(): IQuizResultEntity
  setResult(result: IQuizResultEntity): this
}

export interface IQuizEntityData extends IQuizAnswerData{
  id?: string
  options: string[]
  quiz: string,
}
