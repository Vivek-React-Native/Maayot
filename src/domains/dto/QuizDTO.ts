export interface IQuizAnswerDTO {
  rightAnswer?: number,
  memberAnswer?: number,
}
export interface IQuizAnswerDataDTO {
  rightAnswer?: number,
  memberAnswer?: number,
}


export class QuizAnswerDTO implements IQuizAnswerDTO {
  readonly rightAnswer?: number
  readonly memberAnswer?: number

  constructor(params: IQuizAnswerDataDTO) {
    this.rightAnswer = params.rightAnswer
    this.memberAnswer = params.memberAnswer
  }
}

export interface IQuizAnswerDTO {
  rightAnswer?: number,
  memberAnswer?: number,
}

export interface IQuizResultDTO {
  resultOptions: number[]
}
export interface IQuizResultDataDTO {
  options: number[]
}
export class QuizResultDTO implements IQuizResultDTO {
   readonly resultOptions: number[]

  constructor(params: IQuizResultDataDTO) {
    this.resultOptions = params.options
  }
}

export interface IQuizDTO extends IQuizAnswerDTO{
  id?: string
  options: string[]
  quiz: string,
}

export interface IQuizDataDTO extends IQuizAnswerDataDTO{
  id?: string
  options: string[]
  quiz: string
}

class QuizDTO implements IQuizDTO {
  readonly id?: string
  readonly options: string[]
  readonly quiz: string
  readonly rightAnswer?: number
  readonly memberAnswer?: number

  constructor(params: IQuizDataDTO) {
    this.id = params.id
    this.options = params.options
    this.quiz = params.quiz
    this.rightAnswer = params.rightAnswer
    this.memberAnswer = params.memberAnswer
  }
}

export default QuizDTO
