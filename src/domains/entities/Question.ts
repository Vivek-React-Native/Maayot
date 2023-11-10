import {
  IQuestionAnswerData,
  IQuestionAnswerEntity, IQuestionAnswersDataEntity, IQuestionAnswersEntity,
  IQuestionEntity,
  IQuestionEntityData,
} from "@domains/entities/interfaces/iQuestion"

export class QuestionAnswerEntity implements IQuestionAnswerEntity {
  private readonly _answer: string
  private readonly _memberName: string
  private readonly _memberId: string

  constructor(params: IQuestionAnswerData) {
    this._answer = params.answer
    this._memberName = params.memberName
    this._memberId = params.memberId
  }

  get answer() {
    return this._answer
  }

  get memberName() {
    return this._memberName
  }

  get memberId() {
    return this._memberId;
  }
}

export class QuestionAnswersEntity implements IQuestionAnswersEntity {
  private readonly _answers: IQuestionAnswerEntity[]
  private readonly _ref: string
  private readonly _ts: string

  constructor(params: IQuestionAnswersDataEntity) {
    this._answers = params.answers
    this._ref = params.ref
    this._ts = params.ts
  }

  get answers(): IQuestionAnswerEntity[] {
    return this._answers;
  }

  get ref(): string {
    return this._ref

  }

  get ts(): string {
    return this._ts;
  }
}

class QuestionEntity implements IQuestionEntity {
  private readonly _id?: string
  private readonly _question: string
  private readonly _memberAnswer?: IQuestionAnswerEntity
  private readonly _historicalAnswers?: IQuestionAnswersEntity

  constructor(params: IQuestionEntityData) {
    this._id = params.id
    this._question = params.question
    this._memberAnswer = params.memberAnswer
    this._historicalAnswers = params.historicalAnswers
  }

  addHistoricalAnswer(answer: IQuestionAnswerEntity[]): this {
    return this;
  }

  get id(): string {
    return this._id;
  }

  get memberAnswer(): IQuestionAnswerEntity {
    return this._memberAnswer;
  }

  get question(): string {
    return this._question;
  }

  get historicalAnswers(): IQuestionAnswersEntity {
    return this._historicalAnswers;
  }
}

export default QuestionEntity
