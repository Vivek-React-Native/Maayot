export interface IQuestionAnswerDTO {
  answer: string,
  memberName: string,
  memberId: string,
}
export interface IQuestionAnswerDataDTO {
  answer: string,
  memberName: string,
  memberId: string,
}


export class QuestionAnswerDTO implements IQuestionAnswerDTO {
  readonly answer: string
  readonly memberName: string
  readonly memberId: string

  constructor(params: IQuestionAnswerDataDTO) {
    this.answer = params.answer
    this.memberName = params.memberName
    this.memberId = params.memberId
  }
}


export interface IQuestionAnswersDTO {
  answers: IQuestionAnswerDTO[],
  ref: string,
  ts: string,
}
export interface IQuestionAnswersDataDTO {
  answers: IQuestionAnswerDTO[],
  ref: string,
  ts: string,
}

export class QuestionAnswersDTO implements IQuestionAnswersDTO {
  readonly answers: IQuestionAnswerDTO[]
  readonly ref: string
  readonly ts: string

  constructor(params: IQuestionAnswersDataDTO) {
    this.answers = params.answers
    this.ref = params.ref
    this.ts = params.ts
  }
}

export interface IQuestionDTO {
  id?: string
  question: string,
  memberAnswer?: IQuestionAnswerDTO
  historicalAnswers?: IQuestionAnswersDTO
}

export interface IQuestionDataDTO{
  id?: string
  question: string,
  memberAnswer?: IQuestionAnswerDTO
  historicalAnswers?: IQuestionAnswersDataDTO
}

class QuestionDTO implements IQuestionDTO {

  readonly id?: string
  readonly question: string
  readonly memberAnswer?: IQuestionAnswerDTO
  readonly historicalAnswers?: IQuestionAnswersDTO

  constructor(params: IQuestionDataDTO) {
    this.id = params.id
    this.question = params.question
    this.memberAnswer = params.memberAnswer
    this.historicalAnswers = params.historicalAnswers
  }
}

export default QuestionDTO
